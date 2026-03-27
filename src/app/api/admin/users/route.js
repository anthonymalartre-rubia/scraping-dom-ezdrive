import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

async function checkAdmin(user, supabase) {
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  return !!profile?.is_admin;
}

// GET — List all users with full details
export async function GET() {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
    if (!(await checkAdmin(user, supabase))) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const admin = getSupabaseAdmin();
    const { data: { users }, error } = await admin.auth.admin.listUsers();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Return full user info keyed by id
    const userMap = {};
    users.forEach(u => {
      userMap[u.id] = {
        email: u.email,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        email_confirmed_at: u.email_confirmed_at,
        phone: u.phone,
        provider: u.app_metadata?.provider || 'email',
      };
    });

    return NextResponse.json({ users: userMap });
  } catch (err) {
    console.error('Admin users GET error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST — Admin actions (reset password, delete user, update user)
export async function POST(request) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
    if (!(await checkAdmin(user, supabase))) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const body = await request.json();
    const { action, userId, data } = body;
    const admin = getSupabaseAdmin();

    switch (action) {
      case 'reset_password': {
        // Send password reset email
        const { data: targetUser } = await admin.auth.admin.getUserById(userId);
        if (!targetUser?.user?.email) {
          return NextResponse.json({ error: 'Utilisateur non trouve' }, { status: 404 });
        }
        const { error } = await admin.auth.resetPasswordForEmail(targetUser.user.email, {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://scraping-dom-ezdrive.vercel.app'}/login`,
        });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: 'Email de reinitialisation envoye' });
      }

      case 'set_password': {
        // Directly set a new password (admin override)
        const { error } = await admin.auth.admin.updateUserById(userId, {
          password: data.password,
        });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: 'Mot de passe mis a jour' });
      }

      case 'update_email': {
        const { error } = await admin.auth.admin.updateUserById(userId, {
          email: data.email,
          email_confirm: true,
        });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: 'Email mis a jour' });
      }

      case 'confirm_email': {
        const { error } = await admin.auth.admin.updateUserById(userId, {
          email_confirm: true,
        });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: 'Email confirme' });
      }

      case 'delete_user': {
        // Delete from auth (cascade should handle profiles)
        const { error: authError } = await admin.auth.admin.deleteUser(userId);
        if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });
        // Also clean up profile and prospects
        await admin.from('user_profiles').delete().eq('id', userId);
        await admin.from('prospects').delete().eq('user_id', userId);
        await admin.from('usage_tracking').delete().eq('user_id', userId);
        return NextResponse.json({ success: true, message: 'Utilisateur supprime' });
      }

      case 'update_plan': {
        const { error } = await admin
          .from('user_profiles')
          .update({ plan: data.plan, updated_at: new Date().toISOString() })
          .eq('id', userId);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: 'Plan mis a jour' });
      }

      case 'toggle_admin': {
        const { data: profile } = await admin
          .from('user_profiles')
          .select('is_admin')
          .eq('id', userId)
          .single();
        const { error } = await admin
          .from('user_profiles')
          .update({ is_admin: !profile?.is_admin, updated_at: new Date().toISOString() })
          .eq('id', userId);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: profile?.is_admin ? 'Admin retire' : 'Admin ajoute' });
      }

      case 'ban_user': {
        const { error } = await admin.auth.admin.updateUserById(userId, {
          ban_duration: data.ban ? '876000h' : 'none', // 100 years or unban
        });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, message: data.ban ? 'Utilisateur banni' : 'Utilisateur debanni' });
      }

      default:
        return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
    }
  } catch (err) {
    console.error('Admin users POST error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
