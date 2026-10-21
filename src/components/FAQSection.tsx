import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'What is Roow?',
    answer:
      'Roow is a vibecoding ecosystem that brings AI models, development tools, and integrations together in one workspace.',
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'Do I need my own API key to use Roow?',
    answer:
      'No. You can use Roow-provided AI models or connect your own API keys for supported providers.',
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'Is Roow AI usage unlimited?',
    answer:
      'No. Roow AI usage depends on your subscription plan. Each plan has its own usage limits.',
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'Can I use my own AI models and providers?',
    answer:
      'Yes. Roow supports BYOK for compatible providers and models, subject to provider availability and compatibility.',
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'What is MCP support?',
    answer:
      'MCP lets Roow connect to compatible external tools and services. Availability and connection limits depend on the supported integration and your plan.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full bg-black select-none">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden bg-black">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E3EF4F]/[0.035] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-8">
            {/* Header Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#111317] border border-white/15 backdrop-blur-md">
                <HelpCircle className="w-3.5 h-3.5 text-[#E3EF4F]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white font-semibold">
                  FAQ
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-white font-sans text-center mb-12 sm:mb-16 leading-[1.12]">
              Frequently asked questions
            </h2>

            {/* Accordion List */}
            <div className="border-t border-white/10 divide-y divide-white/10">
              {FAQS.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="group transition-colors duration-150">
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full py-5 sm:py-6 px-2 sm:px-3 flex items-center justify-between text-left focus:outline-none focus-visible:bg-white/[0.03] transition-colors hover:bg-white/[0.02] cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4 sm:gap-6 flex-1 pr-4">
                        <span className="font-mono text-sm sm:text-[15px] font-semibold text-[#E3EF4F] shrink-0 tracking-wider">
                          {faq.number}
                        </span>
                        <span className="text-[15px] sm:text-base md:text-[17.5px] text-white font-sans font-medium tracking-tight group-hover:text-[#E3EF4F] transition-colors duration-200">
                          {faq.question}
                        </span>
                      </div>
                      <div className="shrink-0 pl-2">
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-white transition-transform duration-300 ease-out ${
                            isOpen ? 'rotate-180 text-[#E3EF4F]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.24, delay: 0.04 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.16 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pl-9 sm:pl-12 pr-4 sm:pr-8 pb-6 pt-1">
                            <p className="text-[14px] sm:text-[15px] text-neutral-400 font-sans leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
