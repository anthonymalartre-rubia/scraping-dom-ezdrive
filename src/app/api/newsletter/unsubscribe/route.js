// GET /api/newsletter/unsubscribe?token=XXX
// Désabonnement 1 clic depuis l'email (lien dans le footer).
// Marque unsubscribed_at + retourne une page de confirmation.

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return redirect(url, { ok: '0', reason: 'missing-token' });
  }

  const supabase = getSupabaseAdmin();
  const { data: sub } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, unsubscribed_at')
    .eq('unsubscribe_token', token)
    .maybeSingle();

  if (!sub) {
    return redirect(url, { ok: '0', reason: 'invalid-token' });
  }
  if (sub.unsubscribed_at) {
    return redirect(url, { ok: '1', already: '1' });
  }

  await supabase
    .from('newsletter_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('id', sub.id);

  return redirect(url, { ok: '1', email: sub.email });
}

function redirect(currentUrl, params) {
  const target = new URL('/newsletter-desabonnement', new URL(currentUrl).origin);
  for (const [k, v] of Object.entries(params)) target.searchParams.set(k, v);
  return NextResponse.redirect(target);
}
