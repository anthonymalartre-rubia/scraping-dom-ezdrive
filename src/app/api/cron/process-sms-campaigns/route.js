// Cron Vercel qui process les sms_sends en status 'pending' via Twilio.
//
// Stratégie :
//   - Tourne toutes les 5 min
//   - Récupère max BATCH_SIZE sends pending les plus anciens
//   - Pour chaque : applique template + footer STOP + envoi Twilio + update status
//   - Recalcule les stats de la campagne
//
// Protégé par CRON_SECRET (header Authorization Bearer).

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendSms, appendSmsOptOutFooter, countSmsSegments, estimateSmsCostEur } from '@/lib/sms';
import { applyTemplate } from '@/lib/campaign-templates';
import { cleanEnv } from '@/lib/envClean';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Twilio limit ~1 SMS/sec sur trunks standards FR. On reste très prudent : 20 par batch.
const BATCH_SIZE = 20;

export async function GET(request) {
  const expected = cleanEnv(process.env.CRON_SECRET);
  const provided = request.headers.get('authorization');
  if (expected && provided !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // 1) Auto-promote scheduled → sending
  await supabase
    .from('sms_campaigns')
    .update({ status: 'sending', started_at: new Date().toISOString() })
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date().toISOString());

  // 2) Récup batch de sends pending
  const { data: sends, error: fetchErr } = await supabase
    .from('sms_sends')
    .select('id, campaign_id, contact_id, phone')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchErr) {
    console.error('[cron/sms-campaigns] fetch error', fetchErr);
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }
  if (!sends || sends.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, message: 'Rien en queue SMS' });
  }

  // 3) Bulk fetch
  const campaignIds = [...new Set(sends.map((s) => s.campaign_id))];
  const contactIds = [...new Set(sends.map((s) => s.contact_id))];

  const [{ data: campaigns }, { data: contacts }] = await Promise.all([
    supabase.from('sms_campaigns').select('id, name, body, sender_name, status').in('id', campaignIds),
    supabase.from('prospect_contacts').select('id, phone, first_name, last_name, company, position_title, custom_fields, opt_out').in('id', contactIds),
  ]);

  const campaignMap = new Map((campaigns || []).map((c) => [c.id, c]));
  const contactMap = new Map((contacts || []).map((c) => [c.id, c]));

  // 4) Envoi
  const results = await Promise.all(sends.map(async (send) => {
    const campaign = campaignMap.get(send.campaign_id);
    const contact = contactMap.get(send.contact_id);

    if (!campaign || !contact) {
      return updateSendStatus(supabase, send.id, 'failed', { error: 'Campaign or contact missing' });
    }
    if (campaign.status === 'paused') return null;
    if (contact.opt_out) {
      return updateSendStatus(supabase, send.id, 'failed', { error: 'Contact opt-out' });
    }

    // Templating + footer STOP
    let text = applyTemplate(campaign.body, contact, '');
    text = appendSmsOptOutFooter(text);

    const result = await sendSms({
      to: contact.phone,
      body: text,
      from: campaign.sender_name || undefined, // Twilio sender ID (peut être alphanumérique sur certains pays)
    });

    if (result.success) {
      // Update last_sms_at
      await supabase.from('prospect_contacts')
        .update({ last_sms_at: new Date().toISOString() })
        .eq('id', contact.id);

      const cost = result.priceEur ?? estimateSmsCostEur(text);
      return updateSendStatus(supabase, send.id, 'sent', {
        provider_id: result.id,
        sent_at: new Date().toISOString(),
        cost_eur: cost,
        segments: result.segments || countSmsSegments(text),
      });
    } else {
      return updateSendStatus(supabase, send.id, 'failed', {
        error: result.error || 'Unknown error',
        failed_at: new Date().toISOString(),
      });
    }
  }));

  const succeeded = results.filter((r) => r?.ok).length;
  const failed = results.filter((r) => r && !r.ok).length;

  // 5) Recalcule stats
  for (const cid of campaignIds) {
    await supabase.rpc('refresh_sms_campaign_stats', { campaign_uuid: cid });
  }

  // 6) Marque campagnes terminées
  for (const cid of campaignIds) {
    const { count } = await supabase
      .from('sms_sends')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', cid)
      .eq('status', 'pending');
    if ((count || 0) === 0) {
      await supabase
        .from('sms_campaigns')
        .update({ status: 'sent', completed_at: new Date().toISOString() })
        .eq('id', cid)
        .eq('status', 'sending');
    }
  }

  return NextResponse.json({
    ok: true,
    processed: sends.length,
    succeeded,
    failed,
    campaigns_affected: campaignIds.length,
  });
}

async function updateSendStatus(supabase, sendId, status, extra = {}) {
  const { error } = await supabase
    .from('sms_sends')
    .update({ status, ...extra })
    .eq('id', sendId);
  return { ok: !error, sendId, status, error };
}
