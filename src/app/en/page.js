// ─────────────────────────────────────────────────────────────────────
// /en — Volia landing (English) for US/UK markets
// ─────────────────────────────────────────────────────────────────────
// hreflang fr/en bi-directional, USD prices shown alongside EUR billing,
// "Built in France" positioned as charm rather than RGPD-first.
// ─────────────────────────────────────────────────────────────────────

import LandingContentEN from '@/components/LandingContentEN';

const SITE_URL = 'https://volia.fr';
const PAGE_URL = `${SITE_URL}/en`;

export const metadata = {
  title: 'Volia - B2B sales suite. Prospecting + Cold Email + CRM, from $21/mo',
  description: "The all-in-one B2B sales platform built in France. Replaces Apollo + Lemlist + HubSpot for 5x less. 287,000+ verified French companies, waterfall enrichment, native cold email + CRM. From $21 (EUR 19) / month.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'fr-FR': SITE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'Volia - B2B sales suite from $21/mo',
    description: 'Prospecting + Cold Email + CRM in one tool. Replaces Apollo + Lemlist + HubSpot for 5x less. Built in France, GDPR-compliant.',
    url: PAGE_URL,
    siteName: 'Volia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volia - B2B sales suite from $21/mo',
    description: 'Prospecting + Cold Email + CRM in one tool. Built in France, GDPR-compliant.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD : SoftwareApplication schema in EN with USD offers.
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Volia',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'SalesIntelligence',
  operatingSystem: 'Web',
  description: 'All-in-one B2B sales platform built in France. Prospecting (287k+ French companies) + Cold Email with auto-warmup + native CRM. Starts at $21 (EUR 19) per month.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  countriesSupported: ['FR', 'US', 'GB'],
  featureList: [
    'B2B prospecting across 287,000+ French companies',
    'Waterfall email enrichment (scraping + Google search + patterns)',
    'Cold email with native 28-day domain warmup',
    'Built-in CRM with auto-create deals from replies',
    'GDPR-compliant by default',
    'No commitment, cancel anytime',
  ],
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/signup` },
    { '@type': 'Offer', name: 'Solo', price: '21', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/signup` },
    { '@type': 'Offer', name: 'Pro', price: '55', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/signup` },
    { '@type': 'Offer', name: 'Business', price: '110', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/signup` },
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Volia',
    url: SITE_URL,
  },
};

export default function LandingPageEN() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <LandingContentEN />
    </>
  );
}
