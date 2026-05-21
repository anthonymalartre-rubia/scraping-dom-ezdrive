// Helper d'auth admin réutilisable.
// Renvoie { user, supabase } si admin, ou throw une NextResponse 401/403.

import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from './auth';

/**
 * À appeler en début de route API admin :
 *   const auth = await requireAdmin();
 *   if (auth instanceof NextResponse) return auth;
 *   const { user, supabase } = auth;
 */
export async function requireAdmin() {
  const { user, supabase } = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
  }

  return { user, supabase };
}
