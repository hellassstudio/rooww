import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  X,
  Key,
  Shield,
  Zap,
  Server,
  Cpu,
  Terminal,
} from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { StartBuildingSection } from './StartBuildingSection.tsx';
import { Footer } from './Footer.tsx';

interface BYOKPageProps {
  onNavigateHome: () => void;
  onOpenPricing: () => void;
  onOpenIntegrations: () => void;
  onOpenBYOK?: () => void;
  onOpenJoin: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
}

interface BYOKItem {
  id: string;
  name: string;
  category: 'cloud' | 'local';
  description: string;
  renderLogo: () => React.ReactNode;
  models: string[];
  tags?: string[];
  latency?: string;
  badge?: string;
}

/* =========================================================================
   Crisp Brand & Provider SVG Logos (Clean Vectors, Zero Emojis)
   ========================================================================= */

const OpenAILogo = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829 14.6174 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

const AnthropicLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#d97757]/15 border border-[#d97757]/30 flex items-center justify-center">
    <span className="font-mono text-sm font-bold text-[#d97757] tracking-wider">
      A\
    </span>
  </div>
);

const GeminiLogo = () => (
  <svg className="w-8 h-8 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" />
  </svg>
);

const DeepSeekLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#0066FF]/15 border border-[#0066FF]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-tight">
      DS
    </span>
  </div>
);

const GrokLogo = () => (
  <svg className="w-7 h-7 text-white" viewBox="0 0 512 492" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M197.76 315.52l170.197-125.803c8.342-6.186 20.267-3.776 24.256 5.803 20.907 50.539 11.563 111.253-30.08 152.939-41.621 41.685-99.562 50.816-152.512 29.994l-57.834 26.816c82.965 56.768 183.701 42.731 246.656-20.33 49.941-50.006 65.408-118.166 50.944-179.627l.128.149c-20.971-90.282 5.162-126.378 58.666-200.17 1.28-1.75 2.56-3.499 3.819-5.291l-70.421 70.507v-.214l-243.883 245.27m-35.072 30.528c-59.563-56.96-49.28-145.088 1.515-195.926 37.568-37.61 99.136-52.97 152.874-30.4l57.707-26.666a166.554 166.554 0 00-39.019-21.334 191.467 191.467 0 00-208.042 41.942c-54.038 54.101-71.04 137.301-41.856 208.298 21.802 53.056-13.931 90.582-49.92 128.47C23.104 463.915 10.304 477.333 0 491.541l162.56-145.386"
    />
  </svg>
);

const MistralLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#fd531e]/15 border border-[#fd531e]/35 flex items-center justify-center">
    <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
      <div className="bg-[#fd531e]" />
      <div className="bg-[#fd531e]" />
      <div className="bg-[#fd531e]" />
      <div className="bg-[#fd531e]" />
      <div className="bg-transparent" />
      <div className="bg-[#fd531e]" />
      <div className="bg-[#fd531e]" />
      <div className="bg-transparent" />
      <div className="bg-[#fd531e]" />
    </div>
  </div>
);

const PerplexityLogo = () => (
  <svg className="w-8 h-8 text-[#22b8cf]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
  </svg>
);

const MetaLogo = () => (
  <svg className="w-8 h-8 text-[#0081fb]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.348c-3.13 0-5.836 2.378-7.79 5.352-1.933 2.943-2.67 5.758-1.782 7.643.791 1.68 2.502 2.657 4.544 2.657 2.106 0 4.14-.99 5.028-2.585.888 1.595 2.922 2.585 5.028 2.585 2.042 0 3.753-.977 4.544-2.657.888-1.885.15-4.7-1.782-7.643-1.954-2.974-4.66-5.352-7.79-5.352zm0 2.21c2.518 0 4.793 1.988 6.452 4.515 1.625 2.474 2.155 4.757 1.62 5.892-.47.997-1.468 1.535-2.822 1.535-1.577 0-3.137-.775-3.87-2.18-.73-1.402-.85-3.21-.85-4.877 0-.54-.01-1.077-.042-1.603-.16-.92-.284-1.282-.488-1.282s-.328.362-.488 1.282c-.032.526-.042 1.063-.042 1.603 0 1.667-.12 3.475-.85 4.877-.733 1.405-2.293 2.18-3.87 2.18-1.354 0-2.352-.538-2.822-1.535-.535-1.135-.005-3.418 1.62-5.892 1.66-2.527 3.934-4.515 6.452-4.515z" />
  </svg>
);

const CohereLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#39594d]/25 border border-[#39594d]/45 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#4cd997] tracking-wider">
      CO:
    </span>
  </div>
);

const GroqLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#f55036]/15 border border-[#f55036]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#f55036] tracking-tighter">
      GROQ
    </span>
  </div>
);

const TogetherLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#0f6fff]/15 border border-[#0f6fff]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#60a5fa] tracking-tight">
      2GTHR
    </span>
  </div>
);

const FireworksLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#ff2674]/15 border border-[#ff2674]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#ff2674] tracking-tight">
      FW:
    </span>
  </div>
);

const OllamaLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white/10 border border-white/20 flex items-center justify-center">
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <path d="M9 15h6" />
    </svg>
  </div>
);

const OpenRouterLogo = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.654 3.87a5.087 5.087 0 110 10.174L23.7 19.09c.64.641.187 1.737-.72 1.737H8.48a8.479 8.479 0 010-16.958h10.175zM8.479 7.26a5.087 5.087 0 100 10.176 5.087 5.087 0 000-10.175z" />
  </svg>
);

const LMStudioLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#a855f7]/15 border border-[#a855f7]/35 flex items-center justify-center">
    <Terminal className="w-4 h-4 text-[#c084fc]" />
  </div>
);

const VLLMLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#10b981]/15 border border-[#10b981]/35 flex items-center justify-center">
    <Cpu className="w-4 h-4 text-[#34d399]" />
  </div>
);

const CerebrasLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#e3ef4f]/15 border border-[#e3ef4f]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#e3ef4f] tracking-tighter">
      CS
    </span>
  </div>
);

const LocalAILogo = () => (
  <div className="w-8 h-8 rounded-md bg-white/5 border border-white/15 flex items-center justify-center">
    <Server className="w-4 h-4 text-neutral-300" />
  </div>
);

const CloudflareLogo = () => (
  <svg className="w-8 h-8 text-[#f38020]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.3 10.5c-.3-2.6-2.5-4.5-5.1-4.5-2.2 0-4.1 1.4-4.8 3.4-.6-.3-1.3-.4-2-.4-2.2 0-4 1.8-4 4 0 .3 0 .7.1 1C1.1 14.5 0 15.9 0 17.5 0 19.4 1.6 21 3.5 21h14.8c2.6 0 4.7-2.1 4.7-4.7 0-2.3-1.6-4.2-3.7-4.6l-1-.2z" />
  </svg>
);

const HuggingFaceLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#ffcc00]/15 border border-[#ffcc00]/35 flex items-center justify-center">
    <span className="font-mono text-xs font-bold text-[#ffd43b] tracking-tight">
      HF
    </span>
  </div>
);

/* =========================================================================
   BYOK Supported Models & Providers Catalog
   ========================================================================= */

const BYOK_ITEMS: BYOKItem[] = [
  // Cloud & Frontier Providers
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'cloud',
    description:
      'Direct API keys for GPT-4o, o3-mini, and GPT-4.5. Fast multimodal processing, function calling, and structured outputs.',
    renderLogo: () => <OpenAILogo />,
    models: ['GPT-4o', 'o3-mini', 'GPT-4o mini', 'o1'],
    tags: ['Reasoning', 'Vision', 'JSON Mode', 'Function Calling'],
    latency: '~320ms TTFT',
    badge: 'Frontier',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'cloud',
    description:
      'Connect your Anthropic key for Claude 3.7 Sonnet hybrid reasoning and 200k context windows with deep codebase comprehension.',
    renderLogo: () => <AnthropicLogo />,
    models: ['Claude 3.7 Sonnet', 'Claude 3.5 Haiku', 'Claude 3 Opus'],
    tags: ['Hybrid Thinking', 'Coding', '200k Context', 'Vision'],
    latency: '~410ms TTFT',
    badge: 'Popular',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'cloud',
    description:
      'Deploy Gemini 2.5 Pro and 2.5 Flash with massive 1M+ token context windows, audio/video ingestion, and Google Search grounding.',
    renderLogo: () => <GeminiLogo />,
    models: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemini 2.0 Flash-Lite'],
    tags: ['1M Context', 'Multimodal', 'Search Grounding', 'Fast'],
    latency: '~210ms TTFT',
    badge: 'Ultra Fast',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'cloud',
    description:
      'Direct DeepSeek API connection. Unmatched cost efficiency and frontier-grade reasoning performance with DeepSeek-R1 and V3.',
    renderLogo: () => <DeepSeekLogo />,
    models: ['DeepSeek-R1', 'DeepSeek-V3'],
    tags: ['Open Weights', 'Math & Code', 'Deep Reasoning', 'Low Cost'],
    latency: '~480ms TTFT',
    badge: 'Trending',
  },
  {
    id: 'grok',
    name: 'xAI Grok',
    category: 'cloud',
    description:
      'High-velocity intelligence trained with broad perspective, real-time context awareness, and fast vision processing.',
    renderLogo: () => <GrokLogo />,
    models: ['Grok-2', 'Grok-2 Vision', 'Grok-mini'],
    tags: ['Real-time', 'Vision', 'High Concurrency'],
    latency: '~350ms TTFT',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    category: 'cloud',
    description:
      'European frontier models optimized for coding, precision instruction following, and fast lightweight inference.',
    renderLogo: () => <MistralLogo />,
    models: ['Mistral Large 2', 'Codestral 25.01', 'Pixtral 12B'],
    tags: ['Code Generation', 'Multilingual', 'Enterprise'],
    latency: '~290ms TTFT',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'cloud',
    description:
      'Search-grounded synthesis models designed to fetch live web data, verify references, and answer technical questions.',
    renderLogo: () => <PerplexityLogo />,
    models: ['Sonar Reasoning Pro', 'Sonar Pro', 'Sonar'],
    tags: ['Web Grounding', 'Citations', 'Live Data'],
    latency: '~520ms TTFT',
  },
  {
    id: 'meta-llama',
    name: 'Meta Llama (Hosted)',
    category: 'cloud',
    description:
      'Access Meta’s flagship Llama 3.3 70B and 405B foundational architectures via high-speed serverless endpoints without infrastructure overhead.',
    renderLogo: () => <MetaLogo />,
    models: ['Llama 3.3 70B', 'Llama 3.1 405B', 'Llama 3.1 8B'],
    tags: ['Foundational', 'Open Standard', 'High Throughput'],
    latency: '~240ms TTFT',
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'cloud',
    description:
      'Enterprise models fine-tuned for high-precision retrieval augmented generation (RAG), citation grounding, and tool execution.',
    renderLogo: () => <CohereLogo />,
    models: ['Command R+', 'Command R', 'Embed 3'],
    tags: ['RAG', 'Tool Use', 'Citations'],
    latency: '~380ms TTFT',
  },
  {
    id: 'groq',
    name: 'Groq LPU',
    category: 'cloud',
    description:
      'Ultra-fast inference powered by Groq LPUs delivering 500+ tokens per second for near-instant interactive code and UI generation.',
    renderLogo: () => <GroqLogo />,
    models: ['Llama 3.3 70B Versatile', 'DeepSeek R1 Distill', 'Gemma 2 9B'],
    tags: ['500+ T/s', 'Real-time UI', 'Instantaneous'],
    latency: '~90ms TTFT',
    badge: 'Fastest',
  },
  {
    id: 'together',
    name: 'Together AI',
    category: 'cloud',
    description:
      'Serverless high-throughput platform providing access to 100+ open-source models with dedicated endpoints and custom LoRAs.',
    renderLogo: () => <TogetherLogo />,
    models: ['DeepSeek R1', 'Llama 3.3 70B', 'Qwen 2.5 Coder 32B'],
    tags: ['Open Source', 'High Concurrency', 'Custom LoRA'],
    latency: '~180ms TTFT',
  },
  {
    id: 'fireworks',
    name: 'Fireworks AI',
    category: 'cloud',
    description:
      'Production inference engine specialized in low-latency function calling, compound AI workflows, and high token throughput.',
    renderLogo: () => <FireworksLogo />,
    models: ['DeepSeek V3', 'FireFunction v2', 'Qwen 2.5 72B'],
    tags: ['Low Latency', 'Structured Output', 'High TPS'],
    latency: '~140ms TTFT',
  },

  // Local & Universal Gateways
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    category: 'local',
    description:
      'Run 100% offline open models on your local Mac, Windows, or Linux hardware via localhost:11434 with zero data leaving your machine.',
    renderLogo: () => <OllamaLogo />,
    models: ['Llama 3.3', 'DeepSeek-R1', 'Qwen 2.5 Coder', 'Phi-4'],
    tags: ['100% Offline', 'Private', 'Zero Cost', 'Localhost'],
    latency: 'Hardware bound',
    badge: 'Offline',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    category: 'local',
    description:
      'One unified API key connecting to 300+ AI models worldwide with automatic rate-limit failovers, pricing optimization, and fallback pools.',
    renderLogo: () => <OpenRouterLogo />,
    models: ['All Frontier Models', 'All Open Models', 'Specialty Endpoints'],
    tags: ['Unified Key', 'Auto-Routing', 'Global Failover', 'Crypto & Card'],
    latency: 'Multi-provider',
    badge: 'Universal',
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    category: 'local',
    description:
      'Connect to your local LM Studio desktop server on localhost:1234. Load any Hugging Face GGUF model with full GPU acceleration.',
    renderLogo: () => <LMStudioLogo />,
    models: ['Any GGUF Model', 'Apple Metal / CUDA', 'Local Server'],
    tags: ['Local GUI', 'GGUF', 'Zero Telemetry', 'Desktop'],
    latency: 'Local GPU',
  },
  {
    id: 'vllm',
    name: 'vLLM',
    category: 'local',
    description:
      'High-throughput distributed inference engine using PagedAttention. Perfect for private cloud setups, workstations, and local clusters.',
    renderLogo: () => <VLLMLogo />,
    models: ['PagedAttention Server', 'Distributed Models', 'Multi-GPU'],
    tags: ['PagedAttention', 'Production Local', 'Multi-GPU'],
    latency: 'Cluster bound',
  },
  {
    id: 'cerebras',
    name: 'Cerebras Inference',
    category: 'local',
    description:
      'Wafer-Scale AI engine delivering unprecedented 2,000+ tokens per second for blazing fast automated code refactoring and scaffolding.',
    renderLogo: () => <CerebrasLogo />,
    models: ['Llama 3.3 70B (Wafer-Scale)', 'Llama 3.1 8B'],
    tags: ['2000+ T/s', 'Wafer-Scale', 'Instant Scaffolding'],
    latency: '~60ms TTFT',
    badge: '2000+ T/s',
  },
  {
    id: 'localai',
    name: 'LocalAI',
    category: 'local',
    description:
      'Free, open-source drop-in replacement for OpenAI API running locally on CPU or consumer GPU without external network access.',
    renderLogo: () => <LocalAILogo />,
    models: ['Llama.cpp', 'Diffusers', 'Whisper Local'],
    tags: ['Self-Hosted', 'Docker', 'CPU Friendly'],
    latency: 'Local host',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    category: 'local',
    description:
      'Serverless inference executed across Cloudflare’s global edge network in 300+ cities with zero cold starts and pay-per-request pricing.',
    renderLogo: () => <CloudflareLogo />,
    models: ['@cf/meta/llama-3.3-70b', 'DeepSeek R1 Distill', 'Mistral 7B'],
    tags: ['Global Edge', 'Zero Cold Start', 'Serverless'],
    latency: '~130ms TTFT',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Endpoints',
    category: 'local',
    description:
      'Connect your Hugging Face User Access Token (HF_TOKEN) to deploy dedicated endpoints or query the Serverless Inference API.',
    renderLogo: () => <HuggingFaceLogo />,
    models: ['100k+ Open Models', 'TGI Endpoints', 'Serverless API'],
    tags: ['Hugging Face Hub', 'Dedicated TGI', 'Community'],
    latency: 'Configurable',
  },
];

/* =========================================================================
   FAQ Items (2-Column Accordion Layout matching Integrations Page)
   ========================================================================= */

const BYOK_FAQS = [
  {
    q: 'How are my API keys stored and secured?',
    a: 'Your API keys are encrypted client-side using industry-standard Web Cryptography (AES-GCM 256-bit) and stored exclusively in your local browser sandbox. Keys are transmitted directly from your client to the provider’s endpoint (or local port) over TLS — Roow never logs, proxies, or retains your keys on remote servers.',
  },
  {
    q: 'Does Roow add any platform fee or markup on BYOK tokens?',
    a: 'Zero. You pay directly to your model provider at their standard pricing with no hidden margins, markup, or per-token surcharge. Using your own API keys in Roow gives you unrestricted access at raw compute cost.',
  },
  {
    q: 'Can I use multiple providers simultaneously in the same project?',
    a: 'Yes. You can configure multiple provider keys at once and selectively route tasks — for example, using Claude 3.7 Sonnet for complex architectural reasoning, GPT-4o for code review, Gemini 2.5 for large-context ingestion, and Groq for ultra-fast UI tweaks.',
  },
  {
    q: 'Can I connect local models completely offline?',
    a: 'Yes. Roow natively supports local endpoint addresses such as http://localhost:11434 (Ollama), http://localhost:1234 (LM Studio), or custom vLLM clusters. Your code and prompts never leave your local machine when using offline endpoints.',
  },
  {
    q: 'What happens if a provider hits rate limits or goes down?',
    a: 'Roow includes automatic fallback chaining. You can configure backup providers so that if your primary model encounters a temporary rate limit (429) or outage (503), requests automatically failover to your designated secondary model without interrupting your vibecoding session.',
  },
  {
    q: 'Can I set token spend limits or model parameters?',
    a: 'Yes. You have granular control over temperature, top-p, context window limits, max output tokens, and per-project budget warnings to keep your personal API consumption predictable.',
  },
];

export const BYOKPage: React.FC<BYOKPageProps> = ({
  onNavigateHome,
  onOpenPricing,
  onOpenIntegrations,
  onOpenBYOK,
  onOpenJoin,
  onOpenContact,
  onOpenAbout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Filter providers based on search query
  const filteredCloud = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BYOK_ITEMS.filter((i) => i.category === 'cloud');
    return BYOK_ITEMS.filter(
      (i) =>
        i.category === 'cloud' &&
        (i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.models.some((m) => m.toLowerCase().includes(q)) ||
          i.tags?.some((t) => t.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  const filteredLocal = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BYOK_ITEMS.filter((i) => i.category === 'local');
    return BYOK_ITEMS.filter(
      (i) =>
        i.category === 'local' &&
        (i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.models.some((m) => m.toLowerCase().includes(q)) ||
          i.tags?.some((t) => t.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  const totalResults = filteredCloud.length + filteredLocal.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#0055d4] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenAbout={onOpenAbout}
        onOpenPricing={onOpenPricing}
        onOpenIntegrations={onOpenIntegrations}
        onOpenBYOK={
          onOpenBYOK ||
          (() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
        }
        onOpenJoin={onOpenJoin}
        onNavigateHome={onNavigateHome}
        isPricingActive={false}
        isIntegrationsActive={false}
        isBYOKActive={true}
      />

      <main className="flex-1 flex flex-col">
        {/* =========================================================================
            Hero & Search Section
            Framed with Roow's signature dashed outer container
            ========================================================================= */}
        <section className="relative w-full bg-black select-none overflow-hidden">
          <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
            <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-12 sm:pt-16 pb-12 sm:pb-16 px-6 sm:px-10 md:px-14">
              {/* Subtle background tech grid with dual electric blue & lime ambient glow */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute -top-32 left-1/4 w-[500px] h-[300px] bg-[#38bdf8]/10 blur-[120px] pointer-events-none rounded-full" />
              <div className="absolute -top-32 right-1/4 w-[400px] h-[250px] bg-[#E3EF4F]/8 blur-[120px] pointer-events-none rounded-full" />

              {/* Breadcrumb: Roow / BYOK Models */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6 sm:mb-8 select-none">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#E3EF4F] transition-colors cursor-pointer"
                >
                  Roow
                </button>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-200">Bring Your Own Key</span>
                <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded bg-[#0a54d6]/20 text-[#60a5fa] border border-[#0a54d6]/40 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                  BYOK Ecosystem
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight font-medium text-white mb-6 max-w-4xl leading-[1.05]">
                Bring your own keys
                <br />
                to any AI model
              </h1>

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg text-neutral-400 font-sans max-w-2xl leading-relaxed mb-10">
                Connect your own API keys or local runtimes — OpenAI, Anthropic, Gemini,
                DeepSeek, and more. Zero platform markup, encrypted client-side, unlimited control.
              </p>

              {/* Search Provider / Model Bar */}
              <div className="relative max-w-3xl pt-2 pb-2">
                <div className="relative flex items-center border-b border-white/15 focus-within:border-[#38bdf8] transition-colors group">
                  <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-[#38bdf8] transition-colors shrink-0 ml-1" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search provider, model, or protocol (e.g. Claude 3.7, GPT-4o, DeepSeek, Ollama)..."
                    className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {searchQuery && (
                  <div className="mt-3 text-xs font-mono text-neutral-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span>
                        Found <strong className="text-white">{totalResults}</strong> matching providers:
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#E3EF4F]/10 text-[#E3EF4F] font-medium border border-[#E3EF4F]/20">
                        {filteredCloud.length} Cloud
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a54d6]/20 text-[#38bdf8] font-medium border border-[#0a54d6]/40">
                        {filteredLocal.length} Local & Gateways
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-[#38bdf8] hover:underline cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            Section 1: Cloud & Frontier Providers (Lime Accent Style)
            ========================================================================= */}
        {filteredCloud.length > 0 && (
          <section className="relative w-full bg-black select-none">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
              <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-12 sm:pt-14 pb-16 px-6 sm:px-10 md:px-14">
                {/* Section Header */}
                <div className="mb-10 max-w-3xl">
                  <span className="inline-block px-2.5 py-0.5 mb-2.5 text-[10px] font-mono font-medium rounded bg-[#E3EF4F]/10 text-[#E3EF4F] border border-[#E3EF4F]/30 uppercase tracking-wider">
                    Direct API Keys
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mb-3">
                    Cloud & Frontier Providers
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                    Direct connection to frontier AI models. Zero markup, raw provider pricing, and
                    uncompromised throughput with your personal credentials.
                  </p>
                </div>

                {/* Cloud Providers Grid: 3 columns responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredCloud.map((item) => (
                    <div
                      key={item.id}
                      onClick={onOpenJoin}
                      className="group relative bg-[#0c0d12]/95 border border-white/10 hover:border-[#E3EF4F]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(227,239,79,0.08)]"
                    >
                      {/* Top Row: Title + Arrow on Left, Brand Logo on Right */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white group-hover:text-[#E3EF4F] transition-colors">
                          <h3 className="text-lg sm:text-xl font-medium tracking-tight">
                            {item.name}
                          </h3>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#E3EF4F]/15 text-[#E3EF4F] border border-[#E3EF4F]/30 uppercase">
                              {item.badge}
                            </span>
                          )}
                          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E3EF4F] group-hover:bg-[#E3EF4F] group-hover:text-black transition-all ml-1">
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        {/* Logo Container */}
                        <div className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
                          {item.renderLogo()}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed group-hover:text-neutral-300 transition-colors mb-4">
                        {item.description}
                      </p>

                      {/* Supported Models Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.models.map((m, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-neutral-300 border border-white/10 group-hover:border-[#E3EF4F]/30 transition-colors"
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Indicator with Key tag */}
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <div className="flex items-center gap-2">
                          <Key className="w-3 h-3 text-[#E3EF4F]" />
                          <span className="uppercase tracking-wider">Encrypted Client-Side</span>
                          {item.latency && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/5 text-neutral-400 border border-white/10">
                              {item.latency}
                            </span>
                          )}
                        </div>
                        <span className="text-[#E3EF4F] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          Connect ↵
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            Section 2: Local & Universal Gateways (Electric Blue Accent Style)
            ========================================================================= */}
        {filteredLocal.length > 0 && (
          <section className="relative w-full bg-black select-none">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
              <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-12 sm:pt-14 pb-16 px-6 sm:px-10 md:px-14">
                {/* Section Header with Blue Tag */}
                <div className="mb-10 max-w-3xl">
                  <span className="inline-block px-2.5 py-0.5 mb-2.5 text-[10px] font-mono font-medium rounded bg-[#0a54d6]/25 text-[#38bdf8] border border-[#0a54d6]/50 uppercase tracking-wider">
                    Local & Universal Gateways
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mb-3">
                    Self-Hosted Runtimes & Routers
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                    Run completely offline with zero telemetry on your local machine, or route across
                    hundreds of open models through universal router pools.
                  </p>
                </div>

                {/* Local Providers Grid: 3 columns responsive with Electric Blue Accents */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredLocal.map((item) => (
                    <div
                      key={item.id}
                      onClick={onOpenJoin}
                      className="group relative bg-[#0c0d12]/95 border border-white/10 hover:border-[#38bdf8]/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)]"
                    >
                      {/* Top Row: Title + Arrow on Left, Brand Logo on Right */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white group-hover:text-[#38bdf8] transition-colors">
                          <h3 className="text-lg sm:text-xl font-medium tracking-tight">
                            {item.name}
                          </h3>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#0a54d6]/30 text-[#38bdf8] border border-[#0a54d6]/50 uppercase">
                              {item.badge}
                            </span>
                          )}
                          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-black transition-all ml-1">
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        {/* Logo Container */}
                        <div className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#38bdf8]/30 transition-colors">
                          {item.renderLogo()}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed group-hover:text-neutral-300 transition-colors mb-4">
                        {item.description}
                      </p>

                      {/* Supported Models Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.models.map((m, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-neutral-300 border border-white/10 group-hover:border-[#38bdf8]/30 transition-colors"
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Accent Indicator with Blue Tag & Pulse */}
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                          <span className="uppercase tracking-wider">Localhost / Router</span>
                          {item.latency && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#0a54d6]/20 text-[#38bdf8] border border-[#0a54d6]/30">
                              {item.latency}
                            </span>
                          )}
                        </div>
                        <span className="text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          Configure ↵
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Empty State when search has no results */}
        {totalResults === 0 && (
          <section className="relative w-full bg-black select-none py-20">
            <div className="max-w-xl mx-auto px-6 text-center">
              <p className="text-neutral-400 text-base mb-5 font-sans">
                No providers or models matching &quot;{searchQuery}&quot; found.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2 bg-[#E3EF4F] text-black font-mono text-xs font-semibold hover:bg-[#d8e442] transition-colors cursor-pointer"
                >
                  Clear search
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="px-5 py-2 bg-[#0a54d6] text-white font-mono text-xs font-semibold hover:bg-[#0848b5] transition-colors cursor-pointer"
                >
                  Request Provider
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            Section 3: Frequently asked questions
            Matching the 2-column layout from Integrations Page
            ========================================================================= */}
        <section className="relative w-full bg-black select-none">
          <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
            <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black py-16 sm:py-24 px-6 sm:px-10 md:px-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* Left Column: Title */}
                <div className="lg:col-span-5">
                  <span className="inline-block px-2.5 py-0.5 mb-3 text-[10px] font-mono font-medium rounded bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-wider">
                    BYOK Architecture
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-medium text-white tracking-tight leading-[1.08] sticky top-24">
                    Frequently
                    <br />
                    asked questions
                  </h2>
                </div>

                {/* Right Column: Accordion list */}
                <div className="lg:col-span-7 flex flex-col divide-y divide-white/15">
                  {BYOK_FAQS.map((faq, idx) => {
                    const isOpen = !!openFaqs[idx];
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={idx} className="py-6 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                        >
                          <span
                            className={`text-lg sm:text-xl font-sans font-medium transition-colors ${
                              isOpen
                                ? isEven
                                  ? 'text-[#E3EF4F]'
                                  : 'text-[#38bdf8]'
                                : 'text-white group-hover:text-neutral-200'
                            }`}
                          >
                            {faq.q}
                          </span>

                          <div
                            className={`shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                              isOpen
                                ? isEven
                                  ? 'border-[#E3EF4F] bg-[#E3EF4F] text-black rotate-180'
                                  : 'border-[#38bdf8] bg-[#38bdf8] text-black rotate-180'
                                : 'border-white/20 text-neutral-400 group-hover:border-white/50 group-hover:text-white'
                            }`}
                          >
                            <ArrowDown className="w-4 h-4 transition-transform" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mt-4 pr-12 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed animate-fade-in">
                            <p>{faq.a}</p>
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

        {/* Start Building Call-to-Action */}
        <StartBuildingSection
          onOpenJoin={onOpenJoin}
          onOpenContact={onOpenContact}
        />

        {/* Footer */}
        <Footer
          onOpenAbout={onOpenAbout}
          onOpenPricing={onOpenPricing}
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

export default BYOKPage;
