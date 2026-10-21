import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTextScramble } from '../hooks/useTextScramble.ts';
import navbarLogo from './Navbarlogodark.png';

interface NavbarProps {
  onOpenAbout: () => void;
  onOpenPricing: () => void;
  onOpenIntegrations?: () => void;
  onOpenBYOK?: () => void;
  onOpenJoin: () => void;
  onNavigateHome?: () => void;
  isPricingActive?: boolean;
  isIntegrationsActive?: boolean;
  isBYOKActive?: boolean;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAbout,
  onOpenPricing,
  onOpenIntegrations,
  onOpenBYOK,
  onOpenJoin,
  onNavigateHome,
  isPricingActive,
  isIntegrationsActive,
  isBYOKActive,
}) => {
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isPricingHovered, setIsPricingHovered] = useState(false);
  const [isBYOKHovered, setIsBYOKHovered] = useState(false);
  const [isJoinHovered, setIsJoinHovered] = useState(false);

  const moreText = useTextScramble('MORE', isMoreHovered);
  const pricingText = useTextScramble('PRICING', isPricingHovered);
  const byokText = useTextScramble('BYOK', isBYOKHovered);
  const loginText = useTextScramble('LOG IN', isJoinHovered);

  return (
    <header className="sticky top-0 w-full bg-black/90 backdrop-blur-md z-40 select-none border-b border-white/10 transition-colors">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28 h-16 flex items-center justify-between">
        {/* Brand Lockup with Intro Animation */}
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeCurve }}
          href="/"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="flex items-center gap-1 sm:gap-1.5 text-white group cursor-pointer focus:outline-none"
        >
          {/* Roow Logo Image */}
          <div className="flex items-center justify-center h-10 sm:h-11 w-auto">
            <img
              src={navbarLogo}
              alt="Roow"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
            />
          </div>
          <span className="text-[21px] sm:text-[23px] font-medium tracking-[-0.015em] text-white font-sans antialiased">
            Roow
          </span>
        </motion.a>

        {/* Right Navigation Actions with Staggered Intro Animation & Scramble Hover */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* MORE Button */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: easeCurve }}
            onMouseEnter={() => setIsMoreHovered(true)}
            onMouseLeave={() => setIsMoreHovered(false)}
            onClick={onOpenAbout}
            type="button"
            className={`px-3.5 py-1.5 text-[12px] font-mono font-medium tracking-[0.06em] transition-all duration-200 ease-out cursor-pointer shadow-sm active:scale-[0.98] ${
              isMoreHovered
                ? 'bg-[#090a0f] border border-neutral-700 text-white shadow-md'
                : 'bg-[#26272c] border border-transparent text-white'
            }`}
          >
            {moreText}
          </motion.button>

          {/* BYOK Button */}
          {onOpenBYOK && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.17, ease: easeCurve }}
              onMouseEnter={() => setIsBYOKHovered(true)}
              onMouseLeave={() => setIsBYOKHovered(false)}
              onClick={onOpenBYOK}
              type="button"
              className={`px-3 py-1.5 text-[12px] font-mono font-semibold tracking-[0.06em] transition-all duration-200 ease-out cursor-pointer shadow-sm active:scale-[0.98] ${
                isBYOKActive
                  ? 'bg-[#38bdf8] border border-[#38bdf8] text-black shadow-md shadow-[#38bdf8]/25'
                  : isBYOKHovered
                  ? 'bg-[#090a0f] border border-[#38bdf8] text-[#38bdf8] shadow-md'
                  : 'bg-[#151720] border border-neutral-700/80 text-neutral-200 hover:border-[#38bdf8]'
              }`}
            >
              {byokText}
            </motion.button>
          )}

          {/* PRICING Button with #E3EF4F Lime Yellow body & contrast inversion */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.20, ease: easeCurve }}
            onMouseEnter={() => setIsPricingHovered(true)}
            onMouseLeave={() => setIsPricingHovered(false)}
            onClick={onOpenPricing}
            type="button"
            className={`px-3.5 py-1.5 text-[12px] font-mono font-semibold tracking-[0.06em] transition-all duration-200 ease-out cursor-pointer shadow-sm active:scale-[0.98] ${
              isPricingActive
                ? 'bg-[#E3EF4F] border border-[#E3EF4F] text-black shadow-md shadow-[#E3EF4F]/25 hover:bg-[#d8e442]'
                : isPricingHovered
                ? 'bg-[#090a0f] border border-[#E3EF4F] text-[#E3EF4F] shadow-md'
                : 'bg-[#E3EF4F] border border-transparent text-black'
            }`}
          >
            {pricingText}
          </motion.button>

          {/* JOIN US Button with Vertical Dashed Divider, Arrow & Contrast Inversion */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: easeCurve }}
            onMouseEnter={() => setIsJoinHovered(true)}
            onMouseLeave={() => setIsJoinHovered(false)}
            onClick={onOpenJoin}
            type="button"
            className={`flex items-stretch transition-all duration-200 ease-out group cursor-pointer shadow-sm active:scale-[0.98] ${
              isJoinHovered
                ? 'bg-[#080d1a] border border-[#0a54d6] text-white shadow-md'
                : 'bg-[#0a54d6] border border-transparent text-white'
            }`}
          >
            <span className="px-3.5 py-1.5 text-[12px] font-mono font-medium tracking-[0.06em] uppercase flex items-center min-w-[58px] justify-center">
              {loginText}
            </span>
            <span className="w-0 border-r border-dashed border-white/60 self-stretch my-0.5" />
            <span className="px-2.5 py-1.5 flex items-center justify-center">
              <ArrowRight
                className={`w-3.5 h-3.5 text-white transition-transform ${
                  isJoinHovered ? 'translate-x-1' : ''
                }`}
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Dashed horizontal border separating navbar and hero section with reveal animation */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.15, ease: easeCurve }}
        style={{ transformOrigin: 'left' }}
        className="w-full border-b border-dashed border-white/25"
      />
    </header>
  );
};
