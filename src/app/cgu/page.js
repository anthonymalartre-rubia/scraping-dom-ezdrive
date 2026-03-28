import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales d\'Utilisation — Prospectia.ai',
  description: 'Conditions Générales d\'Utilisation de la plateforme Prospectia.ai, service de prospection B2B automatisée en France.',
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-surface-base text-content-primary">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary transition mb-10">
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Conditions Générales d&apos;Utilisation</h1>
        <p className="text-content-secondary text-sm mb-10">Dernière mise à jour : 28 mars 2026</p>

        <div className="space-y-10 text-content-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">1. Présentation du service</h2>
            <p>
              Prospectia.ai (ci-après « le Service ») est une plateforme de prospection B2B automatisée
              éditée et exploitée par Prospectia.ai. Le Service est accessible à l&apos;adresse
              <span className="text-content-primary font-medium"> scraping-dom-ezdrive.vercel.app</span>.
            </p>
            <p className="mt-3">
              Le Service permet aux utilisateurs de rechercher des prospects professionnels sur l&apos;ensemble
              du territoire français (101 départements), d&apos;enrichir ces prospects avec des informations
              de contact (email, téléphone), et de les exporter au format CSV ou Zoho CRM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">2. Éditeur</h2>
            <p>
              Le Service est édité par Prospectia.ai.<br />
              Contact : <span className="text-content-primary">contact@prospectia.ai</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">3. Acceptation des conditions</h2>
            <p>
              L&apos;utilisation du Service implique l&apos;acceptation pleine et entière des présentes
              Conditions Générales d&apos;Utilisation (CGU). En créant un compte ou en utilisant le Service,
              l&apos;utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepte sans réserve.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">4. Description des fonctionnalités</h2>
            <p>Le Service propose les fonctionnalités suivantes :</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Recherche de prospects via l&apos;API Google Places (New) sur 101 départements français</li>
              <li>Enrichissement email par scraping de données publiquement accessibles (sites web, pages contact, mentions légales)</li>
              <li>Enrichissement en cascade (waterfall) via plusieurs sources tierces (Serper, Apollo, Enrichly, Anymail, Findymail)</li>
              <li>Déduplication automatique des résultats par identifiant Google Place</li>
              <li>Export des données au format CSV standard et Zoho CRM</li>
              <li>Organisation des leads par dossiers, filtres et tags</li>
              <li>Scoring automatique des emails trouvés</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">5. Offres et tarification</h2>
            <p>Le Service est proposé selon les plans suivants :</p>
            <div className="mt-4 rounded-xl border border-line overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface-card">
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold text-content-primary">Inclus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Starter</td>
                    <td className="py-3 px-4">Gratuit</td>
                    <td className="py-3 px-4">Recherches limitées, scraping email, export CSV standard</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 px-4 font-medium text-content-primary">Pro</td>
                    <td className="py-3 px-4">49&euro;/mois</td>
                    <td className="py-3 px-4">Recherches illimitées, waterfall complet (7 sources), export CSV + Zoho CRM, support prioritaire</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-content-primary">Enterprise</td>
                    <td className="py-3 px-4">149&euro;/mois</td>
                    <td className="py-3 px-4">Enrichissements illimités, API access, utilisateurs illimités, webhooks, SLA & support dédié</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Les prix sont indiqués en euros, hors taxes. Prospectia.ai se réserve le droit de modifier
              ses tarifs à tout moment. Les utilisateurs seront informés de toute modification tarifaire
              au moins 30 jours avant son entrée en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">6. Paiement</h2>
            <p>
              Les paiements sont traités de manière sécurisée par <span className="text-content-primary font-medium">Stripe</span>.
              Les abonnements sont facturés mensuellement. Le paiement est dû au début de chaque période
              de facturation. Prospectia.ai ne stocke aucune information bancaire ; celles-ci sont
              gérées exclusivement par Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">7. Utilisation des données</h2>
            <p>
              Le Service collecte et traite des données publiquement accessibles provenant de sources tierces,
              notamment l&apos;API Google Places et les sites web des entreprises prospectées. L&apos;utilisateur
              s&apos;engage à utiliser les données obtenues via le Service de manière conforme à la
              réglementation en vigueur, notamment le RGPD et la loi Informatique et Libertés.
            </p>
            <p className="mt-3">
              L&apos;utilisateur est seul responsable de l&apos;utilisation qu&apos;il fait des données
              exportées depuis le Service, notamment dans le cadre de campagnes de prospection commerciale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">8. Limitation de responsabilité</h2>
            <p>
              Prospectia.ai fournit le Service « en l&apos;état » et ne garantit pas l&apos;exactitude,
              l&apos;exhaustivité ou l&apos;actualité des données collectées. En particulier :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Les résultats de recherche dépendent de la disponibilité et de la qualité des données fournies par Google Places</li>
              <li>Les emails trouvés par scraping ou enrichissement ne sont pas garantis comme valides ou à jour</li>
              <li>Le scoring des emails est indicatif et ne constitue pas une garantie de délivrabilité</li>
              <li>Prospectia.ai ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">9. Disponibilité du service</h2>
            <p>
              Prospectia.ai s&apos;efforce d&apos;assurer la disponibilité du Service 24h/24, 7j/7.
              Toutefois, le Service peut être temporairement interrompu pour des raisons de maintenance,
              de mise à jour ou en cas de force majeure. Prospectia.ai ne saurait être tenu responsable
              des interruptions du Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">10. Résiliation</h2>
            <p>
              L&apos;utilisateur peut résilier son abonnement à tout moment depuis les paramètres de son
              compte. La résiliation prend effet à la fin de la période de facturation en cours.
              Aucun remboursement au prorata ne sera effectué pour la période restante.
            </p>
            <p className="mt-3">
              Prospectia.ai se réserve le droit de suspendre ou de résilier un compte en cas de
              violation des présentes CGU, sans préavis ni indemnité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">11. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments du Service (interface, design, code, marque, logo) sont la
              propriété exclusive de Prospectia.ai et sont protégés par le droit de la propriété
              intellectuelle. Toute reproduction, représentation ou exploitation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">12. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative
              de résolution amiable, compétence exclusive est attribuée aux tribunaux de Paris.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-content-primary mb-3">13. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l&apos;adresse :
              <span className="text-content-primary font-medium"> contact@prospectia.ai</span>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-content-secondary">
          <div className="flex gap-6">
            <Link href="/confidentialite" className="hover:text-content-primary transition">Politique de confidentialité</Link>
            <Link href="/rgpd" className="hover:text-content-primary transition">RGPD</Link>
          </div>
          <p className="text-content-tertiary text-xs">&copy; 2026 Prospectia.ai</p>
        </div>
      </div>
    </div>
  );
}
