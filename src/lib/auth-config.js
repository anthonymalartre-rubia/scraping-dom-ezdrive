// ─────────────────────────────────────────────────────────────────────
// Auth providers — flags de configuration
// ─────────────────────────────────────────────────────────────────────
//
// Contrôle l'affichage des providers OAuth sur /login et /signup.
// Permet de masquer un bouton tant que le provider n'est pas configuré
// côté serveur (Supabase Dashboard + Google Cloud Console / GitHub App
// settings / etc.) pour éviter de montrer une feature cassée aux users.
//
// COMMENT ACTIVER GOOGLE OAUTH :
//
// 1) Configurer le provider Google dans Supabase Dashboard :
//    https://supabase.com/dashboard/project/kqrarrrojdtxijkhejhg/auth/providers
//    → Toggle "Enable Sign in with Google"
//    → Coller le Client ID + Client Secret depuis Google Cloud Console
//
// 2) Créer un OAuth Client dans Google Cloud Console :
//    https://console.cloud.google.com/auth/clients
//    → Application type : Web application
//    → Authorized redirect URIs : ajouter
//      https://kqrarrrojdtxijkhejhg.supabase.co/auth/v1/callback
//    → Copier Client ID + Client Secret vers Supabase (étape 1)
//
// 3) Passer GOOGLE_OAUTH_ENABLED à `true` ci-dessous + redeploy.
//
// ─────────────────────────────────────────────────────────────────────

// Google OAuth : provider OAuth Google sur /login et /signup.
// Voir doc ci-dessus pour activation.
export const GOOGLE_OAUTH_ENABLED = false;
