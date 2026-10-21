import React from 'react';
import navbarLogo from './Navbarlogodark.png';
import footerLogo from './footerlogo.png';
import { Youtube, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onOpenAbout?: () => void;
  onOpenPricing?: () => void;
  onOpenIntegrations?: () => void;
  onOpenBYOK?: () => void;
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenPricing,
  onOpenIntegrations,
  onOpenBYOK,
  onOpenJoin,
  onOpenContact,
  onNavigateHome,
}) => {
  return (
    <footer className="relative w-full bg-black select-none overflow-hidden">
      {/* Framed container matching Hero, Problem, Solution, Runtime, and StartBuilding */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28 pb-12 sm:pb-16">
        {/* Outer framed dashed container seamlessly joined */}
        <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-16 sm:pt-20 px-8 sm:px-14 md:px-16 flex flex-col justify-between">
          
          {/* Top Section: Brand on Left, 3 Navigation Columns on Right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-8 pb-16">
            
            {/* Left: Brand Lockup */}
            <div className="flex flex-col items-start space-y-3">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="flex items-center gap-2 text-white group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center justify-center h-8 sm:h-9 w-auto">
                  <img
                    src={navbarLogo}
                    alt="Roow"
                    className="h-8 sm:h-9 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <span className="text-2xl sm:text-[26px] font-semibold tracking-[-0.02em] text-white font-sans antialiased">
                  Roow
                </span>
              </a>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xs">
                An open ecosystem for unrestricted vibecoding. Build anything. Your way.
              </p>
            </div>

            {/* Right: 3 Columns (Products, Resources, Company) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              
              {/* Column 1: Products */}
              <div className="flex flex-col space-y-3">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                  Products
                </h4>
                <ul className="flex flex-col space-y-2.5 text-sm text-neutral-300 font-sans">
                  <li>
                    <button
                      type="button"
                      onClick={onOpenPricing}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenIntegrations || onOpenJoin}
                      className="hover:text-[#E3EF4F] transition-colors cursor-pointer text-left font-medium"
                    >
                      Integrations
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenBYOK || onOpenJoin}
                      className="inline-flex items-center hover:text-[#38bdf8] transition-colors cursor-pointer text-left group"
                    >
                      <span>BYOK Models</span>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono uppercase bg-[#0a54d6]/20 border border-[#0a54d6]/40 text-[#38bdf8] rounded-xs">
                        Free
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="inline-flex items-center hover:text-white transition-colors cursor-pointer text-left group"
                    >
                      <span>Finance+</span>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-700/70 text-[#e3ef4f] rounded-xs">
                        New
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="inline-flex items-center hover:text-white transition-colors cursor-pointer text-left group"
                    >
                      <span>MCP</span>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-700/70 text-[#e3ef4f] rounded-xs">
                        New
                      </span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="#start-building"
                      className="hover:text-white transition-colors text-left"
                    >
                      Runtime
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenPricing}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      BYOK Models
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Resources */}
              <div className="flex flex-col space-y-3">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                  Resources
                </h4>
                <ul className="flex flex-col space-y-2.5 text-sm text-neutral-300 font-sans">
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Blog
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Changelog
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Explore
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Colors
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Glossary
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Merch
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                  Company
                </h4>
                <ul className="flex flex-col space-y-2.5 text-sm text-neutral-300 font-sans">
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Contact us
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenAbout}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Help center
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Middle Row: Copyright on Left, Legal Links & Socials on Right (seamless, no divider line) */}
          <div className="pt-8 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 text-xs font-sans text-neutral-400 z-10">
            {/* Copyright */}
            <div className="font-mono text-neutral-500">
              © Roow 2024–2026.
            </div>

            {/* Right Group: Privacy, Terms, Copyright + Divider + Social Icons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms
                </button>
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Copyright
                </button>
              </div>

              {/* Vertical divider */}
              <div className="h-3 w-px bg-neutral-800 hidden sm:block" />

              {/* Social Icons matching reference: YouTube, X, LinkedIn, GitHub */}
              <div className="flex items-center gap-4 text-neutral-400">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="hover:text-white transition-colors"
                >
                  {/* Modern X vector logo */}
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Watermark: Giant footer logo, half shown and half cut off at the bottom border just like reference */}
          <div className="relative w-auto -mx-8 sm:-mx-14 md:-mx-16 mt-6 sm:mt-10 overflow-hidden select-none pointer-events-none">
            <div className="w-full h-[9.6vw] min-h-[48px] max-h-[180px] overflow-hidden flex items-start justify-center">
              <img
                src={footerLogo}
                alt="Roow"
                className="w-full h-auto object-cover object-top opacity-[0.14] select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
