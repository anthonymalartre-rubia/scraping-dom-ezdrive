import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité — Prospectia.ai',
  description: 'Politique de confidentialité et protection des données personnelles de Prospectia.ai.',
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-surface-base text-content-primary">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary transition mb-10">
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Politique de Confidentialité</h1>
        <p className="text-content-secondary text-sm mb-10">Dernière mise à jour : 28 mars 2026</p>

        <div className="space-y-10 text-content-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est Prospectia.ai.<br />
              Contact DPO : <span className="text-content-primary font-medium">contact@prospectia.ai</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">2. Données collectées</h2>
            <p>Dans le cadre de l&apos;utilisation du Service, nous collectons les données suivantes :</p>

            <h3 className="text-lg font-medium text-content-primary mt-5 mb-2">2.1 Données de compte</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adresse email</li>
              <li>Mot de passe (stocké sous forme hashée, jamais en clair)</li>
              <li>Date de création du compte</li>
              <li>Plan d&apos;abonnement</li>
            </ul>

            <h3 className="text-lg font-medium text-content-primary mt-5 mb-2">2.2 Données d&apos;utilisation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Historique des recherches (départements, catégories, requêtes)</li>
              <li>Résultats sauvegardés (prospects, emails trouvés)</li>
              <li>Préférences d&apos;interface (thème clair/sombre, colonnes affichées)</li>
              <li>Sessions de recherche et statistiques d&apos;utilisation</li>
            </ul>

            <h3 className="text-lg font-medium text-content-primary mt-5 mb-2">2.3 Données techniques</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adresse IP</li>
              <li>Type et version du navigateur</li>
              <li>Pages visitées et durée de visite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">3. Bases légales du traitement</h2>
            <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><span className="text-content-primary font-medium">Consentement</span> : pour les cookies non essentiels et les communications marketing</li>
              <li><span className="text-content-primary font-medium">Exécution du contrat</span> : pour la fourniture du Service et la gestion de votre compte</li>
              <li><span className="text-content-primary font-medium">Intérêt légitime</span> : pour l&apos;amélioration du Service, la sécurité et la prévention de la fraude</li>
              <li><span className="text-content-primary font-medium">Obligation légale</span> : pour la facturation et les obligations comptables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">4. Sous-traitants</h2>
            <p>Nous faisons appel aux sous-traitants suivants pour le fonctionnement du Service :</p>
            <div className="mt-4 rounded-xl border border-line overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface-card">
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Sous-traitant</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Finalité</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Localisation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Supabase</td>
                    <td className="py-3 px-4">Base de données et authentification</td>
                    <td className="py-3 px-4">UE / USA</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Vercel</td>
                    <td className="py-3 px-4">Hébergement et déploiement</td>
                    <td className="py-3 px-4">USA (CDN mondial)</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Stripe</td>
                    <td className="py-3 px-4">Traitement des paiements</td>
                    <td className="py-3 px-4">USA / Irlande</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Google</td>
                    <td className="py-3 px-4">API Places (recherche de prospects)</td>
                    <td className="py-3 px-4">USA</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-content-primary">Anthropic</td>
                    <td className="py-3 px-4">Intelligence artificielle</td>
                    <td className="py-3 px-4">USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Tous nos sous-traitants sont soumis à des clauses contractuelles types (CCT) conformes
              au RGPD pour les transferts de données hors de l&apos;Union européenne.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">5. Cookies</h2>
            <p>Le Service utilise les cookies suivants :</p>
            <div className="mt-4 rounded-xl border border-line overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface-card">
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Cookie</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Durée</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Finalité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-mono text-xs text-content-primary">sb-*-auth-token</td>
                    <td className="py-3 px-4">Essentiel</td>
                    <td className="py-3 px-4">Session</td>
                    <td className="py-3 px-4">Authentification Supabase</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-mono text-xs text-content-primary">theme</td>
                    <td className="py-3 px-4">Préférence</td>
                    <td className="py-3 px-4">1 an</td>
                    <td className="py-3 px-4">Thème clair/sombre</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-mono text-xs text-content-primary">cookie_consent</td>
                    <td className="py-3 px-4">Essentiel</td>
                    <td className="py-3 px-4">1 an</td>
                    <td className="py-3 px-4">Consentement cookies</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs text-content-primary">columns_*</td>
                    <td className="py-3 px-4">Préférence</td>
                    <td className="py-3 px-4">1 an</td>
                    <td className="py-3 px-4">Colonnes affichées (localStorage)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de consentement
              ou les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">6. Durée de conservation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="text-content-primary font-medium">Données de compte</span> : conservées pendant toute la durée d&apos;utilisation du Service, supprimées dans les 30 jours suivant la fermeture du compte</li>
              <li><span className="text-content-primary font-medium">Données de recherche et prospects</span> : conservées pendant la durée du compte, supprimées à la fermeture du compte</li>
              <li><span className="text-content-primary font-medium">Données de facturation</span> : conservées 10 ans conformément aux obligations légales comptables</li>
              <li><span className="text-content-primary font-medium">Logs techniques</span> : conservés 12 mois maximum</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">7. Vos droits (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><span className="text-content-primary font-medium">Droit d&apos;accès</span> : obtenir une copie de vos données personnelles</li>
              <li><span className="text-content-primary font-medium">Droit de rectification</span> : corriger vos données inexactes ou incomplètes</li>
              <li><span className="text-content-primary font-medium">Droit de suppression</span> : demander l&apos;effacement de vos données</li>
              <li><span className="text-content-primary font-medium">Droit à la portabilité</span> : recevoir vos données dans un format structuré et lisible</li>
              <li><span className="text-content-primary font-medium">Droit d&apos;opposition</span> : vous opposer au traitement de vos données</li>
              <li><span className="text-content-primary font-medium">Droit à la limitation</span> : demander la limitation du traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez notre DPO :
              <span className="text-content-primary font-medium"> contact@prospectia.ai</span>
            </p>
            <p className="mt-3">
              Pour plus de détails sur l&apos;exercice de vos droits, consultez notre
              <Link href="/rgpd" className="text-violet-400 hover:text-violet-300 transition ml-1">page dédiée RGPD</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">8. Sécurité</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger
              vos données personnelles contre tout accès non autorisé, perte ou altération :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Chiffrement des données en transit (HTTPS/TLS)</li>
              <li>Mots de passe hashés (jamais stockés en clair)</li>
              <li>Authentification sécurisée via Supabase Auth</li>
              <li>Paiements sécurisés via Stripe (certifié PCI DSS)</li>
              <li>Hébergement sécurisé sur Vercel avec CDN et protection DDoS</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">9. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD,
              vous avez le droit d&apos;introduire une réclamation auprès de la
              <span className="text-content-primary font-medium"> CNIL </span>
              (Commission Nationale de l&apos;Informatique et des Libertés) :
              <span className="text-content-primary font-medium"> www.cnil.fr</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">10. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment.
              Toute modification sera publiée sur cette page avec une date de mise à jour actualisée.
              En cas de modification substantielle, nous vous en informerons par email.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-content-secondary">
          <div className="flex gap-6">
            <Link href="/cgu" className="hover:text-content-primary transition">CGU</Link>
            <Link href="/rgpd" className="hover:text-content-primary transition">RGPD</Link>
          </div>
          <p className="text-content-tertiary text-xs">&copy; 2026 Prospectia.ai</p>
        </div>
      </div>
    </div>
  );
}
