/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { PricingModal } from './components/PricingModal.tsx';
import { JoinModal } from './components/JoinModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { AdvisorsMarquee } from './components/AdvisorsMarquee.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { SolutionSection } from './components/SolutionSection.tsx';
import { WhatWillYouBuildSection } from './components/WhatWillYouBuildSection.tsx';
import { RuntimeSection } from './components/RuntimeSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { StartBuildingSection } from './components/StartBuildingSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PricingPage } from './components/PricingPage.tsx';
import { IntegrationsPage } from './components/IntegrationsPage.tsx';
import { BYOKPage } from './components/BYOKPage.tsx';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<
    'home' | 'pricing' | 'integrations' | 'byok'
  >(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/pricing') return 'pricing';
      if (window.location.pathname === '/integrations') return 'integrations';
      if (window.location.pathname === '/byok') return 'byok';
    }
    return 'home';
  });

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        if (window.location.pathname === '/pricing') {
          setCurrentRoute('pricing');
        } else if (window.location.pathname === '/integrations') {
          setCurrentRoute('integrations');
        } else if (window.location.pathname === '/byok') {
          setCurrentRoute('byok');
        } else {
          setCurrentRoute('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: 'home' | 'pricing' | 'integrations' | 'byok') => {
    if (typeof window !== 'undefined') {
      const path =
        route === 'pricing'
          ? '/pricing'
          : route === 'integrations'
          ? '/integrations'
          : route === 'byok'
          ? '/byok'
          : '/';
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentRoute(route);
  };

  // Close any modal with the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAboutOpen(false);
        setIsPricingModalOpen(false);
        setIsJoinOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#0055d4] selection:text-white">
      {/* Stepped Column Wipe Preloader */}
      <Preloader />

      {currentRoute === 'pricing' ? (
        /* Dedicated Full Pricing Page */
        <PricingPage
          onNavigateHome={() => navigateTo('home')}
          onOpenPricing={() => navigateTo('pricing')}
          onOpenIntegrations={() => navigateTo('integrations')}
          onOpenBYOK={() => navigateTo('byok')}
          onOpenJoin={() => setIsJoinOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      ) : currentRoute === 'integrations' ? (
        /* Dedicated Full Integrations Page */
        <IntegrationsPage
          onNavigateHome={() => navigateTo('home')}
          onOpenPricing={() => navigateTo('pricing')}
          onOpenBYOK={() => navigateTo('byok')}
          onOpenJoin={() => setIsJoinOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      ) : currentRoute === 'byok' ? (
        /* Dedicated Full BYOK Page */
        <BYOKPage
          onNavigateHome={() => navigateTo('home')}
          onOpenPricing={() => navigateTo('pricing')}
          onOpenIntegrations={() => navigateTo('integrations')}
          onOpenBYOK={() => navigateTo('byok')}
          onOpenJoin={() => setIsJoinOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      ) : (
        /* Main Home Page */
        <>
          {/* Top Navigation Bar */}
          <Navbar
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenIntegrations={() => navigateTo('integrations')}
            onOpenPricing={() => navigateTo('pricing')}
            onOpenBYOK={() => navigateTo('byok')}
            onOpenJoin={() => setIsJoinOpen(true)}
            onNavigateHome={() => navigateTo('home')}
            isPricingActive={false}
            isIntegrationsActive={false}
            isBYOKActive={false}
          />

          {/* Main Hero Container & Content Sections */}
          <main className="flex-1 flex flex-col justify-start">
            <HeroSection
              onOpenJoin={() => setIsJoinOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
            <AdvisorsMarquee />
            <ProblemSection onOpenJoin={() => setIsJoinOpen(true)} />
            <SolutionSection onOpenJoin={() => setIsJoinOpen(true)} />

            {/* What will you build Section */}
            <WhatWillYouBuildSection
              onOpenJoin={() => setIsJoinOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* How Roow Works Section */}
            <RuntimeSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Start Building Section */}
            <StartBuildingSection
              onOpenContact={() => setIsContactOpen(true)}
              onOpenJoin={() => setIsJoinOpen(true)}
            />

            {/* Footer */}
            <Footer
              onOpenAbout={() => setIsAboutOpen(true)}
              onOpenPricing={() => navigateTo('pricing')}
              onOpenIntegrations={() => navigateTo('integrations')}
              onOpenBYOK={() => navigateTo('byok')}
              onOpenJoin={() => setIsJoinOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          </main>
        </>
      )}

      {/* Modals for Functional Interaction */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenEnterprise={() => {
          setIsAboutOpen(false);
          setIsPricingModalOpen(true);
        }}
      />
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onOpenContact={() => {
          setIsPricingModalOpen(false);
          setIsContactOpen(true);
        }}
      />
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
