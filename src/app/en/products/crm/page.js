// ─────────────────────────────────────────────────────────────────────
// /en/products/crm — Volia CRM (English)
// ─────────────────────────────────────────────────────────────────────

import ProductPageLayout from '@/components/ProductPageLayout';

const SITE_URL = 'https://volia.fr';
const PAGE_URL = `${SITE_URL}/en/products/crm`;
const FR_PAGE = `${SITE_URL}/produits/crm`;

export const metadata = {
  title: 'Volia CRM - HubSpot alternative, included in Business $110/mo',
  description: 'HubSpot Starter $90. Pipedrive $49. Salesforce $125. Volia CRM: $0 extra on Business. Drag-drop Kanban, auto-create deals from replies, 360 timeline, natively integrated with Prospecting + Campaigns.',
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
    title: 'Volia CRM - HubSpot alternative built into your sales suite',
    description: 'A CRM built into your Prospecting + Campaigns. Not an integration. $110/mo all-in vs $270+ for HubSpot + Apollo + Lemlist.',
    url: PAGE_URL,
    type: 'website',
    locale: 'en_US',
  },
};

const EN_LABELS = {
  products: 'Products', features: 'Features', pricing: 'Pricing', blog: 'Blog', faq: 'FAQ',
  breadcrumbProducts: 'Products', featuresPill: 'Features',
  featuresTitlePrefix: 'Everything to', featuresTitleDefault: 'run your sales pipeline',
  howItWorksPill: 'How it works', howItWorksTitle: 'Just 3 steps',
  suitePill: 'Volia Suite', suiteTitle: 'Connected to the rest of the Volia suite',
  suiteSubtitleDefault: 'Volia CRM consumes contacts who reply in Campaigns, which come from prospects extracted in Prospecting. The loop closes natively.',
  suiteSource: 'Source', suiteDestination: 'Destination', suiteCtaDefault: 'Learn more',
  pricingPill: 'Pricing', pricingCtaDefault: 'See full pricing',
  faqPill: 'FAQ', faqTitle: 'Frequently asked questions',
  bookDemoHero: 'Or book 15 min with the founder', bookDemoFinal: 'See if Volia is right for you',
  breadcrumbAria: 'Breadcrumb',
};

const FEATURES = {
  headline: 'pipe your pipeline',
  subline: 'Not a mini-Salesforce. A lightweight CRM, native to Volia, already wired to Prospecting and Campaigns. 6 features built for founders and small sales teams.',
  items: [
    { icon: 'KanbanSquare', featured: true, title: 'Native drag-drop Kanban', desc: 'Visual pipeline with 5 default columns (Lead → Qualified → Demo → Proposal → Closed). Drag to move a deal forward. Customizable stages (Q3 2026). Live total pipeline value.' },
    { icon: 'MessageSquare', title: 'Auto-create from replies', desc: 'A prospect replies to a Volia Campaigns sequence? A deal is created automatically at Lead stage with the full email history. No more copy-paste.' },
    { icon: 'Users', title: '360 timeline per contact', desc: 'Every interaction in 1 view: emails sent, opened, clicked, replied, notes, calls, meetings. Full-text search. To pick up a conversation 3 months later without re-reading 50 emails.' },
    { icon: 'BarChart3', title: 'Automatic weighting', desc: 'Each stage has its closing probability (10% Lead, 25% Qualified, 50% Demo, 75% Proposal, 100% Won). Weighted pipeline and M+1 forecast live-computed.' },
    { icon: 'FileText', title: 'Activities log', desc: 'Notes, calls, meetings, tasks with due_at, files attached per deal. Mention a teammate (@) to share. Immutable timestamped history.' },
    { icon: 'Send', wide: true, title: 'Volia Prospecting integration', desc: 'From a Volia Prospecting search result, "Send to CRM" button to create a deal directly. Variables (name, city, industry, phone) are auto-mapped. No CSV export.' },
  ],
};

const HOW_IT_WORKS = [
  { icon: 'Settings', title: '5-minute setup', desc: 'Default pipeline ready out of the box (5 stages, probabilities preconfigured). No consultant, no onboarding call, no template to pick.' },
  { icon: 'MessageSquare', title: 'Deals show up by themselves', desc: 'Every positive reply to a Campaigns sequence creates a deal in the Lead column with full history. You never miss an opportunity.' },
  { icon: 'TrendingUp', title: 'Drive to close', desc: 'Drag and drop deals stage to stage. Notes, calls, files per deal. Weighted forecast, closing rate and cycle time computed live.' },
];

const FAQ = [
  { q: 'What are the default pipeline stages?', a: '5 preconfigured stages with probabilities: Lead (10%), Qualified (25%), Demo (50%), Proposal (75%), Closed (100%). You also get a Lost stage to archive lost deals with a reason (no budget, competitor, timing, etc.). Weighted pipeline and M+1 forecast recompute on every deal move.' },
  { q: 'Can I create custom stages?', a: 'Not yet — on the Q3 2026 roadmap. Short-term we chose to enforce a standard pipeline so the beta is usable in 5 min without configuration. Custom pipelines will arrive with a visual editor (drag to reorder stages, slider for probability, color per column).' },
  { q: 'How exactly does auto-create from replies work?', a: 'Volia Campaigns detects positive replies on your sequences (Reply Intent classification via Claude). As soon as a prospect replies, a deal is created in the CRM at Lead stage with: full contact, history of sent/opened/clicked emails, full reply content, and auto-tag with source sequence name. Zero manual action.' },
  { q: 'How is it different from free HubSpot CRM?', a: 'HubSpot CRM free has Kanban + timeline, sure. But: (1) for outbound you have to add HubSpot Marketing Hub ($45/mo minimum), (2) no native integration between HubSpot and Apollo/Lemlist (you pay Zapier $30/mo), (3) free limit is 1M contacts but 5 deal pipelines max. Volia CRM is included in the same product as prospecting and sending — no integration to maintain.' },
  { q: 'Can I migrate from Pipedrive or HubSpot?', a: 'Yes. Standard CSV import available today for contacts and deals (auto column mapping). Assisted migration via HubSpot and Pipedrive API planned Q2 2026 (direct export without CSV). For Salesforce, manual CSV export works today. If you have more than 5,000 contacts to migrate, we help you on a call.' },
  { q: 'How many seats does Business include?', a: 'Business $110/mo: up to 5 seats included (perfect for a small team 1-5 people — founder + 2-3 SDRs + 1 closer). Beyond that, +$15/user/mo. Each user gets their own dashboard, their own deals, and the founder sees everything. No $50-100 per-user license like HubSpot Pro or Salesforce.' },
];

export default function EnCrmPage() {
  return (
    <ProductPageLayout
      module="crm"
      status="LIVE"
      locale="en"
      labels={EN_LABELS}
      moduleLabelOverride="CRM"
      hero={{
        eyebrow: 'HubSpot alternative built into your sales suite',
        h1Before: 'A CRM built into your Prospecting + Campaigns.',
        h1Highlight: 'Not an integration.',
        subtitle: (
          <>
            HubSpot $90. Pipedrive $49. Salesforce $125.{' '}
            <strong className="text-content-primary font-semibold">Volia CRM: $0 extra if you&apos;re on Business</strong>.
            Drag-drop Kanban + auto-create deals from replies + <strong className="text-emerald-700 font-semibold">360 timeline per contact</strong>.
          </>
        ),
        ctaPrimary: { label: 'Get Business $110', href: '/signup?plan=business' },
        ctaSecondary: { label: 'See pricing', href: '/en/pricing' },
        trust: [
          'Native Kanban',
          'Auto-create from replies',
          '360 timeline',
          'Included in Business $110',
        ],
        mockup: (
          <div className="rounded-2xl bg-white border border-line shadow-2xl shadow-emerald-500/10 overflow-hidden p-8">
            <div className="text-xs text-content-tertiary mb-4 font-mono">volia.fr/crm - Pipeline Q2</div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div><div className="text-2xl font-bold font-mono text-emerald-700">$47k</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Weighted</div></div>
              <div><div className="text-2xl font-bold font-mono text-teal-700">21%</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Close rate</div></div>
              <div><div className="text-2xl font-bold font-mono text-green-700">18 d</div><div className="text-[10px] text-content-tertiary uppercase tracking-wider">Avg cycle</div></div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-[10px]">
              {['Lead', 'Qualified', 'Demo', 'Proposal', 'Closed'].map((col) => (
                <div key={col} className="bg-emerald-50 border border-emerald-200 rounded p-2 text-center">
                  <div className="font-bold text-emerald-700 uppercase tracking-wider">{col}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      }}
      features={FEATURES}
      howItWorks={HOW_IT_WORKS}
      crossSell={{
        subtitle: 'Volia CRM consumes contacts who reply in Campaigns, which come from prospects extracted in Prospecting. The loop closes natively.',
        otherModules: [
          { module: 'prospection', direction: 'in', desc: 'The top of the funnel. 150+ industries, 101 departments, scored enriched emails. "Send to CRM" 1-click button.', cta: 'Discover Prospecting' },
          { module: 'campagnes', direction: 'in', desc: 'Email sequences with follow-ups. Every positive reply auto-creates a deal in the CRM Lead column.', cta: 'Discover Campaigns' },
        ],
      }}
      pricing={{
        label: 'CRM gated to Business - $110/mo all-in',
        subtext: 'The 3 modules together (Prospecting + Campaigns + CRM). Up to 5 seats, 10,000 prospects in pipeline, unlimited deals. No $50-100 per-user license like HubSpot or Salesforce.',
        cta: 'Get Business',
        ctaHref: '/signup?plan=business',
      }}
      faq={FAQ}
      finalCta={{
        title: 'A CRM that fills itself, for $90/mo less.',
        subtitle: 'Stop the HubSpot + Apollo + Lemlist + Zapier mess. Move to Volia Business: one product, one login, one bill. Cancel anytime.',
        primary: { label: 'Get Business $110', href: '/signup?plan=business' },
        secondary: { label: 'See pricing', href: '/en/pricing' },
        trust: '$110/mo all-in - 5 seats - 10,000 prospects in pipeline - 1-click cancel - GDPR by default',
      }}
    />
  );
}
