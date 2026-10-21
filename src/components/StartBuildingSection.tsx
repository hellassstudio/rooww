import React, { useState } from 'react';
import { useTextScramble } from '../hooks/useTextScramble.ts';
import { AsciiCanvas } from './AsciiCanvas.tsx';
import navbarLogo from './Navbarlogodark.png';

interface StartBuildingSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

export const StartBuildingSection: React.FC<StartBuildingSectionProps> = ({
  onOpenJoin,
  onOpenContact,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonText = useTextScramble('Get started', isHovered);

  return (
    <section id="start-building" className="relative w-full bg-black select-none">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28 pb-14 sm:pb-24">
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden bg-black min-h-[580px] sm:min-h-[660px] flex flex-col items-center justify-center py-16 sm:py-24 px-6 text-center">
          {/* Interactive ASCII background canvas */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
            <AsciiCanvas
              colors={['#102a71', '#1d4ed8', '#7c3aed', '#e3ef4f', '#ffffff']}
              shape="rise"
              characters=" =+xX0S8#@"
              cellSize={22}
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
              className="w-full h-full"
            />
          </div>

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto pointer-events-auto">
            <div className="mb-6 sm:mb-8 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <img
                  src={navbarLogo}
                  alt="Roow"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_24px_rgba(56,189,248,0.5)]"
                />
              </div>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-medium tracking-tight text-white font-sans text-center leading-[0.96] mb-8 sm:mb-10 antialiased drop-shadow-2xl">
              Start
              <br />
              Building
            </h2>

            <button
              type="button"
              onClick={onOpenJoin || onOpenContact}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center justify-center px-9 sm:px-14 py-3.5 sm:py-4 bg-white hover:bg-neutral-100 active:scale-[0.98] text-black font-mono text-sm sm:text-base font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-xl shadow-white/10 border border-white"
            >
              <span>{buttonText}</span>
              <span className="ml-2 font-mono text-base sm:text-lg">↵</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
