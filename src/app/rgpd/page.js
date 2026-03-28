import Link from 'next/link';
import { ArrowLeft, UserCheck, Pencil, Trash2, Download, ShieldCheck, Ban } from 'lucide-react';

export const metadata = {
  title: 'RGPD — Vos droits — Prospectia.ai',
  description: 'Informations sur vos droits en matière de protection des données personnelles (RGPD) sur Prospectia.ai.',
};

const RIGHTS = [
  {
    icon: UserCheck,
    title: 'Droit d\'accès',
    description: 'Vous avez le droit d\'obtenir la confirmation que des données vous concernant sont ou ne sont pas traitées. Si elles le sont, vous pouvez obtenir une copie de l\'ensemble de vos données personnelles.',
    how: 'Envoyez un email à contact@prospectia.ai avec l\'objet « Demande d\'accès aux données ». Nous vous répondrons sous 30 jours.',
  },
  {
    icon: Pencil,
    title: 'Droit de rectification',
    description: 'Vous pouvez demander la correction de données personnelles inexactes ou incomplètes vous concernant.',
    how: 'Modifiez vos informations directement depuis les paramètres de votre compte, ou contactez-nous par email.',
  },
  {
    icon: Trash2,
    title: 'Droit de suppression',
    description: 'Vous pouvez demander l\'effacement de vos données personnelles. Ce droit s\'applique notamment lorsque les données ne sont plus nécessaires, que vous retirez votre consentement, ou que le traitement est illicite.',
    how: 'Depuis votre compte : Settings > Supprimer le compte. Toutes vos données seront effacées sous 30 jours. Vous pouvez également nous contacter par email.',
  },
  {
    icon: Download,
    title: 'Droit à la portabilité',
    description: 'Vous avez le droit de recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.',
    how: 'Utilisez la fonctionnalité d\'export CSV disponible dans le tableau de leads pour exporter vos prospects. Pour les autres données, contactez-nous par email.',
  },
  {
    icon: ShieldCheck,
    title: 'Droit à la limitation',
    description: 'Vous pouvez demander la limitation du traitement de vos données dans certains cas : contestation de l\'exactitude des données, traitement illicite, données nécessaires à la constatation de droits en justice.',
    how: 'Contactez notre DPO par email en précisant les données concernées et le motif de votre demande.',
  },
  {
    icon: Ban,
    title: 'Droit d\'opposition',
    description: 'Vous pouvez vous opposer à tout moment au traitement de vos données personnelles fondé sur l\'intérêt légitime, y compris le profilage. Vous pouvez également vous opposer au traitement à des fins de prospection commerciale.',
    how: 'Contactez-nous par email à contact@prospectia.ai. Pour la prospection commerciale, cliquez sur le lien de désinscription dans nos emails.',
  },
];

export default function RGPDPage() {
  return (
    <div className="min-h-screen bg-surface-base text-content-primary">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary transition mb-10">
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Protection des données (RGPD)</h1>
        <p className="text-content-secondary text-sm mb-4">Dernière mise à jour : 28 mars 2026</p>
        <p className="text-content-secondary leading-relaxed mb-10">
          Chez Prospectia.ai, nous prenons la protection de vos données personnelles très au sérieux.
          Cette page détaille vos droits en vertu du Règlement Général sur la Protection des Données (RGPD)
          et vous explique comment les exercer.
        </p>

        <div className="space-y-6">
          {RIGHTS.map((right) => (
            <div key={right.title} className="p-6 rounded-xl border border-line bg-surface-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <right.icon size={18} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-content-primary mb-2">{right.title}</h2>
                  <p className="text-content-secondary text-sm leading-relaxed mb-3">{right.description}</p>
                  <div className="p-3 rounded-lg bg-surface-elevated text-sm">
                    <span className="font-medium text-content-primary">Comment faire : </span>
                    <span className="text-content-secondary">{right.how}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-10 text-content-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">Export de vos données</h2>
            <p>
              Prospectia.ai vous permet d&apos;exporter facilement vos données :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <span className="text-content-primary font-medium">Export CSV</span> : depuis le tableau de leads,
                exportez l&apos;ensemble de vos prospects au format CSV standard ou au format Zoho CRM
              </li>
              <li>
                <span className="text-content-primary font-medium">Données de compte</span> : sur demande,
                nous vous fournirons l&apos;intégralité de vos données personnelles dans un format lisible par machine (JSON)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">Suppression de compte</h2>
            <p>
              Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre compte
              (Settings &gt; Supprimer le compte). La suppression entraîne :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>L&apos;effacement de toutes vos données personnelles (email, mot de passe)</li>
              <li>La suppression de tous vos prospects et résultats de recherche</li>
              <li>La suppression de votre historique de recherche</li>
              <li>L&apos;annulation de votre abonnement le cas échéant</li>
            </ul>
            <p className="mt-3">
              Les données sont définitivement supprimées sous 30 jours. Les données de facturation sont
              conservées 10 ans conformément aux obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">Délégué à la protection des données (DPO)</h2>
            <p>
              Pour toute question relative à la protection de vos données ou pour exercer vos droits,
              vous pouvez contacter notre DPO :
            </p>
            <div className="mt-4 p-4 rounded-xl border border-line bg-surface-card">
              <p className="text-content-primary font-medium">Contact DPO</p>
              <p className="text-sm mt-1">Email : <span className="text-content-primary">contact@prospectia.ai</span></p>
              <p className="text-sm mt-1">Délai de réponse : 30 jours maximum</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">Réclamation auprès de la CNIL</h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés malgré votre demande, vous pouvez
              introduire une réclamation auprès de la Commission Nationale de l&apos;Informatique et
              des Libertés (CNIL) :
            </p>
            <div className="mt-4 p-4 rounded-xl border border-line bg-surface-card">
              <p className="text-content-primary font-medium">CNIL</p>
              <p className="text-sm mt-1">3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
              <p className="text-sm mt-1">Site web : <span className="text-content-primary">www.cnil.fr</span></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-content-secondary">
          <div className="flex gap-6">
            <Link href="/cgu" className="hover:text-content-primary transition">CGU</Link>
            <Link href="/confidentialite" className="hover:text-content-primary transition">Politique de confidentialité</Link>
          </div>
          <p className="text-content-tertiary text-xs">&copy; 2026 Prospectia.ai</p>
        </div>
      </div>
    </div>
  );
}
