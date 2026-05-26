import PricingContentEN from '@/components/PricingContentEN';

const SITE_URL = 'https://volia.fr';
const PAGE_URL = `${SITE_URL}/en/pricing`;
const FR_PRICING = `${SITE_URL}/pricing`;

export const metadata = {
  title: 'Volia Pricing - B2B sales suite from $21/mo (EUR 19)',
  description: 'Transparent USD pricing for Volia, the B2B sales suite built in France. Starter $0, Solo $21, Pro $55, Business $110/mo. Replaces Apollo + Lemlist + HubSpot. No commitment.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'fr-FR': FR_PRICING,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'x-default': FR_PRICING,
    },
  },
  openGraph: {
    title: 'Volia Pricing - 5x cheaper than Apollo + Lemlist + HubSpot',
    description: 'Prospecting + Cold Email + CRM from $21/mo. Built in France, GDPR-compliant.',
    url: PAGE_URL,
    siteName: 'Volia',
    locale: 'en_US',
    type: 'website',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Volia - B2B sales suite',
  description: 'All-in-one B2B sales platform: prospecting + cold email + CRM. Built in France.',
  url: PAGE_URL,
  brand: { '@type': 'Brand', name: 'Volia' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '0',
    highPrice: '110',
    offerCount: 4,
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '0', priceCurrency: 'USD', url: `${SITE_URL}/signup?plan=free` },
      { '@type': 'Offer', name: 'Solo', price: '21', priceCurrency: 'USD', url: `${SITE_URL}/signup?plan=solo` },
      { '@type': 'Offer', name: 'Pro', price: '55', priceCurrency: 'USD', url: `${SITE_URL}/signup?plan=pro` },
      { '@type': 'Offer', name: 'Business', price: '110', priceCurrency: 'USD', url: `${SITE_URL}/signup?plan=business` },
    ],
  },
};

export default function PricingPageEN() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <PricingContentEN />
    </>
  );
}
