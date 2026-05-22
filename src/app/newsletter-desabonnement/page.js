'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, ArrowLeft, Mail } from 'lucide-react';

function UnsubInner() {
  const params = useSearchParams();
  const ok = params.get('ok') === '1';
  const already = params.get('already') === '1';
  const email = params.get('email');
  const reason = params.get('reason');

  return (
    <div className="min-h-screen bg-surface-base text-content-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-line bg-surface-card p-8 text-center">
        {ok ? (
          <>
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {already ? 'Déjà désinscrit' : 'Désinscription confirmée'}
            </h1>
            <p className="text-sm text-content-secondary leading-relaxed mb-6">
              {already
                ? 'Vous n\'étiez déjà plus dans notre liste de diffusion. Aucune autre action requise.'
                : 'Vous ne recevrez plus la newsletter mensuelle de Prospectia.'}
              {email && <span className="block mt-2 text-xs text-content-tertiary"><Mail size={11} className="inline mr-1" />{email}</span>}
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition">
              <ArrowLeft size={14} />
              Retour à l&apos;accueil
            </Link>
          </>
        ) : (
          <>
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-4">
              <AlertCircle size={20} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Désinscription échouée</h1>
            <p className="text-sm text-content-secondary leading-relaxed mb-6">
              Le lien de désinscription n&apos;est pas valide ou a expiré.
              Code : <code className="text-xs">{reason || 'unknown'}</code>
            </p>
            <p className="text-xs text-content-tertiary mb-4">
              Contactez <a href="mailto:hello@prospectia.cloud" className="text-violet-400 hover:underline">hello@prospectia.cloud</a> pour vous désinscrire manuellement.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-line text-content-secondary hover:text-content-primary text-sm font-semibold transition">
              <ArrowLeft size={14} />
              Accueil
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function NewsletterDesabonnementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-base" />}>
      <UnsubInner />
    </Suspense>
  );
}
