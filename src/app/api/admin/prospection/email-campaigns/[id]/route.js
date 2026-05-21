// GET /api/admin/prospection/email-campaigns/[id]    → détails + stats
// POST /api/admin/prospection/email-campaigns/[id]/send → lance l'envoi (queue toutes les lignes en pending)
// DELETE /api/admin/prospection/email-campaigns/[id]  → supprime (seulement si draft / paused)

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  const { user, supabase } = auth;
  const { id } = await params;

  const { data: campaign } = await supabase
    .from('email_campaigns')
    .select('*')
    .eq('id', id)
    .eq('owner_id', user.id)
    .maybeSingle();
  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  // Liste des 50 derniers sends (échantillon pour debug)
  const { data: sends } = await supabase
    .from('email_sends')
    .select('id, email, status, error, sent_at, delivered_at, opened_at, clicked_at, bounced_at, replied_at')
    .eq('campaign_id', id)
    .order('created_at', { ascending: false })
    .limit(50);

  return NextResponse.json({ campaign, sample_sends: sends || [] });
}

export async function DELETE(request, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  const { user, supabase } = auth;
  const { id } = await params;

  // Sécurité : ne pas pouvoir supprimer une campagne déjà partie
  const { data: c } = await supabase
    .from('email_campaigns').select('status').eq('id', id).eq('owner_id', user.id).maybeSingle();
  if (!c) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  if (['sending', 'sent'].includes(c.status)) {
    return NextResponse.json({ error: 'Impossible : campagne déjà envoyée. Vous pouvez la mettre en pause.' }, { status: 400 });
  }

  const { error } = await supabase.from('email_campaigns').delete().eq('id', id).eq('owner_id', user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
