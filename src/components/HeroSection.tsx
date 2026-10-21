import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTextScramble } from '../hooks/useTextScramble.ts';
import { AsciiCanvas } from './AsciiCanvas.tsx';

interface HeroSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenJoin,
  onOpenContact,
}) => {
  const [isGetStartedHovered, setIsGetStartedHovered] = useState(false);
  const [isFeaturesHovered, setIsFeaturesHovered] = useState(false);

  const getStartedText = useTextScramble('GET STARTED', isGetStartedHovered);
  const seeFeaturesText = useTextScramble('SEE FEATURES', isFeaturesHovered);

  const scrollToFeatures = () => {
    const el = document.getElementById('what-will-you-build') || document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <section className="relative w-full bg-black">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: 'easeOut' }}
          className="relative w-full h-[calc(100vh-65px)] min-h-[580px] max-h-[1100px] border border-dashed border-white/35 overflow-hidden bg-black"
        >
          {/* Background Interactive ASCII Canvas */}
          <div className="absolute inset-0 w-full h-full">
            <AsciiCanvas
              colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#e3ef4f']}
              shape="horizon"
              characters="  .:xX0S8#@"
              cellSize={18}
              density={0.8}
              glyphOpacity={0.85}
              glow={0.2}
              depthOfField={0}
              flicker={0.2}
              softness={0.5}
              scale={1}
              flow={0.5}
              speed={1}
              gradientOpacity={0.9}
              grain={0.08}
              variation={0}
              mouseInteraction={true}
              scrambleRadius={0.1}
              clickEffect="wave"
              intro={true}
              lightMode={false}
            />
          </div>

          {/* Bottom Left Hero Content */}
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none pl-6 sm:pl-10 md:pl-12 lg:pl-16 xl:pl-20 pr-6 pb-7 sm:pb-9 md:pb-11 lg:pb-13">
            <div className="max-w-5xl pointer-events-auto">
              {/* NO LIMITS Badge */}
              <div className="overflow-hidden pb-1.5 -mb-1.5 mb-2.5 sm:mb-3.5">
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.38, ease: easeCurve }}
                  className="inline-flex items-center justify-center bg-black px-2.5 sm:px-3 py-1 select-none border border-neutral-900/50"
                >
                  <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.08em] uppercase text-white leading-none">
                    NO LIMITS
                  </span>
                </motion.div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-0.5">
                <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[58px] font-medium tracking-[-0.03em] leading-[1.15] text-white font-sans antialiased">
                  <span className="inline-block overflow-hidden align-top mr-[0.25em] pb-2.5 -mb-2.5">
                    <motion.span
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.45, ease: easeCurve }}
                      className="inline-block"
                    >
                      Build
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden align-top mr-[0.25em] pb-2.5 -mb-2.5">
                    <motion.span
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.53, ease: easeCurve }}
                      className="inline-block"
                    >
                      anything.
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden align-top mr-[0.25em] pb-2.5 -mb-2.5">
                    <motion.span
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.61, ease: easeCurve }}
                      className="inline-block"
                    >
                      Your
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden align-top pb-2.5 -mb-2.5">
                    <motion.span
                      initial={{ y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.69, ease: easeCurve }}
                      className="inline-block"
                    >
                      way.
                    </motion.span>
                  </span>
                </h1>

                <div className="overflow-hidden pb-2 -mb-2">
                  <motion.p
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.76, ease: easeCurve }}
                    className="text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] font-normal tracking-[-0.02em] leading-[1.18] text-[#9bbde6] font-sans antialiased"
                  >
                    Roow builds an open ecosystem for
                  </motion.p>
                </div>
                <div className="overflow-hidden pb-2 -mb-2">
                  <motion.p
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.88, ease: easeCurve }}
                    className="text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] font-normal tracking-[-0.02em] leading-[1.18] text-[#9bbde6] font-sans antialiased"
                  >
                    unrestricted vibecoding.
                  </motion.p>
                </div>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 1.02, ease: easeCurve }}
                className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5"
              >
                {/* GET STARTED Cutout Button */}
                <button
                  onClick={onOpenJoin}
                  onMouseEnter={() => setIsGetStartedHovered(true)}
                  onMouseLeave={() => setIsGetStartedHovered(false)}
                  type="button"
                  aria-label="Get Started"
                  className="relative inline-flex items-stretch cursor-pointer shadow-md active:scale-[0.98] transition-transform duration-200 group overflow-hidden w-[220px] h-[46px]"
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ease-out ${
                      isGetStartedHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <svg width="220" height="46" viewBox="0 0 220 46" className="h-[46px] w-auto block select-none">
                      <defs>
                        <mask id="get-started-cutout-mask">
                          <rect width="220" height="46" fill="white" />
                          <text
                            x="80"
                            y="24"
                            fill="black"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="'JetBrains Mono', ui-monospace, monospace"
                            fontSize="14"
                            fontWeight="600"
                            letterSpacing="0.06em"
                          >
                            GET STARTED
                          </text>
                          <line x1="160" y1="4" x2="160" y2="42" stroke="black" strokeWidth="1.3" strokeDasharray="2.5 2.5" />
                          <g transform="translate(190, 23)" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                            <line x1="-7" y1="0" x2="6" y2="0" />
                            <polyline points="1.5,-4.5 6,0 1.5,4.5" />
                          </g>
                        </mask>
                      </defs>
                      <rect width="220" height="46" fill="white" mask="url(#get-started-cutout-mask)" />
                    </svg>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ease-out select-none ${
                      isGetStartedHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <svg width="220" height="46" viewBox="0 0 220 46" className="h-[46px] w-auto block select-none">
                      <rect x="0.5" y="0.5" width="219" height="45" fill="#000000" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
                      <text
                        x="80"
                        y="24"
                        fill="#ffffff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="'JetBrains Mono', ui-monospace, monospace"
                        fontSize="14"
                        fontWeight="600"
                        letterSpacing="0.06em"
                      >
                        {getStartedText}
                      </text>
                      <line x1="160" y1="4" x2="160" y2="42" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.3" strokeDasharray="2.5 2.5" />
                      <g transform="translate(190, 23)" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                        <line x1="-7" y1="0" x2="6" y2="0" />
                        <polyline points="1.5,-4.5 6,0 1.5,4.5" />
                      </g>
                    </svg>
                  </div>
                </button>

                {/* SEE FEATURES Button */}
                <button
                  onClick={scrollToFeatures}
                  onMouseEnter={() => setIsFeaturesHovered(true)}
                  onMouseLeave={() => setIsFeaturesHovered(false)}
                  type="button"
                  aria-label="See Features"
                  className={`flex items-stretch backdrop-blur-sm border border-dashed transition-all duration-200 ease-out group cursor-pointer active:scale-[0.98] h-[46px] ${
                    isFeaturesHovered
                      ? 'bg-black border-white/70 text-white shadow-lg'
                      : 'bg-[#0b2760]/60 border-white/45 text-[#e2edff]'
                  }`}
                >
                  <span className="px-6 sm:px-7 py-2.5 sm:py-3 text-[14px] font-mono font-medium tracking-[0.08em] uppercase flex items-center justify-center min-w-[145px] transition-colors duration-200">
                    {seeFeaturesText}
                  </span>
                  <span className="w-0 border-r border-dashed border-white/40 self-stretch my-1" />
                  <span className="px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-center">
                    <ArrowRight
                      className={`w-[18px] h-[18px] text-inherit transition-transform duration-200 ease-out ${
                        isFeaturesHovered ? 'translate-x-1' : ''
                      }`}
                    />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
