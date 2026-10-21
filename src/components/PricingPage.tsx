import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  Plus,
  Minus,
  Zap,
  Link2,
  Clock,
  Users,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { StartBuildingSection } from './StartBuildingSection.tsx';
import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';

interface PricingPageProps {
  onNavigateHome: () => void;
  onOpenPricing?: () => void;
  onOpenIntegrations?: () => void;
  onOpenBYOK?: () => void;
  onOpenJoin: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
}

interface PlanCard {
  id: string;
  name: string;
  price: string;
  period?: string;
  subtitle: string;
  isPopular?: boolean;
  buttonLabel: string;
  features: {
    icon: 'zap' | 'link' | 'clock' | 'users' | 'shield' | 'message';
    text: string;
    hasTooltip?: boolean;
  }[];
}

const PLANS: PlanCard[] = [
  {
    id: 'hobby',
    name: 'Hobby',
    price: '$0',
    subtitle: 'No credit card required',
    buttonLabel: 'Start for free',
    features: [
      { icon: 'zap', text: '100,000 tool calls / mo', hasTooltip: true },
      { icon: 'link', text: 'Connect unlimited accounts', hasTooltip: true },
      { icon: 'clock', text: '50,000 triggers / mo' },
      { icon: 'users', text: '3 team members' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/ mo',
    subtitle: 'Everything you need to scale',
    isPopular: true,
    buttonLabel: 'Start scaling',
    features: [
      { icon: 'zap', text: 'Everything in Hobby' },
      { icon: 'clock', text: '$29 monthly usage credit included', hasTooltip: true },
      { icon: 'users', text: 'Unlimited team members' },
      { icon: 'shield', text: 'Spend controls + all add-ons' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'For organizations with complex requirements',
    buttonLabel: 'Get a demo',
    features: [
      { icon: 'zap', text: 'Everything in Pro, plus maximum limits' },
      { icon: 'clock', text: 'Committed volume + discounts' },
      { icon: 'users', text: 'Annual invoicing + custom billing terms' },
      { icon: 'shield', text: 'SSO / SCIM / customer-managed keys' },
      { icon: 'link', text: 'Advanced white-labeling included' },
      { icon: 'shield', text: 'MSA / DPA / BAA included' },
      { icon: 'message', text: 'Dedicated support + SLA' },
    ],
  },
];

interface ComparisonFeature {
  name: string;
  hobby: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
  hasInfo?: boolean;
  tag?: string;
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  { name: '1500+ toolkits', hobby: true, pro: true, enterprise: true },
  { name: 'OAuth management', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Triggers', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Sessions', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Roow-managed apps', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Custom tools & MCP', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Self-managed credentials', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Basic white-labeling', hobby: true, pro: true, enterprise: true, hasInfo: true },
  { name: 'Advanced white-labeling', hobby: false, pro: 'Add-on', enterprise: true, hasInfo: true },
  { name: 'Higher API rate limits', hobby: false, pro: true, enterprise: true, hasInfo: true },
  { name: 'Read-only dashboard role', hobby: false, pro: true, enterprise: true, hasInfo: true },
  { name: 'IP allowlist', hobby: false, pro: 'Add-on', enterprise: true, hasInfo: true },
  { name: 'DPA', tag: 'self-serve in dashboard', hobby: false, pro: true, enterprise: true, hasInfo: true },
  { name: 'BAA', hobby: false, pro: 'Add-on', enterprise: true, hasInfo: true },
  { name: 'ZDR', tag: 'select features', hobby: false, pro: 'Add-on', enterprise: true, hasInfo: true },
  { name: 'SSO / SCIM', hobby: false, pro: false, enterprise: true, hasInfo: true },
  { name: 'Customer-managed keys (KMS)', hobby: false, pro: false, enterprise: true, hasInfo: true },
  { name: 'Custom integrations', tag: 'on request', hobby: false, pro: false, enterprise: true, hasInfo: true },
  {
    name: 'Support',
    hobby: 'Portal',
    pro: 'Portal + Email + Slack at $1K',
    enterprise: 'Dedicated + custom SLAs',
  },
];

interface AccordionSection {
  title: string;
  content: string;
}

const DETAIL_ACCORDIONS: AccordionSection[] = [
  {
    title: 'Usage pricing',
    content:
      'Usage beyond your included plan tier is metered transparently. Tool executions start at $0.0005 per successful call. Webhook triggers and scheduler events start at $0.0002. Storage and high-throughput vector indexing are charged with zero arbitrary markups.',
  },
  {
    title: 'Roow-managed apps',
    content:
      'Roow provides verified, production-ready OAuth applications for hundreds of major services (Google, GitHub, Discord, Slack, Supabase, and more). We handle app verification, credential rotation, and refresh token pipelines out of the box with zero setup required.',
  },
  {
    title: 'Add-ons',
    content:
      'Customize your tier with optional modular add-ons: Advanced White-Labeling (custom domains and branded OAuth screens), Dedicated Egress IP Allowlisting, Business Associate Agreements (BAA) for HIPAA compliance, and Zero Data Retention (ZDR) mode.',
  },
  {
    title: 'Instant Tools',
    content:
      'Instant Tools execute sandboxed headless browser sessions, shell execution, code sandboxes, and arbitrary MCP servers with sub-second spin-up times. Metered dynamically by memory footprint and duration, seamlessly deducted from your monthly credits.',
  },
];

const FAQS = [
  {
    q: 'Is the Hobby plan really free?',
    a: 'Yes, absolutely. The Hobby plan gives you 100,000 tool calls, 50,000 triggers, and up to 3 team members completely free every month with no credit card required.',
  },
  {
    q: 'What is the difference between my own app and a Roow-managed app?',
    a: 'With your own app, you provide your own developer credentials and manage verification through the provider. With a Roow-managed app, we manage the OAuth verification, secrets, and token lifecycles automatically so you can connect in seconds.',
  },
  {
    q: 'How does the $29 Pro plan work?',
    a: 'The $29/mo Pro plan includes $29 in monthly usage credits, unlimited team members, spend controls, and access to all add-ons and higher rate limits.',
  },
  {
    q: 'What happens when I hit a limit?',
    a: 'On Hobby, actions pause until your next monthly renewal unless you upgrade. On Pro, your spend controls dictate whether execution draws from usage overage or hard stops at your designated threshold.',
  },
  {
    q: 'How are Instant Tools billed?',
    a: 'Instant Tools are metered per run based on CPU and memory allocation. They draw directly from your plan’s included credits before any additional billing applies.',
  },
  {
    q: 'What are the optional add-ons?',
    a: 'Add-ons include custom white-label branding, dedicated static IP allowlists, HIPAA compliance (BAA), and Zero Data Retention (ZDR) modes.',
  },
  {
    q: 'How do add-ons add up?',
    a: 'You can enable or disable add-ons anytime directly in your workspace settings. Add-on costs are prorated to the exact day of activation on your monthly bill.',
  },
  {
    q: 'What is proxy execute?',
    a: 'Proxy execute routes all outgoing API calls through dedicated egress proxies to allow seamless integration with internal enterprise APIs behind strict corporate firewalls.',
  },
  {
    q: 'Can I avoid a surprise bill?',
    a: 'Yes. Roow enforces strict, user-defined budget caps and real-time spend notifications so you are always in complete control of your usage.',
  },
];

const renderFeatureIcon = (
  icon: 'zap' | 'link' | 'clock' | 'users' | 'shield' | 'message',
  isPro?: boolean,
  isHovered?: boolean
) => {
  let iconCls = 'w-4 h-4 shrink-0 transition-colors duration-200 ';
  if (isHovered) {
    iconCls += isPro ? 'text-white' : 'text-black';
  } else {
    iconCls += isPro ? 'text-[#38bdf8]' : 'text-[#E3EF4F]';
  }

  switch (icon) {
    case 'zap':
      return <Zap className={iconCls} strokeWidth={1.5} />;
    case 'link':
      return <Link2 className={iconCls} strokeWidth={1.5} />;
    case 'clock':
      return <Clock className={iconCls} strokeWidth={1.5} />;
    case 'users':
      return <Users className={iconCls} strokeWidth={1.5} />;
    case 'shield':
      return <ShieldCheck className={iconCls} strokeWidth={1.5} />;
    case 'message':
      return <Headphones className={iconCls} strokeWidth={1.5} />;
    default:
      return <Check className={iconCls} strokeWidth={1.5} />;
  }
};

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigateHome,
  onOpenPricing,
  onOpenIntegrations,
  onOpenBYOK,
  onOpenJoin,
  onOpenContact,
  onOpenAbout,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#E3EF4F] selection:text-black">
      {/* Sticky Top Navbar */}
      <Navbar
        onOpenAbout={onOpenAbout}
        onOpenPricing={() => {
          if (onOpenPricing) {
            onOpenPricing();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenIntegrations={onOpenIntegrations}
        onOpenBYOK={onOpenBYOK}
        onOpenJoin={onOpenJoin}
        onNavigateHome={onNavigateHome}
        isPricingActive={true}
        isBYOKActive={false}
      />

      <main className="flex-1 flex flex-col justify-start">
        {/* Pricing Main Container */}
        <section className="relative w-full bg-black select-none overflow-hidden">
          <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
            <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black">
              
              {/* Header Hero */}
              <div className="pt-16 sm:pt-24 pb-14 sm:pb-20 px-6 sm:px-12 text-center flex flex-col items-center border-b border-dashed border-white/20">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-[#E3EF4F]/30 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3EF4F] shadow-[0_0_8px_#E3EF4F]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#E3EF4F] font-bold">
                      PRICING PLANS
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white font-sans antialiased leading-[1.08] mb-5 max-w-3xl">
                  Start for free. Then pay as you go.
                </h1>

                <p className="text-sm sm:text-base text-neutral-400 font-sans antialiased max-w-2xl leading-relaxed">
                  100,000 tool calls, 50,000 triggers, and 3 team members included free each month.
                  Easily scale when you need more.
                </p>
              </div>

              {/* 3 Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-white/20 bg-black">
                {PLANS.map((plan) => {
                  const isPro = plan.isPopular;
                  const isHovered = hoveredCard === plan.id;

                  return (
                    <div
                      key={plan.id}
                      onMouseEnter={() => setHoveredCard(plan.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[480px] sm:min-h-[520px] overflow-hidden group cursor-pointer transition-colors duration-200"
                    >
                      {/* Smooth gradient hover overlay:
                          - Yellow gradient for Hobby & Enterprise
                          - Blue gradient for Pro */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        } ${
                          isPro
                            ? 'bg-gradient-to-br from-[#2f78ff] via-[#0055d4] to-[#00287a]'
                            : 'bg-gradient-to-br from-[#f5fc64] via-[#E3EF4F] to-[#cbd827]'
                        }`}
                      />

                      {/* Top highlight bar on Pro card (when not hovered) */}
                      {isPro && !isHovered && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-[#0055d4] shadow-[0_0_12px_#0055d4] z-20" />
                      )}

                      {/* Card Content - elevated with relative z-10 */}
                      <div className="relative z-10">
                        {/* Header & Title */}
                        <div className="flex items-center justify-between mb-4">
                          <h3
                            className={`text-xl sm:text-2xl font-semibold tracking-tight font-sans transition-colors duration-200 ${
                              isHovered
                                ? isPro
                                  ? 'text-white'
                                  : 'text-black'
                                : 'text-white'
                            }`}
                          >
                            {plan.name}
                          </h3>
                          <ArrowUpRight
                            className={`w-5 h-5 transition-all duration-200 ${
                              isHovered
                                ? isPro
                                  ? 'text-white translate-x-0.5 -translate-y-0.5'
                                  : 'text-black translate-x-0.5 -translate-y-0.5'
                                : 'text-neutral-500'
                            }`}
                          />
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-1 mb-2">
                          <span
                            className={`text-4xl sm:text-5xl font-medium tracking-tight font-sans transition-colors duration-200 ${
                              isHovered
                                ? isPro
                                  ? 'text-white'
                                  : 'text-black'
                                : plan.id === 'hobby'
                                ? 'text-[#E3EF4F]'
                                : 'text-white'
                            }`}
                          >
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span
                              className={`text-sm font-sans transition-colors duration-200 ${
                                isHovered
                                  ? isPro
                                    ? 'text-blue-100'
                                    : 'text-neutral-800'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {plan.period}
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-xs font-sans min-h-[1.5rem] transition-colors duration-200 ${
                            isHovered
                              ? isPro
                                ? 'text-blue-100'
                                : 'text-neutral-800'
                              : 'text-neutral-400'
                          }`}
                        >
                          {plan.subtitle}
                        </p>

                        <div
                          className={`w-full h-px my-6 transition-colors duration-200 ${
                            isHovered
                              ? isPro
                                ? 'bg-white/25'
                                : 'bg-black/15'
                              : 'bg-white/10'
                          }`}
                        />

                        {/* Features list */}
                        <ul className="space-y-3.5">
                          {plan.features.map((feat, idx) => (
                            <li
                              key={idx}
                              className={`flex items-center justify-between text-xs sm:text-[13px] font-sans transition-colors duration-200 ${
                                isHovered
                                  ? isPro
                                    ? 'text-white'
                                    : 'text-neutral-950 font-medium'
                                  : 'text-neutral-300'
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                {renderFeatureIcon(feat.icon, isPro, isHovered)}
                                <span>{feat.text}</span>
                              </span>
                              {feat.hasTooltip && (
                                <HelpCircle
                                  className={`w-3.5 h-3.5 transition-colors cursor-pointer shrink-0 ${
                                    isHovered
                                      ? isPro
                                        ? 'text-white/80 hover:text-white'
                                        : 'text-neutral-700 hover:text-black'
                                      : 'text-neutral-600 hover:text-neutral-400'
                                  }`}
                                  strokeWidth={1.5}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <div className="relative z-10 pt-8 mt-auto">
                        <button
                          type="button"
                          onClick={() => {
                            if (plan.id === 'enterprise') {
                              onOpenContact();
                            } else {
                              onOpenJoin();
                            }
                          }}
                          className={`w-full py-3 px-4 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm ${
                            isHovered
                              ? isPro
                                ? 'bg-white text-[#0055d4] hover:bg-blue-50 shadow-lg'
                                : 'bg-black text-white hover:bg-neutral-900 border-none shadow-lg'
                              : isPro
                              ? 'bg-[#0055d4] hover:bg-[#0047b8] text-white shadow-lg shadow-blue-500/20'
                              : plan.id === 'hobby'
                              ? 'bg-[#E3EF4F] hover:bg-[#d8e442] text-black shadow-md shadow-[#E3EF4F]/20'
                              : 'bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-700'
                          }`}
                        >
                          {plan.buttonLabel}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compare features by plan Table */}
              <div className="border-t border-dashed border-white/20 bg-black">
                <div className="pt-14 sm:pt-20 pb-8 px-6 sm:px-12 flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-sans">
                    Compare features by plan
                  </h2>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] border border-white/10 text-[11px] font-mono text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3EF4F]" />
                    <span>Hobby includes all core capabilities free</span>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-[0.12em] text-neutral-400 bg-white/[0.02]">
                        <th className="py-4 px-6 sm:px-12 w-2/5 font-semibold">Feature</th>
                        <th className="py-4 px-4 w-1/5 font-semibold text-center text-[#E3EF4F]">Hobby</th>
                        <th className="py-4 px-4 w-1/5 font-semibold text-center text-[#38bdf8]">Pro</th>
                        <th className="py-4 px-4 w-1/5 font-semibold text-center">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-xs sm:text-[13px] font-sans">
                      {COMPARISON_FEATURES.map((item, idx) => {
                        const renderValue = (val: boolean | string, col?: 'hobby' | 'pro' | 'enterprise') => {
                          if (val === true) {
                            if (col === 'hobby') {
                              return <Check className="w-4 h-4 text-[#E3EF4F] mx-auto" strokeWidth={1.75} />;
                            }
                            if (col === 'pro') {
                              return <Check className="w-4 h-4 text-[#38bdf8] mx-auto" strokeWidth={1.75} />;
                            }
                            return <Check className="w-4 h-4 text-white mx-auto" strokeWidth={1.75} />;
                          }
                          if (val === false) {
                            return <X className="w-3.5 h-3.5 text-neutral-600 mx-auto" strokeWidth={1.75} />;
                          }
                          return (
                            <span className="font-mono text-[11px] text-neutral-300">
                              {val}
                            </span>
                          );
                        };

                        return (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-6 sm:px-12 text-neutral-200">
                              <div className="flex items-center gap-2">
                                <span>{item.name}</span>
                                {item.tag && (
                                  <span className="text-[10px] font-mono text-neutral-500">
                                    {item.tag}
                                  </span>
                                )}
                                {item.hasInfo && (
                                  <HelpCircle className="w-3 h-3 text-neutral-600 hover:text-neutral-400 cursor-pointer shrink-0" strokeWidth={1.5} />
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">{renderValue(item.hobby, 'hobby')}</td>
                            <td className="py-3.5 px-4 text-center bg-[#0055d4]/[0.02]">{renderValue(item.pro, 'pro')}</td>
                            <td className="py-3.5 px-4 text-center">{renderValue(item.enterprise, 'enterprise')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Bottom Action Buttons matching reference */}
                <div className="py-8 px-6 sm:px-12 border-t border-white/10 bg-white/[0.01]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="py-2.5 px-4 bg-[#E3EF4F] hover:bg-[#d8e442] text-black font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-md shadow-[#E3EF4F]/20"
                    >
                      Start for free
                    </button>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="py-2.5 px-4 bg-[#0055d4] hover:bg-[#0047b8] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
                    >
                      Start scaling
                    </button>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="py-2.5 px-4 bg-black hover:bg-neutral-900 text-white border border-neutral-700 font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Get a demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Accordion Detail Breakdown Sections */}
              <div className="border-t border-dashed border-white/20 bg-black divide-y divide-white/10">
                {DETAIL_ACCORDIONS.map((acc) => {
                  const isOpen = openAccordions[acc.title];
                  return (
                    <div key={acc.title} className="px-6 sm:px-12">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(acc.title)}
                        className="w-full py-5 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                      >
                        <span className="text-base sm:text-lg font-medium tracking-tight text-white group-hover:text-[#E3EF4F] transition-colors">
                          {acc.title}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 group-hover:text-white ${
                            isOpen ? 'rotate-180 text-[#E3EF4F]' : ''
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-6 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed animate-fade-in max-w-3xl">
                          {acc.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <div className="border-t border-dashed border-white/20 bg-black pt-16 sm:pt-20 pb-12 sm:pb-16 px-6 sm:px-12">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-[#E3EF4F]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3EF4F] shadow-[0_0_8px_#E3EF4F]" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#E3EF4F] font-bold">
                      FAQ
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white font-sans antialiased mb-10">
                  Frequently asked questions
                </h2>

                <div className="divide-y divide-white/10">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaqs[idx];
                    return (
                      <div key={idx}>
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full py-5 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                        >
                          <span className="text-sm sm:text-base font-normal text-neutral-300 group-hover:text-white transition-colors">
                            {faq.q}
                          </span>
                          <span className="shrink-0 ml-4">
                            {isOpen ? (
                              <Minus className="w-4 h-4 text-neutral-400 group-hover:text-[#E3EF4F] transition-colors" strokeWidth={1.5} />
                            ) : (
                              <Plus className="w-4 h-4 text-neutral-400 group-hover:text-[#E3EF4F] transition-colors" strokeWidth={1.5} />
                            )}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="pb-6 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed animate-fade-in max-w-3xl">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Get Started Section at the end of the page */}
        <StartBuildingSection
          onOpenContact={onOpenContact}
          onOpenJoin={onOpenJoin}
        />

        {/* Footer at the end of the page */}
        <Footer
          onOpenAbout={onOpenAbout}
          onOpenPricing={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenIntegrations={onOpenIntegrations}
          onOpenBYOK={onOpenBYOK}
          onOpenJoin={onOpenJoin}
          onOpenContact={onOpenContact}
          onNavigateHome={onNavigateHome}
        />
      </main>
    </div>
  );
};
