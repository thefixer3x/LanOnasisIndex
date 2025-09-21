import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { HeroSection } from './components/HeroSection';
import { Features } from './components/Features';
import { DisplayCardsDemo } from './components/DisplayCardsDemo';
import { LogoCarouselDemo } from './components/LogoCarouselDemo';
import { PricingTable } from './components/PricingTable';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AuthPage } from './components/auth/AuthPage';
import { PlatformServices } from './components/PlatformServices';
import Timeline from './components/Timeline';
import { Industries } from './components/Industries';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Simple routing based on hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'auth' || hash === 'login' || hash === 'signup') {
        setCurrentPage('auth');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show auth page if routed to auth
  if (currentPage === 'auth') {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
        <meta name="keywords" content="African fintech, AI technology, compliance automation, risk management, B2B payments, business intelligence" />
      </Helmet>

      {/* Navigation */}
      <nav className="nav-fixed">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-secondary">Lan Onasis</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.features')}</a>
              <a href="#industries" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.industries')}</a>
              <a href="#platform-services" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.services')}</a>
              <a href="#ecosystem" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.ecosystem')}</a>
              <a href="#story" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.story')}</a>
              <a href="#pricing" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.pricing')}</a>
              <a href="#testimonials" className="text-gray-300 hover:text-secondary transition-colors duration-300">{t('navigation.testimonials')}</a>
              <a href="#auth" className="text-gray-300 hover:text-secondary transition-colors duration-300">Sign In</a>
              <a href="https://dashboard.LanOnasis.com/" className="btn-primary text-sm">{t('navigation.get_started')}</a>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Open mobile menu"
                title="Open mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Platform Features */}
        <section id="features">
          <Features />
        </section>
        
        {/* Platform Services */}
        <PlatformServices />

        {/* Industries */}
        <Industries />

        {/* Platform Demo */}
        <DisplayCardsDemo />
        
        {/* Logo Carousel */}
        <section id="ecosystem">
          <LogoCarouselDemo />
        </section>

        {/* Pricing */}
        <section id="pricing">
          <PricingTable />
        </section>

        {/* Story */}
        <section id="story" className="py-20 bg-gradient-to-b from-slate-900 to-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                {t('story_section.title')}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t('story_section.subtitle')}
              </p>
            </div>
            <Timeline />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <Testimonials />
        </section>
        
        {/* Call to Action */}
        <CallToAction />
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-secondary mb-4">{t('app.name')}</h3>
              <p className="text-gray-400 mb-4">
                {t('footer.company_description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.social_links.linkedin')}</a>
                <a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.social_links.twitter')}</a>
                <a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.social_links.github')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.platform_section')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.platform_links.vortexcore_ai')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.platform_links.vortexpay')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.platform_links.bizgenie')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.platform_links.api_gateway')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.resources_section')}</h4>
              <ul className="space-y-2">
                <li><a href="https://docs.LanOnasis.com" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.resource_links.documentation')}</a></li>
                <li><a href="https://dashboard.LanOnasis.com" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.resource_links.dashboard')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.resource_links.support')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">{t('footer.resource_links.contact')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
