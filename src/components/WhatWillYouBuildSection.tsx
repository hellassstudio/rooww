import React, { useState } from 'react';
import { useTextScramble } from '../hooks/useTextScramble.ts';

interface WhatWillYouBuildSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

interface BuildCardItem {
  id: number;
  title: string;
  description: string;
  buttonLabel: string;
}

const CARDS: BuildCardItem[] = [
  {
    id: 0,
    title: 'Apps',
    description:
      'From AI-powered tools and SaaS platforms to complex dashboards and full-scale software, turn your ideas into functional products built around your vision.',
    buttonLabel: 'Build an app',
  },
  {
    id: 1,
    title: 'Websites',
    description:
      'From bold landing pages and personal portfolios to interactive web experiences and complete online platforms, bring any web idea to life with the freedom to build your way.',
    buttonLabel: 'Build a website',
  },
  {
    id: 2,
    title: 'Android Apps',
    description:
      'From everyday utilities and productivity tools to feature-rich mobile applications, transform your ideas into Android experiences with custom functionality, API integrations, and the tools you choose.',
    buttonLabel: 'Build an Android app',
  },
];

export const WhatWillYouBuildSection: React.FC<WhatWillYouBuildSectionProps> = ({
  onOpenJoin,
  onOpenContact,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const appsText = useTextScramble('Build an app', hoveredCard === 0);
  const websitesText = useTextScramble('Build a website', hoveredCard === 1);
  const androidAppsText = useTextScramble('Build an Android app', hoveredCard === 2);

  const getButtonText = (index: number) => {
    if (index === 0) return appsText;
    if (index === 1) return websitesText;
    return androidAppsText;
  };

  return (
    <section id="what-will-you-build" className="relative w-full bg-black select-none">
      {/* Centered framed container matching Hero, Problem, Solution, Runtime, and FAQ layouts */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        {/* Outer framed dashed container seamlessly joined with -mt-px */}
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden bg-black">
          
          {/* Top Header: Left aligned, top badge removed */}
          <div className="relative pt-12 sm:pt-16 pb-10 sm:pb-14 px-8 sm:px-10 lg:px-12 text-left flex flex-col items-start border-b border-dashed border-white/25 bg-black">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-medium tracking-tight text-white font-sans antialiased leading-[1.12] mb-3 max-w-3xl">
              What Will You Build?
            </h2>

            {/* Narrative Subtitle */}
            <p className="text-[15px] sm:text-[16.5px] text-white font-semibold font-sans antialiased max-w-2xl leading-relaxed">
              Anything you imagine, Roow can make it real.
            </p>
          </div>

          {/* 3-Column Grid: Cards turn to yellow gradient on hover, except middle card which turns to blue gradient */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-white/25 bg-black">
            {CARDS.map((card, index) => {
              const isHovered = hoveredCard === index;
              const isMiddle = index === 1;
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] bg-black cursor-pointer overflow-hidden"
                  onClick={onOpenJoin || onOpenContact}
                >
                  {/* Gradient background layer on hover (blue for middle, yellow for others) */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isMiddle
                        ? 'bg-gradient-to-br from-[#2f78ff] via-[#0055d4] to-[#00287a]'
                        : 'bg-gradient-to-br from-[#f8fda0] via-[#e3ef4f] to-[#b3c70e]'
                    } ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  />

                  {/* Top Content: Title */}
                  <div className="relative z-10">
                    <h3
                      className={`text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight font-mono leading-[1.08] transition-colors duration-300 ${
                        isHovered
                          ? isMiddle
                            ? 'text-white'
                            : 'text-black'
                          : 'text-white'
                      }`}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Bottom Content: Clean Description & Action Button */}
                  <div className="relative z-10 mt-8 space-y-7">
                    <p
                      className={`text-[14.5px] sm:text-[15.5px] font-sans leading-relaxed transition-colors duration-300 ${
                        isHovered
                          ? isMiddle
                            ? 'text-blue-100/95'
                            : 'text-black/85'
                          : 'text-neutral-400'
                      }`}
                    >
                      {card.description}
                    </p>

                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenJoin) onOpenJoin();
                          else if (onOpenContact) onOpenContact();
                        }}
                        className={`inline-flex items-center justify-center px-6 py-3 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-md ${
                          isHovered
                            ? isMiddle
                              ? 'bg-white hover:bg-neutral-100 text-black border border-white'
                              : 'bg-black hover:bg-neutral-900 text-white border border-black'
                            : 'bg-[#181920] hover:bg-neutral-800 text-white border border-neutral-700/80'
                        }`}
                      >
                        <span>{getButtonText(index)}</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtle bottom stripe matching the color scheme */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-1.5 transition-colors duration-300 z-10 ${
                      isHovered
                        ? isMiddle
                          ? 'bg-white/80'
                          : 'bg-black'
                        : isMiddle
                          ? 'bg-[#0055d4]/80'
                          : 'bg-[#e3ef4f]/70'
                    }`}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
