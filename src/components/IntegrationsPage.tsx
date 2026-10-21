import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  X,
} from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { StartBuildingSection } from './StartBuildingSection.tsx';
import { Footer } from './Footer.tsx';

interface IntegrationsPageProps {
  onNavigateHome: () => void;
  onOpenPricing: () => void;
  onOpenBYOK?: () => void;
  onOpenJoin: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
}

interface IntegrationItem {
  id: string;
  name: string;
  category: 'connector' | 'manual';
  description: string;
  renderLogo: () => React.ReactNode;
  tags?: string[];
}

/* =========================================================================
   Brand Logo SVGs (Zero Emojis, Pure Crisp Vector Components)
   ========================================================================= */

const SalesforceLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
    <path
      d="M19.5 12C21.8 8.4 25.8 6 30.5 6C37.4 6 43 11.6 43 18.5C43 19.4 42.9 20.3 42.7 21.1C44.7 22.8 46 25.3 46 28.2C46 33.1 42.1 37 37.2 37H11.5C6.8 37 3 33.2 3 28.5C3 24.3 6.1 20.7 10.1 20.1C10.7 15.6 14.6 12 19.5 12Z"
      fill="#00A1E0"
    />
    <path
      d="M20 18.5C21.5 16.5 24 15 27 15C31.4 15 35 18.6 35 23C35 23.6 34.9 24.2 34.8 24.7C36.1 25.8 37 27.4 37 29.3C37 32.4 34.4 35 31.3 35H13C9.7 35 7 32.3 7 29C7 26.2 9 23.8 11.7 23.2C12.2 20.1 14.9 17.5 18.3 17.5C18.9 17.5 19.5 17.6 20 18.5Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const NotionLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center p-1 shadow-sm">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.196-.84c.373 0 .466-.186.373-.466L17.513 1.83C17.047 1.177 16.208 1 15.089 1.093L3.153 2.026c-.653.047-.933.373-.653.84l1.959 1.342zm1.212 3.172v13.528c0 .84.466 1.166 1.492 1.073l12.875-.933c.84-.093.933-.653.933-1.306V6.167c0-.653-.28-.933-.933-.886L5.671 6.36c-.653.047-.653.373-.653 1.02zm11.196.42c.093.466 0 .933-.466.98l-.746.14v9.889c-.466.28-.98.42-1.4.42-.7 0-1.073-.28-1.586-.933l-4.292-6.764v6.857l1.4.326c0 .466-.466.56-.933.56l-3.359.187c-.093-.28 0-.746.373-.84l.84-.233V8.873l-1.12-.093c-.093-.466.187-.84.746-.887l3.732-.28 4.479 6.857V8.547l-1.12-.14c0-.466.28-.793.84-.84l2.888-.233z" />
    </svg>
  </div>
);

const SlackLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 128 128">
    <path
      d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
      fill="#E01E5A"
    />
    <path
      d="M47 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.7 39.7.8 47 .8c7.3 0 13.2 5.9 13.2 13.2v13.2H47zm0 6.6c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H14C6.7 60.2.8 54.3.8 47c0-7.3 5.9-13.2 13.2-13.2H47z"
      fill="#36C5F0"
    />
    <path
      d="M100.8 47c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-13.2V47zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V14c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33z"
      fill="#2EB67D"
    />
    <path
      d="M80 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-13.2H80zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80z"
      fill="#ECB22E"
    />
  </svg>
);

const GoogleCalendarLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white flex flex-col items-center justify-center border border-neutral-200 overflow-hidden shadow-sm">
    <div className="w-full bg-[#1a73e8] h-2.5 flex items-center justify-center">
      <div className="flex gap-1">
        <span className="w-0.5 h-0.5 bg-white rounded-full" />
        <span className="w-0.5 h-0.5 bg-white rounded-full" />
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center text-[#1a73e8] font-sans font-bold text-[13px] leading-none">
      31
    </div>
  </div>
);

const GoogleDriveLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 87.3 78">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335" />
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.25z" fill="#00832d" />
    <path d="m57.4 1.2-13.75 23.8 13.75 23.8h27.5c0-1.55-.4-3.1-1.2-4.5l-21.75-37.7c-.8-1.4-1.95-2.5-3.3-3.3z" fill="#ffba00" />
    <path d="m71.9 52.65h-44.4l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h53.7c1.6 0 3.15-.45 4.5-1.25z" fill="#2684fc" />
  </svg>
);

const HubSpotLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF7A59">
    <path d="M18.8 7.3V4.5c.8-.4 1.4-1.3 1.4-2.3 0-1.4-1.2-2.5-2.6-2.5s-2.6 1.1-2.6 2.5c0 1 .6 1.9 1.4 2.3v2.8c-1.2.3-2.1 1.2-2.5 2.3L8.6 6.5c.1-.3.2-.6.2-.9 0-1.7-1.4-3.1-3.1-3.1S2.6 3.9 2.6 5.6s1.4 3.1 3.1 3.1c.5 0 1-.1 1.4-.3l5.3 3.1c-.2.5-.3 1-.3 1.6s.1 1.1.3 1.6l-5.3 3.1c-.4-.2-.9-.3-1.4-.3-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1c0-.3-.1-.6-.2-.9l5.3-3.1c.4 1.1 1.3 2 2.5 2.3v2.8c-.8.4-1.4 1.3-1.4 2.3 0 1.4 1.2 2.5 2.6 2.5s2.6-1.1 2.6-2.5c0-1-.6-1.9-1.4-2.3v-2.8c1.7-.5 3-2.1 3-3.9 0-1.9-1.3-3.4-3-3.9V7.3zm-1.2 8.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
  </svg>
);

const GoogleSheetsLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#0F9D58] flex flex-col items-center justify-center p-1.5 shadow-sm text-white">
    <div className="w-full h-full border border-white/60 grid grid-cols-2 grid-rows-3 gap-0.5 p-0.5">
      <div className="bg-white/90 rounded-2xs" />
      <div className="bg-white/90 rounded-2xs" />
      <div className="bg-white/90 rounded-2xs" />
      <div className="bg-white/90 rounded-2xs" />
      <div className="bg-white/90 rounded-2xs" />
      <div className="bg-white/90 rounded-2xs" />
    </div>
  </div>
);

const GoogleSlidesLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#F4B400] flex items-center justify-center p-1.5 shadow-sm">
    <div className="w-5 h-4 bg-white/90 rounded-2xs flex items-center justify-center">
      <div className="w-3.5 h-2.5 border border-[#F4B400] bg-white" />
    </div>
  </div>
);

const GoogleDocsLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#4285F4] flex flex-col items-center justify-center p-1.5 shadow-sm text-white">
    <div className="w-4 h-5 bg-white rounded-2xs flex flex-col justify-center gap-0.5 px-0.5">
      <div className="h-0.5 bg-[#4285F4] w-full rounded-full" />
      <div className="h-0.5 bg-[#4285F4] w-full rounded-full" />
      <div className="h-0.5 bg-[#4285F4] w-2/3 rounded-full" />
    </div>
  </div>
);

const LinkedInLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#0A66C2] flex items-center justify-center shadow-sm">
    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  </div>
);

const TikTokLogo = () => (
  <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center border border-white/20 shadow-sm relative overflow-hidden">
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.34 0 .66.06.96.18v-3.2a5.77 5.77 0 0 0-.96-.08 5.79 5.79 0 0 0-5.79 5.79 5.79 5.79 0 0 0 5.79 5.79 5.79 5.79 0 0 0 5.79-5.79V8.67a7.28 7.28 0 0 0 4.38 1.47V7.05a4.28 4.28 0 0 1-3.42-1.23z"
        fill="#25F4EE"
      />
      <path
        d="M16.1 5.42s.51.5 0 0A4.278 4.278 0 0 1 15.04 2.6h-3.09V15a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.34 0 .66.06.96.18V9.48a5.77 5.77 0 0 0-.96-.08 5.79 5.79 0 0 0-5.79 5.79 5.79 5.79 0 0 0 5.79 5.79 5.79 5.79 0 0 0 5.79-5.79V8.27a7.28 7.28 0 0 0 4.38 1.47V6.65a4.28 4.28 0 0 1-3.42-1.23z"
        fill="#FE2C55"
      />
    </svg>
  </div>
);

const GmailLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 48 48">
    <path d="M45 16.2v19.8c0 2.2-1.8 4-4 4h-6.2V25.2L45 16.2z" fill="#4285F4" />
    <path d="M3 16.2L13.2 25.2V40H7c-2.2 0-4-1.8-4-4V16.2z" fill="#34A853" />
    <path d="M34.8 11.2L24 19.3 13.2 11.2V8c0-2.2 1.8-4 4-4h13.6c2.2 0 4 1.8 4 4v3.2z" fill="#FBBC05" />
    <path d="M45 16.2L34.8 11.2 24 19.3 13.2 11.2 3 16.2 24 31.8 45 16.2z" fill="#EA4335" />
  </svg>
);

const DiscordLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#5865F2] flex items-center justify-center shadow-sm">
    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  </div>
);

const MondayLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center p-1.5 shadow-sm">
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-4 bg-[#FF3D57] rounded-full" />
      <div className="w-1.5 h-4 bg-[#FFCB00] rounded-full" />
      <div className="w-1.5 h-4 bg-[#00CA72] rounded-full" />
    </div>
  </div>
);

const OpenAILogo = () => (
  <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center p-1 shadow-sm">
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.737a4.485 4.485 0 0 1 2.37-2.017V12.3a.76.76 0 0 0 .387.676l5.82 3.36-2.02 1.168a.088.088 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.737zm16.597 3.855l-5.833-3.387L15.124 8a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.414-.645zm2.019-3.013l-.14-.082-4.78-2.759a.774.774 0 0 0-.78 0L9.414 10.11V7.776a.076.076 0 0 1 .032-.062l4.84-2.794a4.499 4.499 0 0 1 6.673 4.673zm-11.604 4.767l2.67-1.542 2.67 1.542v3.084l-2.67 1.542-2.67-1.542z" />
    </svg>
  </div>
);

const ExploriumLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#001738] border border-blue-900/50 flex items-center justify-center p-1 text-white shadow-sm font-sans font-bold text-xs">
    <span className="text-[#00E5FF]">ex</span>
  </div>
);

const EToroLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center p-1 shadow-sm">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#13C259">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4H8v-2h3V7.5h2v3h3v2h-3v4z" />
      <path d="M17.5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S19 5.17 19 6s-.67 1.5-1.5 1.5zM6.5 7.5C5.67 7.5 5 6.83 5 6s.67-1.5 1.5-1.5S8 5.17 8 6s-.67 1.5-1.5 1.5z" />
    </svg>
  </div>
);

const GiphyLogo = () => (
  <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center p-1.5 shadow-sm border border-neutral-800">
    <div className="w-5 h-5 flex flex-wrap gap-0.5">
      <div className="w-2 h-2 bg-[#00FF99]" />
      <div className="w-2 h-2 bg-[#9933FF]" />
      <div className="w-2 h-2 bg-[#00CCFF]" />
      <div className="w-2 h-2 bg-[#FFF35C]" />
    </div>
  </div>
);

const BrightDataLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center p-1 shadow-sm">
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 bg-[#0C57F0] rounded-full mb-0.5" />
      <div className="w-2.5 h-4 bg-[#0C57F0] rounded-t-sm" />
    </div>
  </div>
);

const XLogo = () => (
  <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center p-1 border border-white/20 shadow-sm text-white">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  </div>
);

const ElevenLabsLogo = () => (
  <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-mono font-bold text-sm tracking-tighter shadow-sm">
    <span>II</span>
  </div>
);

const ZapierLogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#FF4F00] flex items-center justify-center shadow-sm text-white font-bold text-xl leading-none">
    <span>*</span>
  </div>
);

const FalAILogo = () => (
  <div className="w-8 h-8 rounded-md bg-[#6725F4] flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
    <span>fal</span>
  </div>
);

const ResendLogo = () => (
  <div className="w-8 h-8 rounded-md bg-black border border-white/30 flex items-center justify-center text-white shadow-sm">
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  </div>
);

/* =========================================================================
   Integration Datasets matching Reference Exactly
   ========================================================================= */

const CONNECTORS: IntegrationItem[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'connector',
    description:
      'Integrate Salesforce data directly into your app to automate workflows, manage leads, and power real-time insights.',
    renderLogo: () => <SalesforceLogo />,
    tags: ['crm', 'sales', 'leads', 'database'],
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'connector',
    description:
      'Connect your app to Notion and sync pages, databases, and content instantly—perfect for dashboards, documentation, and automated workflows.',
    renderLogo: () => <NotionLogo />,
    tags: ['docs', 'wiki', 'productivity', 'database'],
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'connector',
    description:
      'Enhance productivity by centralizing notifications, streamlining workflows, and enabling seamless collaboration.',
    renderLogo: () => <SlackLogo />,
    tags: ['chat', 'notifications', 'team', 'alerts'],
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'connector',
    description:
      'Connect your app to Google Calendar to manage events, streamline bookings, and keep schedules aligned across teams.',
    renderLogo: () => <GoogleCalendarLogo />,
    tags: ['calendar', 'events', 'scheduling', 'google'],
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'connector',
    description:
      'Export files, store app-generated documents, and back up data directly to your Drive — all in one click.',
    renderLogo: () => <GoogleDriveLogo />,
    tags: ['files', 'storage', 'backup', 'google'],
  },
  {
    id: 'hubspot-connector',
    name: 'HubSpot',
    category: 'connector',
    description:
      'Sync CRM data, automate lead flows, and power marketing and sales workflows directly from your app.',
    renderLogo: () => <HubSpotLogo />,
    tags: ['crm', 'marketing', 'sales', 'email'],
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    category: 'connector',
    description:
      'Sync your app with Google Sheets to automate data entry, reporting, and spreadsheet workflows in one click.',
    renderLogo: () => <GoogleSheetsLogo />,
    tags: ['spreadsheets', 'data', 'reports', 'google'],
  },
  {
    id: 'google-slides',
    name: 'Google Slides',
    category: 'connector',
    description:
      'Generate and update Google Slides presentations directly from your app using live data and automated content workflows.',
    renderLogo: () => <GoogleSlidesLogo />,
    tags: ['presentations', 'slides', 'deck', 'google'],
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    category: 'connector',
    description:
      'Automate document creation, editing, and collaboration by connecting your app to Google Docs.',
    renderLogo: () => <GoogleDocsLogo />,
    tags: ['documents', 'writing', 'editing', 'google'],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'connector',
    description:
      'Sync LinkedIn profiles, pages, and posts with your app to automate publishing, insights, and engagement.',
    renderLogo: () => <LinkedInLogo />,
    tags: ['social', 'marketing', 'network', 'b2b'],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'connector',
    description:
      'Track your profile stats, video performance, and public content in real time.',
    renderLogo: () => <TikTokLogo />,
    tags: ['video', 'social', 'media', 'analytics'],
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'connector',
    description:
      'Send emails, alerts, and automated summaries directly from your app.',
    renderLogo: () => <GmailLogo />,
    tags: ['email', 'inbox', 'notifications', 'google'],
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'connector',
    description:
      'Send alerts, summaries, and community updates directly to your Discord server.',
    renderLogo: () => <DiscordLogo />,
    tags: ['community', 'chat', 'bot', 'gaming'],
  },
];

const MANUAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: 'monday',
    name: 'Monday.com',
    category: 'manual',
    description:
      'Build apps that can read and write data from your monday.com boards.',
    renderLogo: () => <MondayLogo />,
    tags: ['project management', 'tasks', 'boards', 'workflow'],
  },
  {
    id: 'openai-tts',
    name: 'OpenAI Text-To-Speech',
    category: 'manual',
    description:
      "Integrate Text-To-Speech capabilities into your app by leveraging OpenAI's latest TTS models.",
    renderLogo: () => <OpenAILogo />,
    tags: ['ai', 'audio', 'voice', 'speech', 'openai'],
  },
  {
    id: 'hubspot-manual',
    name: 'HubSpot',
    category: 'manual',
    description:
      'Sync customer data, automate marketing workflows, and enhance sales productivity with using your HubSpot account.',
    renderLogo: () => <HubSpotLogo />,
    tags: ['crm', 'marketing', 'api'],
  },
  {
    id: 'explorium',
    name: 'Explorium',
    category: 'manual',
    description: 'Integrate your app with endless B2B data.',
    renderLogo: () => <ExploriumLogo />,
    tags: ['b2b', 'enrichment', 'leads', 'data'],
  },
  {
    id: 'etoro',
    name: 'eToro',
    category: 'manual',
    description:
      'Streamline access to financial data, trading insights, and social investing features.',
    renderLogo: () => <EToroLogo />,
    tags: ['finance', 'trading', 'stocks', 'investing'],
  },
  {
    id: 'giphy',
    name: 'Giphy',
    category: 'manual',
    description:
      'Add engaging, dynamic GIFS to boost interaction and creativity.',
    renderLogo: () => <GiphyLogo />,
    tags: ['media', 'gifs', 'animation', 'stickers'],
  },
  {
    id: 'brightdata',
    name: 'BrightData',
    category: 'manual',
    description:
      'Collect web data at scale with reliable proxy infrastructure and custom scraping endpoints.',
    renderLogo: () => <BrightDataLogo />,
    tags: ['proxies', 'web scraping', 'data extraction'],
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    category: 'manual',
    description:
      'Post updates, analyze sentiment, and interact with the X API directly from your workflow.',
    renderLogo: () => <XLogo />,
    tags: ['social', 'tweets', 'feed', 'analytics'],
  },
  {
    id: 'elevenlabs',
    name: '11 Eleven Labs',
    category: 'manual',
    description:
      'Generate realistic, high-quality speech from any text using ElevenLabs. This integration lets you convert typed input into natural voice in real time.',
    renderLogo: () => <ElevenLabsLogo />,
    tags: ['voice', 'ai', 'speech', 'audio'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'manual',
    description:
      'Automate tasks between Roow and over 6,000+ apps. Send data from Roow to Google Sheets, Slack, Notion, Trello, and more without writing code. Ideal for productivity workflows, real-time notifications, and team collaboration.',
    renderLogo: () => <ZapierLogo />,
    tags: ['automation', 'webhooks', 'triggers', 'multi-app'],
  },
  {
    id: 'fal-ai',
    name: 'Fal AI',
    category: 'manual',
    description:
      'This is a text-to-image integration using Fal AI engine and their `fast-sdxl` model.',
    renderLogo: () => <FalAILogo />,
    tags: ['image generation', 'ai', 'sdxl', 'models'],
  },
  {
    id: 'resend',
    name: 'Resend',
    category: 'manual',
    description:
      'Send transactional emails with dynamic subjects, rich content, and verified custom sender domains without managing backend email server infrastructure.',
    renderLogo: () => <ResendLogo />,
    tags: ['email', 'transactional', 'smtp', 'delivery'],
  },
];

/* =========================================================================
   FAQ Items matching Reference Screenshots Exactly
   ========================================================================= */

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What are app integrations?',
    a: 'An app integration is a connection that lets two or more applications share data and trigger actions automatically. Instead of copying information between tools, integrated apps stay in sync on their own. For example, a Roow app connected to Slack can post a message the moment a new lead arrives. Application integration (also called software integration) is what turns a standalone app into part of your workflow. In Roow, app integrations come in two forms: one-click connectors and manual API integrations.',
  },
  {
    q: 'Which app integrations does Roow support?',
    a: 'Roow supports one-click Connectors (including Salesforce, Notion, Slack, Google Calendar, Google Drive, HubSpot, Google Sheets, Google Slides, Google Docs, LinkedIn, TikTok, Gmail, Discord) and Manual API integrations (including Monday.com, OpenAI, ElevenLabs, Zapier, Fal AI, eToro, Giphy, BrightData, Resend, and any custom REST or GraphQL API).',
  },
  {
    q: 'What is the difference between Connectors and manual integrations?',
    a: 'Connectors provide instant one-click OAuth setup with zero manual credential configuration — just authorize and connect. Manual integrations allow you to input your own custom API keys, endpoints, and headers for granular control over third-party developer APIs.',
  },
  {
    q: 'How do I integrate apps with my Roow app?',
    a: 'Simply tell Roow what you want to connect in natural language or click on any integration card. Roow automatically configures data contracts, authorization scopes, and real-time syncing for your project.',
  },
  {
    q: 'Do I need to know how to code to use these integrations?',
    a: 'No coding knowledge is required. Roow takes care of authentication, payload serialization, state management, and API error handling automatically through vibe coding.',
  },
  {
    q: 'How much do Roow integrations cost?',
    a: 'All integrations and connectors are included across all Roow tiers. The free Hobby plan comes with generous monthly calls and triggers, while Pro and Enterprise plans offer expanded throughput and priority execution.',
  },
  {
    q: 'Are Roow integrations secure?',
    a: 'Yes. All authentication tokens and API keys are protected using AES-256 encryption at rest and TLS 1.3 in transit. Roow follows strict least-privilege scoping and never exposes credentials.',
  },
  {
    q: "Can I connect an app that isn't listed here?",
    a: 'Yes. With Roow’s Model Context Protocol (MCP) server support and generic HTTP/REST webhooks, you can connect any custom backend, private microservice, or public API in seconds.',
  },
];

export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({
  onNavigateHome,
  onOpenPricing,
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

  // Filter Connectors & Manual Integrations by search query
  const filteredConnectors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CONNECTORS;
    return CONNECTORS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredManual = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return MANUAL_INTEGRATIONS;
    return MANUAL_INTEGRATIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const totalResults = filteredConnectors.length + filteredManual.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#E3EF4F] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenAbout={onOpenAbout}
        onOpenPricing={onOpenPricing}
        onOpenIntegrations={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBYOK={onOpenBYOK}
        onOpenJoin={onOpenJoin}
        onNavigateHome={onNavigateHome}
        isPricingActive={false}
        isIntegrationsActive={true}
        isBYOKActive={false}
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
              <div
                className="absolute -top-32 left-1/4 w-[500px] h-[300px] bg-[#38bdf8]/10 blur-[120px] pointer-events-none rounded-full"
              />
              <div
                className="absolute -top-32 right-1/4 w-[400px] h-[250px] bg-[#E3EF4F]/8 blur-[120px] pointer-events-none rounded-full"
              />

              {/* Breadcrumb matching reference: Base44 / App Integrations -> Roow / App Integrations */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6 sm:mb-8 select-none">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#E3EF4F] transition-colors cursor-pointer"
                >
                  Roow
                </button>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-200">App Integrations</span>
                <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded bg-[#0a54d6]/20 text-[#60a5fa] border border-[#0a54d6]/40 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                  Ecosystem
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight font-medium text-white mb-6 max-w-4xl leading-[1.05]">
                All the integrations
                <br />
                your apps need
              </h1>

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg text-neutral-400 font-sans max-w-2xl leading-relaxed mb-10">
                Connect the tools you already use — Salesforce, Notion, Slack, and
                more. No config, no credentials, no waiting on anyone.
              </p>

              {/* Search Integration Bar */}
              <div className="relative max-w-3xl pt-2 pb-2">
                <div className="relative flex items-center border-b border-white/15 focus-within:border-[#38bdf8] transition-colors group">
                  <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-[#38bdf8] transition-colors shrink-0 ml-1" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search integration"
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
                      <span>Found <strong className="text-white">{totalResults}</strong> matching results:</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#E3EF4F]/10 text-[#E3EF4F] font-medium border border-[#E3EF4F]/20">{filteredConnectors.length} Connectors</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a54d6]/20 text-[#38bdf8] font-medium border border-[#0a54d6]/40">{filteredManual.length} APIs</span>
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
            Section 1: Connectors
            ========================================================================= */}
        {filteredConnectors.length > 0 && (
          <section className="relative w-full bg-black select-none">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
              <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-12 sm:pt-14 pb-16 px-6 sm:px-10 md:px-14">
                
                {/* Section Header */}
                <div className="mb-10 max-w-3xl">
                  <span className="inline-block px-2.5 py-0.5 mb-2.5 text-[10px] font-mono font-medium rounded bg-[#E3EF4F]/10 text-[#E3EF4F] border border-[#E3EF4F]/30 uppercase tracking-wider">
                    Instant Connectors
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mb-3">
                    Connectors
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                    One-click integrations for seamless setup - no manual steps required. Just tell Roow
                    what to connect, then authorize it with a click.
                  </p>
                </div>

                {/* Connectors Grid: 3 columns responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredConnectors.map((item) => (
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
                          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E3EF4F] group-hover:bg-[#E3EF4F] group-hover:text-black transition-all">
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        {/* Logo Container */}
                        <div className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
                          {item.renderLogo()}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed group-hover:text-neutral-300 transition-colors">
                        {item.description}
                      </p>

                      {/* Bottom Indicator with OAuth tag */}
                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <div className="flex items-center gap-2">
                          <span className="uppercase tracking-wider">One-click</span>
                          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#0a54d6]/20 text-[#60a5fa] border border-[#0a54d6]/30 uppercase tracking-wider">
                            OAuth
                          </span>
                        </div>
                        <span className="text-[#E3EF4F] opacity-0 group-hover:opacity-100 transition-opacity font-medium">Connect ↵</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            Section 2: Manual Integrations (Featuring Electric Blue Style)
            ========================================================================= */}
        {filteredManual.length > 0 && (
          <section className="relative w-full bg-black select-none">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
              <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black pt-12 sm:pt-14 pb-16 px-6 sm:px-10 md:px-14">
                
                {/* Section Header with Blue Tag */}
                <div className="mb-10 max-w-3xl">
                  <span className="inline-block px-2.5 py-0.5 mb-2.5 text-[10px] font-mono font-medium rounded bg-[#0a54d6]/25 text-[#38bdf8] border border-[#0a54d6]/50 uppercase tracking-wider">
                    Developer & REST APIs
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mb-3">
                    Manual Integrations
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                    API integrations you can configure with your own credentials.
                  </p>
                </div>

                {/* Manual Integrations Grid: 3 columns responsive with Electric Blue Accents */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredManual.map((item) => (
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
                          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-black transition-all">
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        {/* Logo Container */}
                        <div className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#38bdf8]/30 transition-colors">
                          {item.renderLogo()}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed group-hover:text-neutral-300 transition-colors">
                        {item.description}
                      </p>

                      {/* Bottom Accent Indicator with Blue Tag & Pulse */}
                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                          <span className="uppercase tracking-wider">Custom API</span>
                          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#0a54d6]/25 text-[#38bdf8] border border-[#0a54d6]/40 uppercase tracking-wider">
                            REST
                          </span>
                        </div>
                        <span className="text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity font-medium">Configure ↵</span>
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
                No integrations matching &quot;{searchQuery}&quot; found.
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
                  Request Integration
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            Section 3: Frequently asked questions
            Matching the 2-column layout from Reference Screenshot
            Left: Large Heading
            Right: Accordion list with circular arrow down/up icons with dual yellow/blue highlights
            ========================================================================= */}
        <section className="relative w-full bg-black select-none">
          <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 2xl:px-28">
            <div className="relative w-full border border-dashed border-white/20 -mt-px overflow-hidden bg-black py-16 sm:py-24 px-6 sm:px-10 md:px-14">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                
                {/* Left Column: Title matching reference screenshot */}
                <div className="lg:col-span-5">
                  <span className="inline-block px-2.5 py-0.5 mb-3 text-[10px] font-mono font-medium rounded bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-wider">
                    Knowledge Base
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-medium text-white tracking-tight leading-[1.08] sticky top-24">
                    Frequently
                    <br />
                    asked questions
                  </h2>
                </div>

                {/* Right Column: Accordion list */}
                <div className="lg:col-span-7 flex flex-col divide-y divide-white/15">
                  {FAQS.map((faq, idx) => {
                    const isOpen = !!openFaqs[idx];
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={idx} className="py-6 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                        >
                          <span
                            className={`text-base sm:text-xl font-medium text-white font-sans pr-2 transition-colors ${
                              isEven
                                ? 'group-hover:text-[#E3EF4F]'
                                : 'group-hover:text-[#38bdf8]'
                            }`}
                          >
                            {faq.q}
                          </span>
                          <span className="shrink-0 mt-0.5">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 flex items-center justify-center transition-all ${
                                isOpen
                                  ? isEven
                                    ? 'bg-[#E3EF4F] border-[#E3EF4F] text-black rotate-180'
                                    : 'bg-[#38bdf8] border-[#38bdf8] text-black rotate-180'
                                  : isEven
                                  ? 'text-white group-hover:border-[#E3EF4F] group-hover:text-[#E3EF4F]'
                                  : 'text-white group-hover:border-[#38bdf8] group-hover:text-[#38bdf8]'
                              }`}
                            >
                              {isOpen ? (
                                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              ) : (
                                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              )}
                            </div>
                          </span>
                        </button>

                        {isOpen && (
                          <div className="mt-4 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl animate-fade-in pr-8">
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

        {/* =========================================================================
            Get Started Section (StartBuildingSection)
            ========================================================================= */}
        <StartBuildingSection
          onOpenContact={onOpenContact}
          onOpenJoin={onOpenJoin}
        />

        {/* =========================================================================
            Footer
            ========================================================================= */}
        <Footer
          onOpenAbout={onOpenAbout}
          onOpenPricing={onOpenPricing}
          onOpenIntegrations={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBYOK={onOpenBYOK}
          onOpenJoin={onOpenJoin}
          onOpenContact={onOpenContact}
          onNavigateHome={onNavigateHome}
        />
      </main>
    </div>
  );
};
