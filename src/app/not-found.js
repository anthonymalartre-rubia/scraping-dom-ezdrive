import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* 404 number */}
        <div className="text-8xl font-bold font-mono bg-gradient-to-b from-content-primary to-content-tertiary bg-clip-text text-transparent mb-6">
          404
        </div>

        <h1 className="text-2xl font-semibold text-content-primary mb-3">
          Page non trouv&eacute;e
        </h1>
        <p className="text-sm text-content-secondary mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a &eacute;t&eacute; d&eacute;plac&eacute;e.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition shadow-lg shadow-violet-500/20 text-center"
          >
            Aller au tableau de bord
          </Link>
          <Link
            href="/"
            className="py-2.5 px-6 rounded-xl border border-line text-content-secondary text-sm font-medium hover:bg-surface-hover transition text-center"
          >
            Retour &agrave; l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
