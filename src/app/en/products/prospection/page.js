// ─────────────────────────────────────────────────────────────────────
// /en/products/prospection — Volia Prospecting (English)
// ─────────────────────────────────────────────────────────────────────

import ProductPageLayout from '@/components/ProductPageLayout';
import { ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://volia.fr';
const PAGE_URL = `${SITE_URL}/en/products/prospection`;
const FR_PAGE = `${SITE_URL}/produits/prospection`;

export const metadata = {
  title: 'Volia Prospecting - French B2B leads. 287k+ companies, from $21/mo',
  description: "Find 1,000 qualified French B2B prospects in 30 seconds. 287,000+ verified companies with emails + phones. 5x cheaper than Apollo. GDPR-compliant by default. Built in France.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'fr-FR': FR_PAGE,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'x-default': FR_PAGE,
    },
  },
  openGraph: {
    title: 'Volia Prospecting - Apollo alternative for France, 5x cheaper',
    description: '287k+ verified French companies with emails + phones. From $21/mo. GDPR-compliant.',
    url: PAGE_URL,
    type: 'website',
    locale: 'en_US',
  },
};

const EN_LABELS = {
  products: 'Products',
  features: 'Features',
  pricing: 'Pricing',
  blog: 'Blog',
  faq: 'FAQ',
  breadcrumbProducts: 'Products',
  featuresPill: 'Features',
  featuresTitlePrefix: 'Everything to',
  featuresTitleDefault: 'succeed with Volia',
  howItWorksPill: 'How it works',
  howItWorksTitle: 'Just 3 steps',
  suitePill: 'Volia Suite',
  suiteTitle: 'Connected to the rest of the Volia suite',
  suiteSubtitleDefault: 'Your data flows between Prospecting, Campaigns and CRM. No copy-paste, no export/import.',
  suiteSource: 'Source',
  suiteDestination: 'Destination',
  suiteCtaDefault: 'Learn more',
  pricingPill: 'Pricing',
  pricingCtaDefault: 'See full pricing',
  faqPill: 'FAQ',
  faqTitle: 'Frequently asked questions',
  bookDemoHero: 'Or book 15 min with the founder',
  bookDemoFinal: 'See if Volia is right for you',
  breadcrumbAria: 'Breadcrumb',
};

const FEATURES = {
  headline: 'find French B2B prospects fast',
  subline: 'Total France coverage, multi-source enrichment, and a confidence score that tells you exactly what to trust and what to prioritize.',
  items: [
    {
      icon: 'Search', featured: true,
      title: 'Search by industry + department',
      desc: '150+ B2B industries (food service, construction, real estate, healthcare, legal...) cross-referenced with 101 French departments via Google Places API. Multi-select regions/departments/cities. Zero blind spots in France.',
    },
    { icon: 'Layers', title: 'Waterfall multi-source enrichment', desc: 'Smart website scraping then Google search via Serper then pattern fallback. Stops as soon as an email is found.' },
    { icon: 'BarChart3', title: 'Confidence score per lead', desc: 'Each email is scored: Verified (~85% deliverability), Google (~70%), Probable (~50%). You prioritize.' },
    { icon: 'Brain', title: 'AI natural-language search', desc: 'Type "find 50 B2B SaaS in Paris" — Claude translates it into a Google Places query in 2 seconds.' },
    { icon: 'Download', title: 'Export to CSV / HubSpot / Salesforce', desc: 'Standard or pre-mapped CSV for any CRM. Auto-mapping: name, address, phone, email, score, website, Google rating.' },
    { icon: 'Shield', title: 'GDPR personal-email filter', desc: '28 domains blocked automatically (@gmail, @hotmail, @yahoo...). Toggleable, CNIL-compliant.' },
  ],
};

const HOW_IT_WORKS = [
  { icon: 'Search', title: '1. Pick industry and area', desc: 'Select one or more industries (150+ categories) and the area (regions, departments or city). Or just type it in plain English — Claude handles the rest.' },
  { icon: 'Sparkles', title: '2. Volia searches for you', desc: 'Waterfall enrichment runs automatically: Google Places then website then Google then patterns. 234 results in 30 seconds, with scored emails and phones.' },
  { icon: 'Download', title: '3. Export and reach out', desc: 'Clean CSV, ready for your CRM or for Volia Campaigns in 1 click. No copy-paste, no ETL, no mapping errors. You keep your data forever.' },
];

const FAQ = [
  { q: 'How many emails do I get per search?', a: 'On average, 47% of extracted prospects come back enriched with a professional email (sources: website scraping + Serper + patterns). On highly digital industries (SaaS, digital agencies, e-commerce) it climbs to 70-85%. On less-online industries (local trades, construction) it\'s more like 30-45%. In all cases, you see the confidence score before sending.' },
  { q: 'Where does the data come from?', a: 'Three combined sources: (1) Google Places API for business identification (name, address, phone, rating, reviews); (2) official website scraping for emails (Verified method); (3) Serper.dev to find the email via Google when the site doesn\'t list it (Google method). As a fallback, we generate a pattern (contact@domain.fr — Probable). No purchased lists, no scraped data.' },
  { q: 'Is it GDPR-compliant?', a: 'Yes, by default. Volia follows CNIL guidelines for B2B prospecting: legitimate interest basis, clear opt-out on every email, removal on request via /opt-out, permanent blocklist. A GDPR filter blocks 28 personal-email domains (@gmail, @hotmail, etc.) by default so you only contact professional emails. EU hosting, code Built in France.' },
  { q: 'Does it work outside metropolitan France?', a: 'Volia covers all 5 French overseas departments (Guadeloupe 971, Martinique 972, Guyana 973, Réunion 974, Mayotte 976) just like mainland. Same APIs, same categories, same prices. Actually an advantage: US-first competitors (Apollo, Hunter) have near-zero coverage on French overseas.' },
  { q: 'How is this different from Apollo / Hunter?', a: 'Three key differences: (1) Volia is 5x cheaper ($21 vs ~$92-99/mo); (2) Volia is France-specialized (287k FR companies, 78% coverage) while Apollo/Hunter are US-first (40% FR coverage); (3) Volia includes a phone number on every row and a waterfall that maximizes the email hit rate without burning credits. And of course: English-friendly support, GDPR-native, EU hosting.' },
  { q: 'Is there a daily enrichment limit?', a: 'No. You have a monthly quota based on your plan (100, 1k, 5k, 10k prospects/month), to use however you want — all at once or spread across the month. No daily cap, no user-side rate limit. Infrastructure-side, the waterfall stops as soon as an email is found, so we don\'t burn your credits on useless external APIs.' },
];

export default function EnProspectionPage() {
  return (
    <ProductPageLayout
      module="prospection"
      status="LIVE"
      locale="en"
      labels={EN_LABELS}
      moduleLabelOverride="Prospecting"
      hero={{
        eyebrow: 'The cheapest French B2B prospecting tool - Apollo alternative',
        h1Before: 'Find 1,000 qualified prospects',
        h1Highlight: 'in France.',
        h1After: 'In 30 seconds.',
        subtitle: (
          <>
            <strong className="text-content-primary font-semibold">287,000+ verified French companies</strong> with emails + phone numbers.{' '}
            <strong className="text-emerald-700 font-semibold">5x cheaper than Apollo</strong>. GDPR-compliant by default.
          </>
        ),
        ctaPrimary: { label: 'Start free', href: '/signup?plan=starter' },
        ctaSecondary: { label: 'See pricing', href: '/en/pricing' },
        trust: [
          (<><strong className="font-mono text-content-secondary">287,000+</strong> companies</>),
          (<><strong className="font-mono text-content-secondary">101</strong> departments</>),
          (<><strong className="font-mono text-content-secondary">150+</strong> industries</>),
          (<><ShieldCheck size={12} className="text-emerald-600" /> GDPR-compliant</>),
        ],
        mockup: (
          <div className="rounded-2xl bg-white border border-line shadow-2xl shadow-violet-500/10 overflow-hidden p-8">
            <div className="text-xs text-content-tertiary mb-4 font-mono">volia.fr/dashboard - 234 results</div>
            {[
              { name: 'La Bonne Table', email: 'contact@labonnetable.fr' },
              { name: 'Pasta Roma', email: 'info@pastaroma.fr' },
              { name: 'Le Petit Bistrot', email: 'reservation@petitbistrot.fr' },
              { name: 'Sushi Lounge Paris', email: 'contact@sushilounge.fr' },
            ].map((row) => (
              <div key={row.name} className="flex justify-between items-center py-3 border-b border-line last:border-b-0">
                <span className="text-sm font-semibold text-content-primary">{row.name}</span>
                <span className="text-xs text-content-tertiary font-mono">{row.email}</span>
              </div>
            ))}
          </div>
        ),
      }}
      features={FEATURES}
      howItWorks={HOW_IT_WORKS}
      crossSell={{
        subtitle: 'Your extracted prospects flow straight into Campaigns for sending, then into the CRM for pipeline tracking. Zero friction.',
        otherModules: [
          { module: 'campagnes', direction: 'out', desc: 'Launch email + SMS sequences on your extracted prospects. Templates included, auto-follow-ups, real-time stats.', cta: 'Learn more' },
          { module: 'crm', direction: 'out', desc: 'Native Kanban pipeline to track deals to close. Coming soon.', cta: 'Join the beta' },
        ],
      }}
      pricing={{
        label: 'Included in every plan, starting with Starter free',
        subtext: 'Starter $0 (100 prospects/mo) - Solo $21 (1k) - Pro $55 (5k) - Business $110 (10k + Campaigns + CRM). No commitment, 1-click cancel.',
        cta: 'See full pricing',
        ctaHref: '/en/pricing',
      }}
      faq={FAQ}
      finalCta={{
        title: 'Ready to stop paying Apollo 5x too much?',
        subtitle: '100 prospects free to test, no credit card. You keep everything you export, forever.',
        primary: { label: 'Start free', href: '/signup?plan=starter' },
        secondary: { label: 'See pricing', href: '/en/pricing' },
        trust: 'No CB - 1-click cancel - Built in France',
      }}
    />
  );
}
