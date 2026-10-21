import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RuntimeSectionProps {
  onOpenJoin?: () => void;
  onOpenContact?: () => void;
}

interface StepData {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    id: 0,
    stepNumber: '01',
    title: 'Set up your workspace',
    description:
      'Create a project and configure your preferred models and tools.',
  },
  {
    id: 1,
    stepNumber: '02',
    title: 'Choose your AI',
    description:
      "Use Roow's built-in AI models with plan-based usage limits, or connect your own API keys for supported providers.",
  },
  {
    id: 2,
    stepNumber: '03',
    title: 'Connect your tools',
    description:
      'Configure supported MCP servers and integrations to fit your workflow.',
  },
  {
    id: 3,
    stepNumber: '04',
    title: 'Build your way',
    description:
      'Work on your projects in one connected environment, switching between supported models and tools when needed.',
  },
];

export const RuntimeSection: React.FC<RuntimeSectionProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Animation timeline ticker
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 40); // 25 fps logic tick for waveform and packet flow
    return () => clearInterval(interval);
  }, []);

  // Auto-advance through the 4 steps smoothly if not interacting
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section
      className="relative w-full bg-black select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Centered framed container matching Hero, Marquee, Problem, and Solution layouts */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
        {/* Outer framed dashed container seamlessly joined with -mt-px */}
        <div className="relative w-full border border-dashed border-white/25 -mt-px overflow-hidden bg-black">
          {/* Top Header matching reference image: Clean solid pitch-black */}
          <div className="relative pt-12 sm:pt-16 pb-10 sm:pb-14 px-6 sm:px-12 text-center flex flex-col items-center border-b border-dashed border-white/25 bg-black">
            {/* Header Content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Top Badge: Pill-less, sleek uppercase tag with glassmorphic backing */}
              <div className="mb-4 sm:mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white font-bold">
                    HOW ROOW WORKS
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium tracking-tight text-white font-sans antialiased leading-[1.12] mb-3 max-w-2xl">
                From setup to building, simply.
              </h2>

              {/* Narrative Subtitle */}
              <p className="text-[14.5px] sm:text-[15.5px] text-neutral-400 font-sans antialiased max-w-xl leading-relaxed font-normal">
                Work on your projects in one connected environment with your preferred models and tools.
              </p>
            </div>
          </div>

          {/* Main 2-Column Split: Step Selector Tabs (Left) vs Interactive Visual Diagram (Right) */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] bg-black">
            {/* Left Column (lg:col-span-5): Step Selection Tabs */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-dashed border-white/25 flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-black">
              <div className="divide-y divide-white/10 flex-1 flex flex-col justify-center">
                {STEPS.map((step) => {
                  const isActive = activeStep === step.id;
                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        setActiveStep(step.id);
                        setIsAutoPlaying(false);
                      }}
                      className="py-5 sm:py-6 first:pt-1 last:pb-1 cursor-pointer group transition-colors"
                    >
                      {/* Step Title with 01 — Prefix matching user request */}
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-mono text-sm sm:text-[15px] font-semibold tracking-wider transition-colors duration-200 mt-1 shrink-0 ${
                            isActive
                              ? 'text-[#38bdf8]'
                              : 'text-neutral-500 group-hover:text-neutral-400'
                          }`}
                        >
                          {step.stepNumber} —
                        </span>

                        <div className="flex-1">
                          <h3
                            className={`text-xl sm:text-2xl font-medium font-sans tracking-tight transition-colors duration-200 ${
                              isActive
                                ? 'text-white'
                                : 'text-neutral-500 group-hover:text-neutral-300'
                            }`}
                          >
                            {step.title}
                          </h3>

                          {/* Expandable Step Description */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-neutral-400 font-sans leading-relaxed max-w-md">
                                  {step.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (lg:col-span-7): The Interactive Animated Architectural Diagram */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 lg:p-14 flex items-center justify-center bg-black relative overflow-hidden">
              {/* Outer Diagram Box with 4 Corner Reticles */}
              <div className="relative w-full max-w-[620px] aspect-[4/3] min-h-[380px] sm:min-h-[420px] flex items-center justify-center bg-black/60 border border-neutral-900">
                {/* 4 Corner Reticle Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-500 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-500 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-500 pointer-events-none" />

                {/* SVG Visual Canvas */}
                <svg
                  viewBox="0 0 540 380"
                  className="w-full h-full text-white fill-none select-none overflow-visible"
                >
                  <defs>
                    {/* Cyan / Blue Glow */}
                    <filter id="diagramBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Amber Glow for Tools */}
                    <filter id="diagramAmberGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Emerald / Cyan Glow for Ship without Limits */}
                    <filter id="diagramEmeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Header Column Labels & Vertical Dividing Guides */}
                  {/* MODELS Column Header */}
                  <text
                    x="110"
                    y="42"
                    textAnchor="middle"
                    fontFamily="'JetBrains Mono', ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.18em"
                    fill={activeStep === 0 ? '#38bdf8' : '#6b7280'}
                  >
                    MODELS
                  </text>
                  <line
                    x1="180"
                    y1="30"
                    x2="180"
                    y2="340"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    strokeDasharray="1.5 3.5"
                    opacity="0.08"
                  />

                  {/* WORKFLOW Column Header */}
                  <text
                    x="270"
                    y="42"
                    textAnchor="middle"
                    fontFamily="'JetBrains Mono', ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.18em"
                    fill={activeStep === 1 || activeStep === 2 ? '#38bdf8' : '#6b7280'}
                  >
                    ROOW CORE
                  </text>
                  <line
                    x1="365"
                    y1="30"
                    x2="365"
                    y2="340"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    strokeDasharray="1.5 3.5"
                    opacity="0.08"
                  />

                  {/* SHIP Column Header */}
                  <text
                    x="440"
                    y="42"
                    textAnchor="middle"
                    fontFamily="'JetBrains Mono', ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.18em"
                    fill={activeStep === 3 ? '#10b981' : '#6b7280'}
                  >
                    SHIP / LIVE
                  </text>

                  {/* 2. Structured Circuit Wire Traces (Base tracks) */}
                  {/* Top Model Branch (API Key) into Main Bus */}
                  <path
                    d="M 124 105 L 152 105 L 152 188 L 242 188"
                    stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'}
                    strokeWidth="1.2"
                    strokeDasharray={activeStep === 0 ? 'none' : '2 3'}
                    opacity={activeStep === 0 ? '0.35' : '0.15'}
                  />
                  {/* Bottom Model Branch (Local/Ollama) into Main Bus */}
                  <path
                    d="M 124 271 L 152 271 L 152 188 L 242 188"
                    stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'}
                    strokeWidth="1.2"
                    strokeDasharray={activeStep === 0 ? 'none' : '2 3'}
                    opacity={activeStep === 0 ? '0.35' : '0.15'}
                  />
                  {/* Primary Center Bus: Terminal -> Roow Core */}
                  <line
                    x1="128"
                    y1="188"
                    x2="242"
                    y2="188"
                    stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                    strokeWidth="1.2"
                    opacity={activeStep === 0 || activeStep === 3 ? '0.35' : '0.15'}
                  />

                  {/* Wire from Roow Core -> Junction -> Context Orchestrator `< >` (Upwards) */}
                  <path
                    d="M 276 188 L 305 188 L 305 110 L 332 110"
                    stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                    strokeWidth="1.2"
                    opacity={activeStep === 2 || activeStep === 3 ? '0.35' : '0.15'}
                  />

                  {/* Wire from Roow Core -> Junction -> MCP Tools `{ }` (Downwards) */}
                  <path
                    d="M 276 188 L 305 188 L 305 271 L 332 271"
                    stroke={activeStep === 1 ? '#f59e0b' : '#ffffff'}
                    strokeWidth="1.2"
                    strokeDasharray={activeStep === 1 ? 'none' : '2 3'}
                    opacity={activeStep === 1 ? '0.35' : '0.15'}
                  />

                  {/* Wire from Orchestrator `< >` -> Production Ship/Database (Right) */}
                  <path
                    d="M 372 110 L 400 110 L 400 188 L 418 188"
                    stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                    strokeWidth="1.2"
                    opacity={activeStep === 2 || activeStep === 3 ? '0.35' : '0.15'}
                  />

                  {/* 3. Crisp, non-glowing animated circuit packet flow (Seamless periodic loop) */}
                  {activeStep === 0 && (
                    <g>
                      <path
                        d="M 128 188 L 242 188"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow"
                      />
                      <path
                        d="M 124 105 L 152 105 L 152 188 L 242 188"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow"
                      />
                      <path
                        d="M 124 271 L 152 271 L 152 188 L 242 188"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow"
                      />
                    </g>
                  )}

                  {activeStep === 1 && (
                    <path
                      d="M 276 188 L 305 188 L 305 271 L 332 271"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="8 16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-circuit-flow"
                    />
                  )}

                  {activeStep === 2 && (
                    <g>
                      <path
                        d="M 276 188 L 305 188 L 305 110 L 332 110"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow"
                      />
                      <path
                        d="M 372 110 L 400 110 L 400 188 L 418 188"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow"
                      />
                    </g>
                  )}

                  {activeStep === 3 && (
                    <g>
                      <path
                        d="M 128 188 L 242 188"
                        stroke="#10b981"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow-fast"
                      />
                      <path
                        d="M 276 188 L 305 188 L 305 110 L 332 110"
                        stroke="#10b981"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow-fast"
                      />
                      <path
                        d="M 372 110 L 400 110 L 400 188 L 418 188"
                        stroke="#10b981"
                        strokeWidth="1.8"
                        strokeDasharray="8 16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-circuit-flow-fast"
                      />
                    </g>
                  )}

                  {/* Clean junction connection dots */}
                  {activeStep === 0 && (
                    <circle cx="152" cy="188" r="2.2" fill="#38bdf8" />
                  )}
                  {activeStep === 1 && (
                    <circle cx="305" cy="271" r="2.2" fill="#f59e0b" />
                  )}
                  {(activeStep === 2 || activeStep === 3) && (
                    <>
                      <circle cx="305" cy="110" r="2.2" fill={activeStep === 3 ? '#10b981' : '#38bdf8'} />
                      <circle cx="400" cy="188" r="2.2" fill={activeStep === 3 ? '#10b981' : '#38bdf8'} />
                    </>
                  )}

                  {/* 5. MODELS Column Nodes (Left) */}
                  {/* Top Model: Gemini / Claude Custom API Key */}
                  <g opacity={activeStep === 0 ? '1' : '0.45'}>
                    <rect
                      x="92"
                      y="88"
                      width="34"
                      height="34"
                      stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'}
                      strokeWidth={activeStep === 0 ? '1.6' : '1.1'}
                      fill="#000000"
                    />
                    {/* API Key Icon representation */}
                    <circle cx="104" cy="105" r="4.5" stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'} strokeWidth="1.2" />
                    <line x1="108.5" y1="105" x2="119" y2="105" stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'} strokeWidth="1.2" />
                    <line x1="115" y1="105" x2="115" y2="109" stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'} strokeWidth="1.2" />
                  </g>

                  {/* Middle Model Node: Active Primary LLM */}
                  <g>
                    <rect
                      x="92"
                      y="171"
                      width="34"
                      height="34"
                      stroke="#38bdf8"
                      strokeWidth="1.8"
                      fill="#000000"
                    />
                    {/* Terminal prompt '>_' */}
                    <g stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round">
                      <polyline points="101,183 107,188 101,193" />
                      <line x1="110" y1="193" x2="117" y2="193" />
                    </g>
                  </g>

                  {/* Bottom Model Node: Local / Ollama endpoint [+] */}
                  <g opacity={activeStep === 0 ? '0.85' : '0.35'}>
                    <rect
                      x="92"
                      y="254"
                      width="34"
                      height="34"
                      stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'}
                      strokeWidth={activeStep === 0 ? '1.4' : '1.1'}
                      fill="#000000"
                    />
                    <line x1="109" y1="264" x2="109" y2="278" stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'} strokeWidth="1.2" />
                    <line x1="102" y1="271" x2="116" y2="271" stroke={activeStep === 0 ? '#38bdf8' : '#ffffff'} strokeWidth="1.2" />
                  </g>

                  {/* 6. WORKFLOW / ROOW CORE Nodes (Middle) */}
                  {/* Central Router / Orchestration Junction */}
                  <g>
                    <rect
                      x="242"
                      y="171"
                      width="34"
                      height="34"
                      stroke="#38bdf8"
                      strokeWidth="1.8"
                      fill="#000000"
                    />
                    {/* Roow Diamond / Core Symbol */}
                    <path
                      d="M 259 179 L 268 188 L 259 197 L 250 188 Z"
                      stroke="#38bdf8"
                      strokeWidth="1.4"
                      fill={activeStep === 2 ? '#38bdf8' : 'none'}
                      opacity={activeStep === 2 ? '0.4' : '1'}
                    />
                  </g>

                  {/* Upper Context Pipeline Box */}
                  <g>
                    <rect
                      x="332"
                      y="92"
                      width="38"
                      height="36"
                      stroke={activeStep === 2 ? '#38bdf8' : '#6b7280'}
                      strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
                      fill="#000000"
                    />
                    {/* Code Brackets '< >' */}
                    <g stroke={activeStep === 2 ? '#38bdf8' : '#9ca3af'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="345,105 341,110 345,115" />
                      <polyline points="357,105 361,110 357,115" />
                    </g>
                  </g>

                  {/* Lower Tool / MCP Server Box */}
                  <g opacity={activeStep === 1 ? '1' : '0.45'}>
                    <rect
                      x="332"
                      y="254"
                      width="34"
                      height="34"
                      stroke={activeStep === 1 ? '#f59e0b' : '#ffffff'}
                      strokeWidth={activeStep === 1 ? '1.8' : '1.1'}
                      fill="#000000"
                    />
                    {/* MCP Plug / Tool Braces '{ }' */}
                    <g stroke={activeStep === 1 ? '#f59e0b' : '#ffffff'} strokeWidth="1.3" strokeLinecap="round">
                      <path d="M 343 264 C 340 264 340 268 340 271 C 340 274 338 271 338 271" />
                      <path d="M 343 278 C 340 278 340 274 340 271" />
                      <path d="M 355 264 C 358 264 358 268 358 271" />
                      <path d="M 355 278 C 358 278 358 274 358 271" />
                    </g>
                  </g>

                  {/* 7. SHIP / OUTPUT Column: Production Workspace */}
                  <g>
                    {/* Multi-tier Production Container */}
                    <ellipse
                      cx="432"
                      cy="176"
                      rx="18"
                      ry="6.5"
                      stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                      strokeWidth={activeStep === 3 ? '2' : '1.8'}
                      fill="#000000"
                    />
                    <path
                      d="M 414 176 L 414 189 A 18 6.5 0 0 0 450 189 L 450 176"
                      stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                      strokeWidth={activeStep === 3 ? '2' : '1.8'}
                    />
                    <path
                      d="M 414 189 L 414 202 A 18 6.5 0 0 0 450 202 L 450 189"
                      stroke={activeStep === 3 ? '#10b981' : '#38bdf8'}
                      strokeWidth={activeStep === 3 ? '2' : '1.8'}
                    />
                  </g>

                  {/* Step 3: Unlimited Ship Indicator Check / Infinity Badge */}
                  {activeStep === 3 && (
                    <g transform="translate(458, 162)">
                      <circle cx="10" cy="10" r="10" stroke="#10b981" strokeWidth="1.6" fill="#000000" />
                      <polyline points="6,10 9,13 14,7" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )}

                  {/* 8. Bottom Terminal / Status Telemetry Card */}
                  {/* Step 0: Models Telemetry Card */}
                  {activeStep === 0 && (
                    <g>
                      <line x1="259" y1="205" x2="259" y2="280" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
                      <path d="M 215 280 L 395 280 L 408 293 L 408 325 L 215 325 Z" stroke="#38bdf8" strokeWidth="1.4" fill="#000000" />
                      <text x="226" y="298" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="600" fill="#38bdf8" letterSpacing="0.12em">
                        API KEYS CONNECTED: CUSTOM
                      </text>
                      <text x="226" y="313" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#9ca3af" letterSpacing="0.08em">
                        NO FORCED PROVIDER • ZERO LOCK-IN
                      </text>
                    </g>
                  )}

                  {/* Step 1: Tools Telemetry Card */}
                  {activeStep === 1 && (
                    <g>
                      <line x1="259" y1="205" x2="259" y2="280" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
                      <path d="M 215 280 L 395 280 L 408 293 L 408 325 L 215 325 Z" stroke="#f59e0b" strokeWidth="1.4" fill="#000000" />
                      <text x="226" y="298" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="600" fill="#f59e0b" letterSpacing="0.12em">
                        MCP SERVERS & TOOLS LINKED
                      </text>
                      <text x="226" y="313" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#9ca3af" letterSpacing="0.08em">
                        FILESYSTEM • APIS • WORKSPACE READY
                      </text>
                    </g>
                  )}

                  {/* Step 2: Build Workflow Telemetry Card */}
                  {activeStep === 2 && (
                    <g>
                      <line x1="259" y1="205" x2="259" y2="280" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
                      <path d="M 215 280 L 395 280 L 408 293 L 408 325 L 215 325 Z" stroke="#38bdf8" strokeWidth="1.4" fill="#000000" />
                      {/* Code lines */}
                      <line x1="228" y1="295" x2="255" y2="295" stroke="#6b7280" strokeWidth="2.2" />
                      <line x1="262" y1="295" x2="285" y2="295" stroke="#38bdf8" strokeWidth="2.2" />
                      <line x1="228" y1="307" x2="248" y2="307" stroke="#6b7280" strokeWidth="2.2" />
                      <line x1="255" y1="307" x2="278" y2="307" stroke="#38bdf8" strokeWidth="2.2" />

                      {/* Animated Waveform on right */}
                      <path
                        d={`M 295 301 L 305 301 L 309 ${296 - Math.sin(tick * 0.4) * 4} L 315 ${306 + Math.sin(tick * 0.4) * 5} L 321 ${295 - Math.sin(tick * 0.3) * 5} L 325 301 L 350 301`}
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <text x="312" y="342" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700" letterSpacing="0.2em" fill="#38bdf8">
                        COORDINATING CONTEXT
                      </text>
                    </g>
                  )}

                  {/* Step 3: Ship Without Limits Telemetry Card */}
                  {activeStep === 3 && (
                    <g>
                      <line x1="432" y1="208" x2="432" y2="280" stroke="#10b981" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                      <line x1="432" y1="280" x2="388" y2="280" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                      <path d="M 215 280 L 395 280 L 408 293 L 408 325 L 215 325 Z" stroke="#10b981" strokeWidth="1.6" fill="#000000" />
                      <text x="226" y="298" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" fill="#10b981" letterSpacing="0.12em">
                        UNRESTRICTED SHIPMENT
                      </text>
                      <text x="226" y="313" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#e5e7eb" letterSpacing="0.08em">
                        0 POPUPS • NO LIMITS • LIVE
                      </text>
                      <text x="312" y="342" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="0.22em" fill="#10b981">
                        UNRESTRICTED
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
