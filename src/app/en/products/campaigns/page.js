// ─────────────────────────────────────────────────────────────────────
// /en/products/campaigns — Volia Campaigns (English)
// ─────────────────────────────────────────────────────────────────────

import ProductPageLayout from '@/components/ProductPageLayout';

const SITE_URL = 'https://volia.fr';
const PAGE_URL = `${SITE_URL}/en/products/campaigns`;
const FR_PAGE = `${SITE_URL}/produits/campagnes`;

export const metadata = {
  title: 'Volia Campaigns - B2B cold email that lands in Inbox, not Spam',
  description: 'Alternative to Lemlist + Instantly + Smartlead. Unlimited cold email, automatic 28-day domain warmup, multi-tenant Resend, auto-create deals in CRM from replies. Included in Pro $55/mo. 62% average open rate.',
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
    title: 'Volia Campaigns - Cold email that lands in Inbox',
    description: 'Replaces Lemlist + Instantly. Unlimited cold email + auto-warmup + auto-create CRM deals. $55/mo.',
    url: PAGE_URL,
    type: 'website',
    locale: 'en_US',
  },
};

const EN_LABELS = {
  products: 'Products', features: 'Features', pricing: 'Pricing', blog: 'Blog', faq: 'FAQ',
  breadcrumbProducts: 'Products', featuresPill: 'Features',
  featuresTitlePrefix: 'Everything to', featuresTitleDefault: 'send better than Lemlist',
  howItWorksPill: 'How it works', howItWorksTitle: 'Just 3 steps',
  suitePill: 'Volia Suite', suiteTitle: 'Connected to the rest of the Volia suite',
  suiteSubtitleDefault: 'Campaigns consumes Prospecting leads and feeds the CRM the moment a prospect replies. Full loop, zero copy-paste.',
  suiteSource: 'Source', suiteDestination: 'Destination', suiteCtaDefault: 'Learn more',
  pricingPill: 'Pricing', pricingCtaDefault: 'See full pricing',
  faqPill: 'FAQ', faqTitle: 'Frequently asked questions',
  bookDemoHero: 'Or book 15 min with the founder', bookDemoFinal: 'See if Volia is right for you',
  breadcrumbAria: 'Breadcrumb',
};

const FEATURES = {
  headline: 'send better than Lemlist',
  subline: 'Multi-tenant Resend, automatic warmup, auto-create CRM. Three things Lemlist + Instantly + Smartlead can\'t do together.',
  items: [
    { icon: 'Globe', featured: true, title: 'Native multi-tenant Resend', desc: 'Send from YOUR domain (DKIM / SPF / DMARC aligned automatically). 5-min setup via guided UI. Ideal for agencies: 1 Volia account, as many client domains as you want.' },
    { icon: 'Flame', title: 'Automatic 28-day warmup', desc: 'Progressively warms your domain (D1: 10/day to D28: 200/day). Zero config, zero external tool. Lemlist charges +$30/mo for this; Volia includes it.' },
    { icon: 'Repeat', title: 'Multi-inbox rotation', desc: 'Automatic sending distribution across multiple sender domains to preserve reputation. 3x volume without degrading deliverability.' },
    { icon: 'MousePointerClick', title: 'Open & click tracking', desc: 'Pixel + link tracking on dedicated subdomain. Real-time stats per sequence, per step, per template. Native A/B subject testing.' },
    { icon: 'Workflow', title: 'Auto-create CRM from replies', desc: 'A prospect replies = a deal is created automatically at Lead stage in Volia CRM. Zero manual entry, zero lost lead. Volia exclusive.' },
    { icon: 'BookOpen', wide: true, title: '20+ B2B email templates', desc: 'Cold email templates battle-tested on real volume: restaurants, construction, web agencies, e-commerce, SaaS, real estate. Each template has 3 variants (intro, follow-up, breakup). Import your own too.' },
  ],
};

const HOW_IT_WORKS = [
  { icon: 'Globe', title: 'Connect your domain', desc: 'DKIM / SPF / DMARC setup in 5 min via guided Resend UI. Automatic alignment verification.' },
  { icon: 'Flame', title: 'Start the warmup', desc: 'Volia warms your domain over 28 days (10 to 200 emails/day). Zero action from you, integrated monitoring.' },
  { icon: 'Send', title: 'Launch your sequences', desc: 'Pick an English/French template or start fresh. Replies automatically create deals in the CRM.' },
];

const FAQ = [
  { q: 'How many emails can I send per day?', a: 'During warmup (28 days): progressive ramp from 10 to 200 emails/day. Once warm, quota depends on plan: Solo 500 emails/month, Pro unlimited (up to 200/day per domain), Business unlimited with multi-domains. Real limit is deliverability — if bounce rate exceeds 2%, Volia auto-pauses.' },
  { q: 'How do I avoid the spam folder?', a: 'Four safeguards: (1) mandatory 28-day automatic warmup before any volume sending, (2) DKIM / SPF / DMARC verification on domain connection, (3) bounce rate monitoring with auto-pause if > 2%, (4) unified opt-out preserving domain reputation long-term. Average beta result: 62% open rate, 94% inbox rate.' },
  { q: 'What is email domain warmup?', a: 'Warmup means progressively increasing send volume on a new domain so Google / Outlook treat it as legitimate. Without warmup, a brand-new domain sending 100 emails on day 1 ends up in spam. Volia simulates exchanges and ramps from 10 to 200 emails/day over 28 days. Lemlist sells it for +$30/mo, Volia includes it in every plan.' },
  { q: 'How is this different from Lemlist?', a: 'Three major differences: (1) Volia is native multi-tenant Resend (you send from YOUR domain, Lemlist routes through their infra), (2) warmup is included vs paid add-on, (3) auto-create CRM from replies — Volia exclusive. Pricing: Lemlist $39 for 50 emails/day, Volia Pro $55 for unlimited cold email + warmup + tracking.' },
  { q: 'Can I use my own sending domain?', a: 'Yes — it\'s actually required and is the foundation of Volia Campaigns. You connect your domain (e.g. your-saas.com), Volia verifies DKIM / SPF / DMARC DNS records in 5 min, and all sends go from that domain. You keep your brand identity and your reputation stays yours.' },
  { q: 'How does GDPR opt-out work?', a: 'Unsubscribe link added automatically in every email footer (impossible to disable). Opt-out feeds a permanent blocklist: an unsubscribed prospect will never be contacted again, even via another sequence or another Volia account. CNIL-compliant boilerplate, legitimate-interest basis documented, opposition register kept automatically.' },
];

export default function EnCampaignsPage() {
  return (
    <ProductPageLayout
      module="campagnes"
      status="BETA"
      locale="en"
      labels={EN_LABELS}
      moduleLabelOverride="Campaigns"
      hero={{
        eyebrow: 'Alternative to Lemlist + Instantly',
        h1Before: 'B2B cold email that lands in',
        h1Highlight: 'Inbox,',
        h1After: 'not Spam.',
        subtitle: (
          <>
            Lemlist $39. Instantly $30. <strong className="text-content-primary font-semibold">Volia Campaigns: included in Pro at $55</strong>. Auto 28-day warmup + multi-inbox + <strong className="text-emerald-700 font-semibold">auto-create CRM from replies</strong>.
          </>
        ),
        ctaPrimary: { label: 'Start free trial', href: '/signup?plan=pro' },
        ctaSecondary: { label: 'See pricing', href: '/en/pricing' },
        trust: [
          'Auto 28-day warmup',
          'Multi-domain Resend',
          'GDPR 1-click opt-out',
          'Auto-create CRM',
        ],
        mockup: (
          <div className="rounded-2xl bg-white border border-line shadow-2xl shadow-blue-500/10 overflow-hidden p-8">
            <div className="text-xs text-content-tertiary mb-4 font-mono">volia.fr/campaigns - "Restaurants Paris" sequence</div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div><div className="text-2xl font-bold font-mono text-blue-700">62%</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Opens</div></div>
              <div><div className="text-2xl font-bold font-mono text-emerald-700">94%</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Inbox</div></div>
              <div><div className="text-2xl font-bold font-mono text-cyan-700">14%</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Reply</div></div>
            </div>
            {['D+0 - Intro - "Quick question about {{company}}"', 'D+3 - Follow-up - "Re: Quick question..."', 'D+7 - Bump - "Last try {{firstname}}?"'].map((s) => (
              <div key={s} className="text-xs text-content-secondary py-2 border-b border-line last:border-b-0">{s}</div>
            ))}
          </div>
        ),
      }}
      features={FEATURES}
      howItWorks={HOW_IT_WORKS}
      crossSell={{
        subtitle: 'Campaigns consumes Prospecting leads and feeds the CRM the moment a prospect replies. Full loop, zero copy-paste.',
        otherModules: [
          { module: 'prospection', direction: 'in', desc: 'The source of your prospects. 287k+ FR companies, 150+ industries, scored enriched emails.', cta: 'Discover Prospecting' },
          { module: 'crm', direction: 'out', desc: 'Every reply becomes a deal at Lead stage. Native Volia Kanban pipeline. Private beta Q3 2026.', cta: 'Join the beta' },
        ],
      }}
      pricing={{
        label: 'Included in Pro ($55) and Business ($110)',
        subtext: 'Pro = unlimited cold email + warmup + tracking + multi-inbox. Business = Pro + integrated CRM + auto-create deals from replies. No hidden add-ons, 1-click cancel.',
        cta: 'See full pricing',
        ctaHref: '/en/pricing',
      }}
      faq={FAQ}
      finalCta={{
        title: 'Cold email that works, for the price of a coffee.',
        subtitle: 'Cut your stack by 3, double your deliverability. Templates ready, warmup auto, replies in CRM — you just hit Play.',
        primary: { label: 'Start free trial', href: '/signup?plan=pro' },
        secondary: { label: 'See pricing', href: '/en/pricing' },
        trust: 'Included in Pro - 14-day trial - Lemlist migration assisted - GDPR by default',
      }}
    />
  );
}
