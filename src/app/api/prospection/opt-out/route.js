// Opt-out unifié (email & SMS) déclenché par :
//   - clic sur le lien dans le footer email d'une campagne
//   - reply STOP sur un SMS Twilio (webhook à brancher)
//
// URL : /api/prospection/opt-out?c=<contact_id>&cmp=<campaign_id>&ch=email|sms
//
// Comportement :
//   - Met opt_out=true sur le contact (toutes campagnes futures excluses)
//   - Ajoute l'email à opt_out_list (blocklist globale historique pour le module recherche)
//   - Met à jour le compteur opt_out_count de la liste (via trigger)
//   - Redirige vers /opt-out?ok=1 avec un message de confirmation
//
// Sécurité : pas d'auth requise (lien public dans le mail). On vérifie juste
// l'existence du contact_id pour ne pas révéler d'info.

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  const contactId = url.searchParams.get('c');
  const campaignId = url.searchParams.get('cmp');
  const channel = url.searchParams.get('ch') || 'email';

  if (!contactId) {
    return redirectToOptOutPage(url, { error: 'missing-contact' });
  }

  const supabase = getSupabaseAdmin();

  // Récupère le contact
  const { data: contact } = await supabase
    .from('prospect_contacts')
    .select('id, email, phone, company, list_id, opt_out')
    .eq('id', contactId)
    .maybeSingle();

  if (!contact) {
    return redirectToOptOutPage(url, { error: 'contact-not-found' });
  }

  // Si déjà opt-out : confirme et stop
  if (contact.opt_out) {
    return redirectToOptOutPage(url, { ok: '1', already: '1' });
  }

  // Update contact
  const { error: cErr } = await supabase
    .from('prospect_contacts')
    .update({
      opt_out: true,
      opt_out_at: new Date().toISOString(),
      opt_out_reason: `Désabonnement ${channel} ${campaignId ? `(campagne ${campaignId})` : ''}`.trim(),
    })
    .eq('id', contactId);

  if (cErr) {
    console.error('[opt-out] update contact error', cErr);
    return redirectToOptOutPage(url, { error: 'db-error' });
  }

  // Ajoute à la blocklist publique opt_out_list (si email présent)
  if (contact.email) {
    await supabase
      .from('opt_out_list')
      .upsert({
        email: contact.email,
        company: contact.company || null,
        reason: `Campagne ${channel} ${campaignId || ''}`.trim(),
        requested_at: new Date().toISOString(),
      }, { onConflict: 'email', ignoreDuplicates: true });
  }

  // Si dans un send : marque-le comme 'opted_out'
  if (campaignId) {
    if (channel === 'email') {
      await supabase
        .from('email_sends')
        .update({ status: 'opted_out' })
        .eq('campaign_id', campaignId)
        .eq('contact_id', contactId)
        .in('status', ['pending']);
    } else if (channel === 'sms') {
      await supabase
        .from('sms_sends')
        .update({ status: 'opted_out' })
        .eq('campaign_id', campaignId)
        .eq('contact_id', contactId)
        .in('status', ['pending']);
    }
  }

  return redirectToOptOutPage(url, { ok: '1', channel });
}

// POST pour le webhook Twilio (STOP entrant)
// Twilio envoie le SMS reçu en form-encoded. On cherche le numéro From,
// et on opt-out tous les contacts avec ce phone.
export async function POST(request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ ok: false, error: 'invalid form' }, { status: 400 });
  }

  const fromPhone = formData.get('From');
  const body = (formData.get('Body') || '').toString().trim().toUpperCase();

  if (!fromPhone) {
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Reconnais "STOP", "ARRET", "ARRÊT", "UNSUBSCRIBE"
  const isStop = /\b(STOP|ARRET|ARRÊT|UNSUBSCRIBE|DESABONNER)\b/i.test(body);
  if (!isStop) {
    // Pas un opt-out → no-op (le mail entrant pourrait être traité ailleurs)
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  const supabase = getSupabaseAdmin();

  // Opt-out tous les contacts avec ce numéro
  const { data: contacts } = await supabase
    .from('prospect_contacts')
    .select('id, email, company')
    .eq('phone', fromPhone)
    .eq('opt_out', false);

  if (contacts && contacts.length > 0) {
    const ids = contacts.map((c) => c.id);
    await supabase
      .from('prospect_contacts')
      .update({
        opt_out: true,
        opt_out_at: new Date().toISOString(),
        opt_out_reason: 'SMS STOP entrant',
      })
      .in('id', ids);

    // Blocklist sur emails associés
    for (const c of contacts) {
      if (c.email) {
        await supabase.from('opt_out_list').upsert({
          email: c.email,
          company: c.company || null,
          reason: 'SMS STOP entrant',
          requested_at: new Date().toISOString(),
        }, { onConflict: 'email', ignoreDuplicates: true });
      }
    }
  }

  // Réponse TwiML : confirmation au destinataire
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Vous etes desinscrit. Vous ne recevrez plus de SMS de notre part.</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}

function redirectToOptOutPage(currentUrl, params) {
  const base = new URL(currentUrl);
  const target = new URL('/opt-out', base.origin);
  for (const [k, v] of Object.entries(params)) {
    target.searchParams.set(k, v);
  }
  return NextResponse.redirect(target);
}
