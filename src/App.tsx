import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Define Vanta.NET types
interface VantaNetEffect {
  destroy: () => void;
}
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Users,
  Twitter,
  Linkedin,
  Brain,
  FileCheck,
  AlertTriangle,
  Lock,
  BarChart3,
  CreditCard,
  Lightbulb,
  ArrowRight,
  Facebook,
  Instagram,
  Building,
  ShoppingCart,
  GraduationCap,
  Truck,
  Home,
  Landmark,
} from 'lucide-react';

import { HeroSection } from './components/HeroSection';
import { Features } from './components/Features';
import { DisplayCardsDemo } from './components/DisplayCardsDemo';
import { LogoCarouselDemo } from './components/LogoCarouselDemo';
import { PricingTable } from './components/PricingTable';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';

const Timeline = React.lazy(() => import('./components/Timeline'));


function App() {
  const [isDark, setIsDark] = useState(true);
  // Removed isScrolled state and scroll event listener.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [vantaEffect, setVantaEffect] = useState<VantaNetEffect | null>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 25, 48, 0)', 'rgba(10, 25, 48, 0.9)']
  );


  useEffect(() => {
    let effect: VantaNetEffect | null = null;
    
    const initVanta = async () => {
      try {
        if (!vantaRef.current || vantaEffect) return;
        
        // Dynamically import Vanta to handle potential loading issues
        const NET = await import('vanta/dist/vanta.net.min');
        
        effect = NET.default({
          el: vantaRef.current,
          THREE,
          color: 0x00b4ff,
          backgroundColor: 0x0a1930,
          points: 10,
          maxDistance: 25,
          spacing: 16,
        });
        
        setVantaEffect(effect);
      } catch (error) {
        console.warn('Vanta.js failed to initialize:', error);
        // Fallback: Apply a static gradient background
        if (vantaRef.current) {
          vantaRef.current.style.background = 'linear-gradient(135deg, #0a1930 0%, #1a2332 50%, #0a1930 100%)';
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
      if (effect) {
        try {
          effect.destroy();
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, [vantaEffect]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const products = [
    {
      name: "VortexCore AI",
      description: "Your intelligent assistant for compliance and business solutions",
      icon: Brain,
    },
    {
      name: "VortexComply",
      description: "Compliance-as-a-Service, KYC/KYB, and AML solutions",
      icon: FileCheck,
    },
    {
      name: "VortexRisk",
      description: "AI-driven risk monitoring and analysis",
      icon: AlertTriangle,
    },
    {
      name: "VortexShield",
      description: "Security infrastructure for cross-border safety",
      icon: Lock,
    },
    {
      name: "VortexIQ",
      description: "Business intelligence engine for actionable insights",
      icon: BarChart3,
    },
    {
      name: "VortexPay",
      description: "Instant vendor disbursements and B2B payments",
      icon: CreditCard,
    },
    {
      name: "BizGenie",
      description: "Embedded AI for SME insights and cash flow guidance",
      icon: Lightbulb,
    },
  ];

  const industries = [
    {
      name: "Financial Services & Fintech",
      icon: Building,
      hero: "Reimagining Finance: Intelligent, Compliant, Borderless",
      description: "Power your bank or fintech with VortexCore AI. Instantly onboard clients, automate KYC/KYB/AML, and enable secure cross-border payments—all within a modular, API-driven ecosystem.",
      valueProps: [
        "Seamless, compliant, and intelligent infrastructure for payments, compliance, and risk management",
        "Embedded finance and cross-border B2B payments",
        "AI-driven compliance (KYC, KYB, AML), fraud detection, and dynamic risk profiling",
        "Banking-as-a-Service APIs and RegTech for banks and fintechs"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "SMEs & Business Services",
      icon: Users,
      hero: "Empowering SMEs: Your Growth, Our Genius",
      description: "Meet BizGenie—your AI-powered business co-pilot. Track cash flow, get inventory alerts, and receive smart recommendations to scale.",
      valueProps: [
        "All-in-one platform for vendor verification, payments, working capital, and business intelligence",
        "Embedded AI assistant (BizGenie) for cash flow, inventory, and actionable insights",
        "Tiered onboarding for financial inclusion and growth",
        "Automated compliance and risk management for small businesses"
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "E-commerce & Marketplaces",
      icon: ShoppingCart,
      hero: "E-commerce, Evolved: Fast, Trusted, Global",
      description: "VortexPay delivers instant vendor payouts and multi-currency transfers, while VortexComply automates merchant onboarding and compliance.",
      valueProps: [
        "Instant vendor disbursements, multi-currency payments, and automated compliance",
        "Smart matching of buyers/sellers, dynamic pricing, and procurement optimization",
        "Business intelligence for inventory, sales, and risk management",
        "Seamless marketplace integration with full API support"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Education",
      icon: GraduationCap,
      hero: "Transforming Education: Smart, Secure, Scalable",
      description: "Digital transformation for school management, payments, and compliance with easy onboarding solutions for institutions and students.",
      valueProps: [
        "Digital transformation for school management, payments, and compliance",
        "Easy onboarding and payment solutions for institutions and students",
        "Business intelligence for operational efficiency",
        "Secure student data management and financial tracking"
      ],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Logistics & Transportation",
      icon: Truck,
      hero: "Moving Forward: Intelligent Logistics Solutions",
      description: "Real-time payments, vendor verification, and compliance for logistics providers with fleet management integration.",
      valueProps: [
        "Real-time payments, vendor verification, and compliance for logistics providers",
        "Fleet management integration and secure cross-border settlements",
        "Supply chain optimization with AI-driven insights",
        "Automated documentation and regulatory compliance"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Real Estate",
      icon: Home,
      hero: "Real Estate Reimagined: Secure, Smart, Seamless",
      description: "Secure payment rails, compliance automation, and business intelligence for property transactions with trusted onboarding.",
      valueProps: [
        "Secure payment rails, compliance automation, and business intelligence for property transactions",
        "Trusted onboarding and risk management for real estate professionals",
        "Automated property verification and due diligence",
        "Cross-border investment facilitation with compliance"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Public Sector & NGOs",
      icon: Landmark,
      hero: "Public Innovation: Transparent, Efficient, Impactful",
      description: "Digital compliance, payments, and financial inclusion tools for government and NGOs with secure, scalable infrastructure.",
      valueProps: [
        "Digital compliance, payments, and financial inclusion tools for government and NGOs",
        "Secure, scalable infrastructure for public sector innovation and empowerment",
        "Transparent fund management and impact tracking",
        "Citizen services digitization with AI-powered efficiency"
      ],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
    },
  ];

  const visionPoints = [
    "To build Africa's most intelligent tech ecosystem",
    "To expand globally with secure, compliant, AI-enhanced platforms",
    "To empower businesses and regulators to innovate without borders",
  ];

  const socialTags = [
    "#LanOnasis",
    "#VortexCoreAI",
    "#RiskGPT",
    "#VortexPay",
    "#AfricanTech",
    "#Innovation",
  ];

  const getPageTitle = () => {
    switch (activeSection) {
      case 'industries':
        return 'Industries We Empower | Lan Onasis AI-Powered Solutions';
      default:
        return 'Lan Onasis | AI-Powered African Fintech Solutions Across Industries';
    }
  };

  const getPageDescription = () => {
    switch (activeSection) {
      case 'industries':
        return 'Discover how Lan Onasis transforms Financial Services, SMEs, E-commerce, Education, Logistics, Real Estate & Public Sector with AI-powered fintech solutions across Africa.';
      default:
        return 'Transform your business with Africa\'s leading AI-powered fintech ecosystem. Serving Financial Services, SMEs, E-commerce, Education, Logistics, Real Estate & Public Sector with secure compliance, smart payments, and intelligent risk management solutions.';
    }
  };

  const getPageKeywords = () => {
    switch (activeSection) {
      case 'industries':
        return 'African fintech industries, financial services AI, SME solutions, e-commerce payments, education technology, logistics fintech, real estate payments, public sector innovation, compliance automation, risk management, business intelligence';
      default:
        return 'African fintech, AI technology, compliance automation, risk management, B2B payments, business intelligence, financial services, SME solutions, e-commerce payments, education technology, logistics fintech, real estate payments, public sector innovation';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'industries':
        return (
          <section className="min-h-screen pt-20">
            {/* Industries Hero */}
            <div className="section-padding bg-primary-light">
              <div className="max-w-7xl mx-auto container-padding text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-accent">
                      Industries We Empower
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
                    Transforming sectors across Africa and beyond with intelligent, compliant, and scalable solutions
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Industries Grid */}
            <div className="section-padding">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="space-y-20">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`grid lg:grid-cols-2 gap-12 items-center ${
                        index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                      }`}
                    >
                      <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                            <industry.icon className="w-8 h-8 text-secondary" />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold">{industry.name}</h2>
                        </div>
                        
                        <div className="mb-6 p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                          <h3 className="text-xl font-semibold text-secondary mb-3">{industry.hero}</h3>
                          <p className="text-gray-300 text-lg leading-relaxed">{industry.description}</p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white mb-4">Key Value Propositions:</h4>
                          {industry.valueProps.map((prop, propIndex) => (
                            <motion.div
                              key={propIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: propIndex * 0.1 }}
                              className="flex items-start"
                            >
                              <ChevronRight className="text-secondary mt-1 mr-3 flex-shrink-0" size={16} />
                              <span className="text-gray-400">{prop}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <button className="btn-primary group">
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                      <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                          <img
                            src={industry.image}
                            alt={`${industry.name} solutions by Lan Onasis`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-secondary/20 mix-blend-multiply" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries CTA Section */}
            <div className="section-padding bg-primary-dark">
              <div className="max-w-4xl mx-auto container-padding text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Industry?
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    Join the revolution. Let's build the future of your sector together with AI-powered solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="btn-primary">
                      Schedule a Consultation
                    </button>
                    <button className="btn-secondary">
                      Explore Our Ecosystem
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <>
            <section 
              ref={vantaRef}
              className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1930] via-[#1a2332] to-[#0a1930]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block mb-6 px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20"
                >
                  <span className="text-secondary font-semibold">Introducing VortexCore AI</span>
                </motion.div>

                <motion.h1 
                  className="ai-hero-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span 
                    className="ai-gradient-text ai-glow-effect ai-text-outline"
                    data-text="Powering Africa's Tech Revolution"
                  >
                    Powering Africa's Tech Revolution
                  </span>
                </motion.h1>

                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Building Africa's most intelligent tech ecosystem—empowering entrepreneurs, fintechs, and institutions with secure, compliant, AI‑enhanced platforms
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.button 
                    className="btn-primary flex items-center justify-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Our Ecosystem
                    <motion.span
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight size={20} />
                    </motion.span>
                  </motion.button>
                  
                  <motion.button 
                    className="btn-secondary group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Watch Demo
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  >
                    <ChevronRight size={24} className="transform rotate-90 text-secondary" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-1/4 right-[10%] w-24 h-24 bg-secondary/10 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-[15%] w-32 h-32 bg-accent/10 rounded-full blur-xl"
                animate={{
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </section>

            <section id="vision" className="section-padding bg-primary-light">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[400px] bg-secondary/10 rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                      alt="Digital Innovation and AI Technology"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Vision</h2>
                    <ul className="space-y-4 mb-8">
                      {visionPoints.map((point, index) => (
                        <li key={index}>
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <ChevronRight className="text-secondary mt-1 mr-2" size={20} />
                            <span className="text-lg">{point}</span>
                          </motion.span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-400">
                      Lan Onasis isn't just pivoting—we're redefining modern business systems through innovative technology and forward-thinking solutions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="ecosystem" className="section-padding">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">The Vortex Ecosystem</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    A comprehensive suite of intelligent solutions powering the future of business
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                        <product.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-400">{product.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="story" className="section-padding bg-primary-dark">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Built by Visionaries</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    What began as a quest for consulting excellence evolved into a revolutionary movement.
                  </p>
                </div>

                <Suspense fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                  </div>
                }>
                  <Timeline />
                </Suspense>

                <div className="max-w-4xl mx-auto text-center mt-20">
                  <p className="text-xl leading-relaxed mb-12">
                    From this vision, Lan Onasis was born, fueling the VortexCore revolution and shaping the future of tech.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-12 bg-secondary/10">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="flex flex-wrap justify-center gap-4">
                  {socialTags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-secondary font-semibold text-lg md:text-xl"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* --- New Modern Landing Page Sections --- */}
      <HeroSection />
      <Features />
      <DisplayCardsDemo />
      <LogoCarouselDemo />
      <PricingTable />
      <Testimonials />
      <CallToAction />
      {/* --- End New Sections --- */}
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={getPageKeywords()} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://lanonasis.com/${activeSection === 'home' ? '' : activeSection}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:image" content="https://lanonasis.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Lan Onasis" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lanonasis" />
        <meta name="twitter:creator" content="@lanonasis" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="twitter:image" content="https://lanonasis.com/twitter-image.png" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Lan Onasis" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={`https://lanonasis.com/${activeSection === 'home' ? '' : activeSection}`} />
        
        {/* Industry-specific meta tags for Industries page */}
        {activeSection === 'industries' && (
          <>
            <meta name="industry" content="Financial Technology, Artificial Intelligence, Compliance Technology, Payment Processing, Business Intelligence, E-commerce Solutions, Education Technology, Logistics Technology, Real Estate Technology, Government Technology" />
            <meta name="target-audience" content="Financial Institutions, SMEs, E-commerce Platforms, Educational Institutions, Logistics Companies, Real Estate Firms, Government Agencies, NGOs" />
            <meta name="geo.region" content="Africa" />
            <meta name="geo.placename" content="Africa" />
          </>
        )}
      </Helmet>

      <motion.nav
        style={{ backgroundColor: headerBackground }}
        className="fixed w-full z-50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => handleSectionChange('home')}
                className="text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors"
              >
                Lan Onasis
              </button>
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => handleSectionChange('home')}
                  className={`hover:text-secondary transition-colors ${
                    activeSection === 'home' ? 'text-secondary' : ''
                  }`}
                >
                  Home
                </button>
                <a href="#vision" className="hover:text-secondary transition-colors">Our Vision</a>
                <a href="#ecosystem" className="hover:text-secondary transition-colors">The Ecosystem</a>
                <button
                  onClick={() => handleSectionChange('industries')}
                  className={`hover:text-secondary transition-colors ${
                    activeSection === 'industries' ? 'text-secondary' : ''
                  }`}
                >
                  Industries
                </button>
                <a href="#story" className="hover:text-secondary transition-colors">Our Story</a>
                <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="btn-primary">
                Explore Our Ecosystem
              </button>
            </div>
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-primary/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={() => handleSectionChange('home')}
                  className={`block w-full text-left hover:text-secondary transition-colors ${
                    activeSection === 'home' ? 'text-secondary' : ''
                  }`}
                >
                  Home
                </button>
                <a href="#vision" className="block hover:text-secondary transition-colors">Our Vision</a>
                <a href="#ecosystem" className="block hover:text-secondary transition-colors">The Ecosystem</a>
                <button
                  onClick={() => handleSectionChange('industries')}
                  className={`block w-full text-left hover:text-secondary transition-colors ${
                    activeSection === 'industries' ? 'text-secondary' : ''
                  }`}
                >
                  Industries
                </button>
                <a href="#story" className="block hover:text-secondary transition-colors">Our Story</a>
                <a href="#contact" className="block hover:text-secondary transition-colors">Contact</a>
                <button className="btn-primary w-full">
                  Explore Our Ecosystem
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {renderContent()}

      <footer id="contact" className="bg-primary-darker py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lan Onasis</h3>
              <p className="text-gray-400 mb-4">
                Empowering African businesses through innovative technology solutions across multiple industries.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/lanonasis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://twitter.com/lanonasis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://facebook.com/Lan-Onasis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://linkedin.com/company/the-lan-onasis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-secondary transition-colors">VortexCore AI</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">VortexComply</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">VortexRisk</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">VortexPay</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">BizGenie</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-secondary transition-colors">Financial Services</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">SMEs & Business</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">E-commerce</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Education</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Logistics</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Real Estate</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Public Sector</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-4">
                <p className="text-gray-400">
                  <a 
                    href="https://www.lanonasis.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    www.lanonasis.com
                  </a>
                </p>
                <a 
                  href="mailto:info@lanonasis.com"
                  className="text-gray-400 hover:text-secondary transition-colors block"
                >
                  info@lanonasis.com
                </a>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <button type="submit" className="btn-primary w-full">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lan Onasis. All rights reserved.</p>
            <div className="mt-4 space-x-4 text-sm">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;