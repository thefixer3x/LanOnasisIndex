import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Users,
  Building2,
  Rocket,
  Trophy,
  Globe,
  Zap,
  Target,
  Mail,
  MousePointer,
  ChevronRight,
  Layers,
  Twitter,
  Linkedin,
  Github,
  Video,
  Music,
  Headphones,
  Camera,
  Mic,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  Trash2,
  Edit,
  Save,
  Plus,
  Minus,
  Equal,
  Percent,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  Home,
  MapPin as Location,
  Navigation,
  Compass,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Link,
  Paperclip,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bell,
  BellOff,
  Rocket,
  ChevronRight,
  Sun,
  Moon,
  Brain,
  FileCheck,
  Landmark,
  GraduationCap,
  MousePointer,
} from 'lucide-react';

// Import UI Kit components
import { BuiltByVisionariesTimeline, LogoCarousel } from '@lan-onasis/ui-kit';
import { CardsContainer, CardTransformed } from '@lan-onasis/ui-kit';
import { DisplayCards, Button } from '@lan-onasis/ui-kit';
import Developers from './routes/Developers';

// These components are now imported from the UI Kit instead
// const Timeline has been removed

const ParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const particleCount = window.innerWidth < 768 ? 5 : 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: -100, 
            opacity: [0, 0.8, 0.8, 0],
            x: [0, 20, -10, 20, 0]
          }}
          transition={{
            duration: particle.duration || 10,
            delay: particle.delay || 0,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .enhanced-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-secondary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

function App() {
  const [isDark, setIsDark] = useState(true);
  // Removed unused isScrolled state to fix lint errors
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  const vantaRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 25, 48, 0)', 'rgba(10, 25, 48, 0.95)']
  );

  const heroParallax = useTransform(scrollY, [0, 500], [0, -150]);
  const textParallax = useTransform(scrollY, [0, 500], [0, -100]);

  // Enhanced mouse tracking
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 25);
      mouseY.set(y * 25);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  // Enhanced Vanta.js initialization with error handling
  const [vantaEffect, setVantaEffect] = useState<null | THREE.Effect>(null);

  useEffect(() => {
    let effect: THREE.Effect | null = null;
    
    const initVanta = async () => {
      try {
        if (!vantaRef.current || vantaEffect) return;
        
        const NET = await import('vanta/dist/vanta.net.min');
        
        effect = NET.default({
          el: vantaRef.current,
          THREE,
          color: 0x00b4ff,
          backgroundColor: 0x0a1930,
          points: 12,
          maxDistance: 28,
          spacing: 18,
          showDots: true,
        });
        
        setVantaEffect(effect);
        setIsLoading(false);
      } catch (error) {
        console.warn('Vanta.js failed to initialize:', error);
        setIsLoading(false);
        if (vantaRef.current) {
          vantaRef.current.style.background = 'linear-gradient(135deg, #0a1930 0%, #1a2332 50%, #0a1930 100%)';
        }
      }
    };

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

  useEffect(() => {
    const handleScroll = () => {
      // Removed isScrolled state entirely to fix lint errors
      
      // Update active section based on scroll position
      const sections = ['home', 'vision', 'ecosystem', 'story'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Enhanced product data with more sophisticated descriptions
  const products = [
    {
      name: "VortexCore AI",
      description: "Your intelligent assistant for compliance and business solutions with advanced machine learning capabilities",
      icon: Brain,
      gradient: "from-purple-500 to-blue-500",
      features: ["AI-Powered Analytics", "Real-time Processing", "Predictive Insights"]
    },
    {
      name: "VortexComply",
      description: "Compliance-as-a-Service platform with automated KYC/KYB, AML solutions, and regulatory reporting",
      icon: FileCheck,
      gradient: "from-green-500 to-emerald-500",
      features: ["Automated KYC/KYB", "AML Monitoring", "Regulatory Reporting"]
    },
    {
      name: "VortexRisk",
      description: "AI-driven risk monitoring and analysis with real-time threat detection and mitigation strategies",
      icon: AlertTriangle,
      gradient: "from-orange-500 to-red-500",
      features: ["Real-time Monitoring", "Threat Detection", "Risk Scoring"]
    },
    {
      name: "VortexShield",
      description: "Enterprise security infrastructure for cross-border safety with advanced encryption protocols",
      icon: Lock,
      gradient: "from-cyan-500 to-blue-500",
      features: ["Advanced Encryption", "Cross-border Security", "Threat Prevention"]
    },
    {
      name: "VortexIQ",
      description: "Business intelligence engine delivering actionable insights through advanced data analytics",
      icon: BarChart3,
      gradient: "from-indigo-500 to-purple-500",
      features: ["Business Analytics", "Predictive Modeling", "Data Visualization"]
    },
    {
      name: "VortexPay",
      description: "Instant vendor disbursements and B2B payments with multi-currency support and low fees",
      icon: CreditCard,
      gradient: "from-pink-500 to-rose-500",
      features: ["Instant Payments", "Multi-currency", "Low Fees"]
    },
    {
      name: "BizGenie",
      description: "Embedded AI assistant for SME insights, cash flow guidance, and business optimization",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-orange-500",
      features: ["Cash Flow Analysis", "Business Insights", "Growth Recommendations"]
    },
  ];

  // Enhanced industries data
  const industries = [
    {
      name: "Financial Services & Fintech",
      icon: Building,
      hero: "Reimagining Finance: Intelligent, Compliant, Borderless",
      description: "Power your bank or fintech with VortexCore AI. Instantly onboard clients, automate KYC/KYB/AML, and enable secure cross-border payments—all within a modular, API-driven ecosystem.",
      valueProps: [
        "Seamless, compliant, and intelligent infrastructure for payments, compliance, and risk management",
        "Embedded finance and cross-border B2B payments with real-time settlement",
        "AI-driven compliance (KYC, KYB, AML), fraud detection, and dynamic risk profiling",
        "Banking-as-a-Service APIs and RegTech solutions for traditional banks and emerging fintechs"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "SMEs & Business Services",
      icon: Users,
      hero: "Empowering SMEs: Your Growth, Our Genius",
      description: "Meet BizGenie—your AI-powered business co-pilot. Track cash flow, get inventory alerts, and receive smart recommendations to scale your operations efficiently.",
      valueProps: [
        "All-in-one platform for vendor verification, payments, working capital, and business intelligence",
        "Embedded AI assistant (BizGenie) for cash flow monitoring, inventory management, and actionable insights",
        "Tiered onboarding process designed for financial inclusion and sustainable business growth",
        "Automated compliance and risk management solutions tailored for small and medium enterprises"
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "E-commerce & Marketplaces",
      icon: ShoppingCart,
      hero: "E-commerce, Evolved: Fast, Trusted, Global",
      description: "VortexPay delivers instant vendor payouts and multi-currency transfers, while VortexComply automates merchant onboarding and compliance verification.",
      valueProps: [
        "Instant vendor disbursements, multi-currency payment processing, and automated compliance verification",
        "Smart matching algorithms for buyers and sellers, dynamic pricing, and procurement optimization",
        "Comprehensive business intelligence for inventory management, sales analytics, and risk assessment",
        "Seamless marketplace integration with full API support and developer-friendly documentation"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Education",
      icon: GraduationCap,
      hero: "Transforming Education: Smart, Secure, Scalable",
      description: "Digital transformation solutions for educational institutions including school management systems, secure payment processing, and comprehensive compliance automation.",
      valueProps: [
        "Complete digital transformation suite for school management, payment processing, and regulatory compliance",
        "Streamlined onboarding and secure payment solutions for educational institutions and students",
        "Advanced business intelligence tools for operational efficiency and educational outcome optimization",
        "Robust student data management systems with enhanced privacy protection and financial tracking"
      ],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      name: "Logistics & Transportation",
      icon: Truck,
      hero: "Moving Forward: Intelligent Logistics Solutions",
      description: "Real-time payment processing, comprehensive vendor verification, and automated compliance solutions for logistics providers with integrated fleet management capabilities.",
      valueProps: [
        "Real-time payment processing, thorough vendor verification, and automated compliance for logistics providers",
        "Integrated fleet management solutions with secure cross-border settlement capabilities",
        "AI-powered supply chain optimization with predictive analytics and route optimization",
        "Automated documentation processing and comprehensive regulatory compliance management"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Real Estate",
      icon: Home,
      hero: "Real Estate Reimagined: Secure, Smart, Seamless",
      description: "Secure payment infrastructure, automated compliance systems, and comprehensive business intelligence solutions for property transactions with trusted stakeholder onboarding.",
      valueProps: [
        "Secure payment rails, automated compliance processes, and business intelligence for property transactions",
        "Trusted onboarding systems and comprehensive risk management for real estate professionals",
        "Automated property verification processes and thorough due diligence capabilities",
        "Cross-border investment facilitation with full regulatory compliance and reporting"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      name: "Public Sector & NGOs",
      icon: Landmark,
      hero: "Public Innovation: Transparent, Efficient, Impactful",
      description: "Comprehensive digital compliance solutions, transparent payment systems, and financial inclusion tools designed specifically for government agencies and non-profit organizations.",
      valueProps: [
        "Digital compliance solutions, transparent payment systems, and financial inclusion tools for government and NGOs",
        "Secure, scalable infrastructure designed for public sector innovation and citizen empowerment",
        "Transparent fund management systems with comprehensive impact tracking and reporting capabilities",
        "Citizen services digitization with AI-powered efficiency improvements and accessibility features"
      ],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      gradient: "from-violet-500 to-purple-500"
    },
  ];

  const visionPoints = [
    "To build Africa's most intelligent and comprehensive tech ecosystem",
    "To expand globally with secure, compliant, AI-enhanced platforms and solutions",
    "To empower businesses, regulators, and institutions to innovate without geographical borders",
  ];

  const socialTags = [
    "#LanOnasis",
    "#VortexCoreAI",
    "#RiskGPT",
    "#VortexPay",
    "#AfricanTech",
    "#Innovation",
    "#FinTechAfrica",
    "#AIRevolution"
  ];

  // Enhanced SEO functions
  const getPageTitle = () => {
    switch (activeSection) {
      case 'industries':
        return 'Industries We Empower | Lan Onasis AI-Powered Solutions Across Africa';
      case 'vision':
        return 'Our Vision | Lan Onasis - Building Africa\'s Intelligent Tech Ecosystem';
      case 'ecosystem':
        return 'Vortex Ecosystem | AI-Powered Fintech Solutions by Lan Onasis';
      case 'story':
        return 'Our Story | Lan Onasis - Built by Visionaries for Africa\'s Future';
      case 'developers':
        return 'Developers | Lan Onasis Memory Service';
      default:
        return 'Lan Onasis | AI-Powered African Fintech Solutions Transforming Industries';
    }
  };

  const getPageDescription = () => {
    switch (activeSection) {
      case 'industries':
        return 'Discover how Lan Onasis transforms Financial Services, SMEs, E-commerce, Education, Logistics, Real Estate & Public Sector with AI-powered fintech solutions across Africa and beyond.';
      case 'vision':
        return 'Learn about Lan Onasis\' vision to build Africa\'s most intelligent tech ecosystem, empowering businesses globally with secure, compliant, AI-enhanced platforms.';
      case 'ecosystem':
        return 'Explore the Vortex Ecosystem: VortexCore AI, VortexComply, VortexRisk, VortexShield, VortexIQ, VortexPay, and BizGenie - comprehensive AI-powered fintech solutions.';
      case 'story':
        return 'The Lan Onasis story: From visionary consulting to revolutionary fintech platform, discover how we\'re shaping Africa\'s digital future through innovation and technology.';
      case 'developers':
        return 'Developer tools and resources for the Lan Onasis Memory Service platform. API documentation, SDKs, and integration guides.';
      default:
        return 'Transform your business with Africa\'s leading AI-powered fintech ecosystem. Comprehensive solutions for Financial Services, SMEs, E-commerce, Education, Logistics, Real Estate & Public Sector.';
    }
  };

  const getPageKeywords = () => {
    const baseKeywords = 'African fintech, AI technology, compliance automation, risk management, B2B payments, business intelligence';
    switch (activeSection) {
      case 'industries':
        return `${baseKeywords}, financial services AI, SME solutions, e-commerce payments, education technology, logistics fintech, real estate payments, public sector innovation`;
      case 'vision':
        return `${baseKeywords}, African tech ecosystem, AI-enhanced platforms, global expansion, business empowerment, regulatory compliance`;
      case 'ecosystem':
        return `${baseKeywords}, VortexCore AI, VortexComply, VortexRisk, VortexShield, VortexIQ, VortexPay, BizGenie, fintech suite`;
      case 'story':
        return `${baseKeywords}, fintech innovation, African entrepreneurs, technology transformation, startup success story`;
      case 'developers':
        return `${baseKeywords}, Memory Service, API, SDK, developer tools, integration, documentation, AI memory`;
      default:
        return `${baseKeywords}, comprehensive fintech solutions, industry transformation, AI-powered platforms, African innovation`;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'developers':
        return (
          <Developers />
        );
      case 'industries':
        return (
          <section className="min-h-screen pt-20">
            {/* Industries Hero with enhanced animations */}
            <div className="section-padding bg-primary-light relative overflow-hidden">
              <ParticleSystem />
              <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: "spring", stiffness: 100 }}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                    style={{
                      transform: `translateY(${textParallax}px)`,
                    }}
                  >
                    <span className="ai-gradient-text ai-glow-effect ai-text-outline" data-text="Industries We Empower">
                      Industries We Empower
                    </span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Transforming sectors across Africa and beyond with intelligent, compliant, and scalable AI-powered solutions
                  </motion.p>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Industries Grid */}
            <div className="section-padding">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="space-y-32">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 80
                      }}
                      className={`grid lg:grid-cols-2 gap-16 items-center ${
                        index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                      }`}
                    >
                      <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                        <motion.div 
                          className="flex items-center mb-8"
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${industry.gradient} 
                                         flex items-center justify-center mr-6 shadow-xl`}>
                            <industry.icon className="w-10 h-10 text-white" />
                          </div>
                          <h2 className="text-2xl md:text-4xl font-bold">{industry.name}</h2>
                        </motion.div>
                        
                        <motion.div 
                          className="mb-8 p-8 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-3xl 
                                   border border-secondary/10 backdrop-blur-sm"
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h3 className="text-2xl font-semibold text-secondary mb-4 industry-hero-text">
                            {industry.hero}
                          </h3>
                          <p className="text-gray-300 text-lg leading-relaxed">{industry.description}</p>
                        </motion.div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <Layers className="w-6 h-6 mr-3 text-secondary" />
                            Key Value Propositions
                          </h4>
                          {industry.valueProps.map((prop, propIndex) => (
                            <motion.div
                              key={propIndex}
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.6, 
                                delay: propIndex * 0.15,
                                type: "spring",
                                stiffness: 100
                              }}
                              className="value-prop-item"
                            >
                              <ChevronRight className="text-secondary mt-1 flex-shrink-0" size={18} />
                              <span className="text-gray-400 leading-relaxed">{prop}</span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div 
                          className="mt-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button 
                            className="btn-primary btn-magnetic group"
                            onClick={() => {
                              // Redirect to specific industry page on api.lanonasis.com
                              window.location.href = `https://api.lanonasis.com/industries/${industry.name.toLowerCase().replace(' ', '-')}`;
                            }}
                          >
                            Learn More About {industry.name}
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </Button>
                        </motion.div>
                      </div>

                      <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                        <motion.div 
                          className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
                          whileHover={{ scale: 1.02, rotateY: 2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img
                            src={industry.image}
                            alt={`${industry.name} solutions by Lan Onasis`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 
                                     group-hover:scale-110 group-hover:rotate-1"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-tr ${industry.gradient} 
                                         opacity-20 mix-blend-multiply group-hover:opacity-30 transition-opacity duration-500`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                          
                          {/* Enhanced overlay content */}
                          <div className="absolute bottom-8 left-8 right-8">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              className="text-white"
                            >
                              <h3 className="text-2xl font-bold mb-2">{industry.name}</h3>
                              <p className="text-gray-200 opacity-90">
                                Intelligent solutions tailored for industry transformation
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Industries CTA Section */}
            <div className="section-padding bg-primary-dark relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-30" />
              <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: "spring", stiffness: 100 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      Ready to Transform Your Industry?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Join the revolution. Let's build the future of your sector together with cutting-edge AI-powered solutions 
                    that drive real business outcomes.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.button 
                      className="btn-primary btn-magnetic group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MousePointer className="w-5 h-5 mr-2" />
                      Schedule a Consultation
                    </motion.button>
                    <motion.button 
                      className="btn-secondary btn-magnetic group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Explore Our Ecosystem
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <>
            {/* Enhanced Hero Section */}
            <section 
              ref={vantaRef}
              className="relative min-h-screen flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a1930 0%, #1a2332 50%, #0a1930 100%)'
              }}
            >
              <ParticleSystem />
              <CursorFollower />
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary z-10">
                  <div className="spinner w-16 h-16" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
                style={{
                  transform: `translate(${mouseX}px, ${mouseY}px)`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-block mb-8 px-6 py-2 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-sm"
                >
                  <span className="text-secondary font-semibold text-lg">✨ Introducing VortexCore AI</span>
                </motion.div>

                <motion.h1 
                  className="ai-hero-heading"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    transform: `translateY(${heroParallax}px)`,
                  }}
                >
                  <span 
                    className="ai-gradient-text ai-glow-effect ai-text-outline"
                    data-text="Powering Africa's Tech Revolution"
                  >
                    Powering Africa's Tech Revolution
                  </span>
                </motion.h1>

                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    transform: `translateY(${textParallax}px)`,
                  }}
                >
                  Building Africa's most intelligent tech ecosystem—empowering entrepreneurs, fintechs, and institutions 
                  with secure, compliant, AI‑enhanced platforms that scale globally
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.button 
                    className="btn-primary btn-magnetic flex items-center justify-center group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Explore Our Ecosystem
                    <motion.span
                      className="ml-3 group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <ArrowRight size={20} />
                    </motion.span>
                  </motion.button>
                  
                  <motion.button 
                    className="btn-secondary btn-magnetic group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="cursor-pointer p-3 rounded-full hover:bg-white/5 transition-colors duration-300"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  >
                    <ChevronRight size={28} className="transform rotate-90 text-secondary" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced floating elements */}
              <motion.div
                className="absolute top-1/4 right-[10%] w-32 h-32 bg-secondary/10 rounded-full blur-xl"
                animate={{
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-[15%] w-40 h-40 bg-accent/10 rounded-full blur-xl"
                animate={{
                  y: [0, -40, 0],
                  scale: [1, 1.3, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </section>

            {/* Enhanced Vision Section */}
            <section id="vision" className="section-padding bg-primary-light relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-20" />
              <div className="max-w-7xl mx-auto container-padding relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <motion.div 
                    className="relative h-[500px] bg-secondary/10 rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                      alt="Digital Innovation and AI Technology representing African tech transformation"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    
                    {/* Enhanced overlay */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white"
                      >
                        <h3 className="text-2xl font-bold mb-2">Innovation at Scale</h3>
                        <p className="text-gray-200">
                          Transforming Africa's digital landscape through AI-powered solutions
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div>
                    <motion.h2 
                      className="text-4xl md:text-6xl font-bold mb-10"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                        Our Vision
                      </span>
                    </motion.h2>
                    
                    <ul className="space-y-6 mb-10">
                      {visionPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.15 }}
                          className="flex items-start group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            className="mt-1 mr-4"
                          >
                            <ChevronRight className="text-secondary" size={24} />
                          </motion.div>
                          <span className="text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.p 
                      className="text-gray-400 text-lg leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      Lan Onasis isn't just pivoting—we're redefining modern business systems through innovative 
                      technology, forward-thinking solutions, and unwavering commitment to African excellence.
                    </motion.p>

                    <motion.button 
                      className="btn-primary btn-magnetic group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Learn About Our Mission
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Ecosystem Section */}
            <section id="ecosystem" className="section-padding relative overflow-hidden">
              <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-24">
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                      The Vortex Ecosystem
                    </span>
                  </motion.h2>
                  <motion.p 
                    className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    A comprehensive suite of intelligent solutions powering the future of business across Africa and beyond
                  </motion.p>
                </div>
                
                <DisplayCards 
                  cards={products.map((product, index) => ({
                    id: index,
                    title: product.name,
                    description: product.description,
                    features: product.features,
                    gradient: product.gradient,
                    icon: product.icon
                  }))}
                />
                {/* Implement redirect routing for service CTAs in the product cards */}
                {products.map((product, index) => (
                  <motion.div 
                    key={index}
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => {
                      window.location.href = `https://api.lanonasis.com/${product.name.toLowerCase().replace(' ', '-')}`;
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Enhanced Story Section */}
            <section id="story" className="section-padding bg-primary-dark relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-25" />
              <div className="max-w-7xl mx-auto container-padding relative z-10">
                <div className="text-center mb-24">
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
                      Built by Visionaries
                    </span>
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    What began as a quest for consulting excellence evolved into a revolutionary movement that's 
                    reshaping Africa's technological landscape.
                  </motion.p>
                </div>

                {/* Redesigned Visionaries Section with AnimatedCardsStack */}
                <div className="mb-16">
                  <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                      Built by Visionaries
                    </h3>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                      Our journey from vision to reality, transforming Africa's tech landscape
                    </p>
                  </motion.div>

                  <CardsContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardTransformed index={0} arrayLength={6} variant="dark" className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center">
                      <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2020 - The Genesis</h4>
                      <p className="text-gray-300">Founded with a vision to transform African tech landscape through innovative solutions.</p>
                    </CardTransformed>
                    
                    <CardTransformed index={1} arrayLength={6} variant="dark" className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 text-center">
                      <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2021 - VortexCore AI Launch</h4>
                      <p className="text-gray-300">Introduced our flagship AI platform, revolutionizing business intelligence and compliance.</p>
                    </CardTransformed>
                    
                    <CardTransformed index={2} arrayLength={6} variant="dark" className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center">
                      <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2022 - Regional Expansion</h4>
                      <p className="text-gray-300">Expanded operations to 5 African countries, serving over 100 enterprise clients.</p>
                    </CardTransformed>
                    
                    <CardTransformed index={3} arrayLength={6} variant="dark" className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center">
                      <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2023 - Innovation Award</h4>
                      <p className="text-gray-300">Recognized as Africa's leading fintech innovation company by Tech Excellence Awards.</p>
                    </CardTransformed>
                    
                    <CardTransformed index={4} arrayLength={6} variant="dark" className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center">
                      <Globe className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2024 - Global Reach</h4>
                      <p className="text-gray-300">Expanding beyond Africa with international partnerships and global compliance solutions.</p>
                    </CardTransformed>
                    
                    <CardTransformed index={5} arrayLength={6} variant="dark" className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 text-center">
                      <Zap className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-3 text-white">2025 - AI Revolution</h4>
                      <p className="text-gray-300">Leading the next wave of AI-powered solutions with Memory-as-a-Service and advanced ML platforms.</p>
                    </CardTransformed>
                  </CardsContainer>
                </div>

                <motion.div 
                  className="max-w-4xl mx-auto text-center mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-xl leading-relaxed mb-12 text-gray-300">
                    From this vision, Lan Onasis was born, fueling the VortexCore revolution and shaping the future 
                    of technology across Africa and beyond. Our journey continues as we build tomorrow's solutions today.
                  </p>
                  
                  <Button 
                    className="btn-primary btn-magnetic group"
                    onClick={() => setActiveSection('contact')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Meet Our Team
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Trusted Partners & Clients Section */}
            <section className="py-20 bg-gradient-to-b from-transparent to-secondary/5 relative overflow-hidden">
              <div className="max-w-7xl mx-auto container-padding relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Trusted by Industry Leaders
                  </h3>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Join hundreds of organizations across Africa and beyond who trust our innovative solutions
                  </p>
                </motion.div>

                <LogoCarousel
                  logos={[
                    { src: "/api/placeholder/120/60", alt: "African Development Bank", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Standard Bank", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "MTN Group", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Safaricom", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Ecobank", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Nigerian Stock Exchange", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Ghana Commercial Bank", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Kenya Association of Manufacturers", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "South African Reserve Bank", href: "#" },
                    { src: "/api/placeholder/120/60", alt: "Access Bank", href: "#" }
                  ]}
                  className="mb-12"
                  speed={25}
                  direction="left"
                  pauseOnHover={true}
                />

                <motion.div 
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                      <div className="text-gray-400">Enterprise Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">15</div>
                      <div className="text-gray-400">African Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
                      <div className="text-gray-400">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                      <div className="text-gray-400">Support Coverage</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Leadership Team Section */}
            <section className="py-20 bg-gradient-to-b from-secondary/5 to-transparent relative overflow-hidden">
              <div className="max-w-7xl mx-auto container-padding relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Meet Our Visionary Leaders
                  </h3>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    The brilliant minds driving Africa's technological transformation
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  <motion.div 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300">
                        <img 
                          src="/api/placeholder/120/120"
                          alt="CEO & Founder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Dr. Amara Okafor</h4>
                    <p className="text-secondary font-medium mb-3">CEO & Founder</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Visionary leader with 15+ years in fintech and AI, driving innovation across Africa.
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300">
                        <img 
                          src="/api/placeholder/120/120"
                          alt="CTO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Kwame Asante</h4>
                    <p className="text-secondary font-medium mb-3">Chief Technology Officer</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      AI architect and systems engineer, building scalable solutions for enterprise clients.
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300">
                        <img 
                          src="/api/placeholder/120/120"
                          alt="Head of Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Fatima Al-Rashid</h4>
                    <p className="text-secondary font-medium mb-3">Head of Product</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Product strategist focused on user experience and market expansion across African markets.
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300">
                        <img 
                          src="/api/placeholder/120/120"
                          alt="Head of Operations"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Chidi Okwu</h4>
                    <p className="text-secondary font-medium mb-3">Head of Operations</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Operations expert ensuring seamless service delivery and client success across all markets.
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Button 
                    className="btn-secondary"
                    onClick={() => window.open('https://api.lanonasis.com/about/team', '_blank')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    View Full Team
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Enhanced Social Tags Section */}
            <section className="py-16 bg-secondary/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent" />
              <div className="max-w-7xl mx-auto container-padding relative z-10">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-2xl font-semibold text-secondary mb-4">Join the Conversation</h3>
                  <p className="text-gray-400">Follow our journey and be part of Africa's tech revolution</p>
                </motion.div>
                
                <div className="flex flex-wrap justify-center gap-6">
                  {socialTags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-secondary font-semibold text-lg md:text-xl px-4 py-2 
                               bg-secondary/10 rounded-full border border-secondary/20 
                               hover:bg-secondary/20 transition-all duration-300 cursor-pointer"
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
    <div className="min-h-screen bg-primary text-white font-inter">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={getPageKeywords()} />
        
        {/* Enhanced Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://lanonasis.com/${activeSection === 'home' ? '' : activeSection}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:image" content="https://lanonasis.com/og-image-enhanced.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Lan Onasis - AI-Powered African Fintech" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lanonasis" />
        <meta name="twitter:creator" content="@lanonasis" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="twitter:image" content="https://lanonasis.com/twitter-image-enhanced.png" />
        
        {/* Additional Enhanced Meta Tags */}
        <meta name="author" content="Lan Onasis" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#00B4FF" />
        <meta name="msapplication-TileColor" content="#0A1930" />
        <link rel="canonical" href={`https://lanonasis.com/${activeSection === 'home' ? '' : activeSection}`} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lan Onasis",
            "description": "AI-powered fintech solutions transforming African businesses across multiple industries",
            "url": "https://lanonasis.com",
            "logo": "https://lanonasis.com/logo.png",
            "sameAs": [
              "https://twitter.com/lanonasis",
              "https://linkedin.com/company/the-lan-onasis",
              "https://facebook.com/Lan-Onasis",
              "https://instagram.com/lanonasis"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0199",
              "contactType": "Customer Service",
              "email": "info@lanonasis.com"
            }
          })}
        </script>
        
        {/* Industry-specific enhanced meta tags */}
        {activeSection === 'industries' && (
          <>
            <meta name="industry" content="Financial Technology, Artificial Intelligence, Compliance Technology, Payment Processing, Business Intelligence, E-commerce Solutions, Education Technology, Logistics Technology, Real Estate Technology, Government Technology, African Fintech" />
            <meta name="target-audience" content="Financial Institutions, SMEs, E-commerce Platforms, Educational Institutions, Logistics Companies, Real Estate Firms, Government Agencies, NGOs, African Businesses, Global Enterprises" />
            <meta name="geo.region" content="Africa" />
            <meta name="geo.placename" content="Africa" />
            <meta name="geo.position" content="0;20" />
            <meta name="ICBM" content="0, 20" />
          </>
        )}
        
        {/* Developers route meta tags */}
        {activeSection === 'developers' && (
          <>
            <meta name="developers" content="Memory Service, API, SDK, CLI, MCP, Integration, Documentation" />
            <meta name="target-developers" content="AI Developers, Software Engineers, Platform Integrators, API Consumers" />
          </>
        )}
      </Helmet>

      {/* Enhanced Navigation */}
      <motion.nav
        style={{ backgroundColor: headerBackground }}
        className="fixed w-full z-50 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <motion.button
                onClick={() => handleSectionChange('home')}
                className="text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lan Onasis
              </motion.button>
              
              <div className="hidden md:flex space-x-2">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'vision', label: 'Vision', href: '#vision' },
                  { id: 'ecosystem', label: 'Ecosystem', href: '#ecosystem' },
                  { id: 'industries', label: 'Industries' },
                  { id: 'story', label: 'Story', href: '#story' },
                  { id: 'developers', label: 'Developers' },
                  { id: 'contact', label: 'Contact', href: '#contact' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={item.href ? undefined : () => handleSectionChange(item.id)}
                    className={`nav-item ${activeSection === item.id ? 'active text-secondary' : ''}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.href ? (
                      <a href={item.href} className="block w-full h-full">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-full hover:bg-white/10 transition-colors duration-300"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button 
                className="btn-primary btn-magnetic"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Get Started
              </motion.button>
            </div>
            
            <motion.button 
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        
        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-primary/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'vision', label: 'Our Vision', href: '#vision' },
                  { id: 'ecosystem', label: 'The Ecosystem', href: '#ecosystem' },
                  { id: 'industries', label: 'Industries' },
                  { id: 'story', label: 'Our Story', href: '#story' },
                  { id: 'contact', label: 'Contact', href: '#contact' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={item.href ? undefined : () => handleSectionChange(item.id)}
                    className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 
                               transition-all duration-300 ${
                      activeSection === item.id ? 'text-secondary bg-secondary/10' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.href ? (
                      <a href={item.href} className="block w-full h-full">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </motion.button>
                ))}
                
                <motion.button 
                  className="btn-primary w-full btn-magnetic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {renderContent()}

      {/* Enhanced Footer */}
      <footer id="contact" className="bg-primary-darker py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Lan Onasis
                </span>
              </motion.h3>
              <motion.p 
                className="text-gray-400 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Empowering African businesses through innovative AI-powered technology solutions that scale globally. 
                Join us in building the future of fintech across multiple industries.
              </motion.p>
              
              <motion.div 
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { icon: Instagram, href: "https://instagram.com/lanonasis", label: "Instagram" },
                  { icon: Twitter, href: "https://twitter.com/lanonasis", label: "Twitter" },
                  { icon: Facebook, href: "https://facebook.com/Lan-Onasis", label: "Facebook" },
                  { icon: Linkedin, href: "https://linkedin.com/company/the-lan-onasis", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/lanonasis", label: "GitHub" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-secondary/20 transition-all duration-300 
                             group hover:scale-110"
                    aria-label={`Follow us on ${social.label}`}
                    whileHover={{ y: -2 }}
                  >
                    <social.icon className="w-6 h-6 group-hover:text-secondary transition-colors duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            <div>
              <motion.h4 
                className="font-semibold mb-6 text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Products
              </motion.h4>
              <ul className="space-y-3">
                {['VortexCore AI', 'VortexComply', 'VortexRisk', 'VortexShield', 'VortexIQ', 'VortexPay', 'BizGenie'].map((product, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-secondary transition-colors duration-300 
                               flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 
                                             group-hover:translate-x-1 transition-all duration-300" />
                      {product}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <motion.h4 
                className="font-semibold mb-6 text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Get in Touch
              </motion.h4>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-gray-400 mb-2">Website</p>
                  <a 
                    href="https://www.lanonasis.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-accent transition-colors duration-300 font-medium"
                  >
                    www.lanonasis.com
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-400 mb-2">Email</p>
                  <a 
                    href="mailto:info@lanonasis.com"
                    className="text-secondary hover:text-accent transition-colors duration-300 font-medium 
                             flex items-center group"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    info@lanonasis.com
                  </a>
                </motion.div>

                <motion.form 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Stay Updated</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                               focus:outline-none focus:border-secondary focus:bg-white/10 
                               transition-all duration-300 text-white placeholder-gray-500"
                    />
                  </div>
                  <motion.button 
                    type="submit" 
                    className="btn-primary w-full btn-magnetic"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe to Updates
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Lan Onasis. All rights reserved. Built with ❤️ for Africa.
              </p>
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-secondary transition-colors duration-300"
                    whileHover={{ y: -1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
