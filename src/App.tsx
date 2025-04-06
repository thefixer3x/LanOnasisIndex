import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Globe,
  Shield,
  Cpu,
  Zap,
  Building2,
  Users,
  Target,
  Phone,
  Github,
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
  Rocket,
  Award,
  TrendingUp,
  Users2,
  Globe2,
  Sparkles,
} from 'lucide-react';

const Timeline = React.lazy(() => import('./components/Timeline'));

const timelineMilestones = [
  {
    year: '2020',
    title: 'The Genesis',
    description: 'Founded with a vision to transform African tech landscape through innovative solutions.',
    icon: Rocket,
  },
  {
    year: '2021',
    title: 'VortexCore AI Launch',
    description: 'Introduced our flagship AI platform, revolutionizing business intelligence and compliance.',
    icon: Brain,
  },
  {
    year: '2022',
    title: 'Regional Expansion',
    description: 'Expanded operations to 5 African countries, serving over 100 enterprise clients.',
    icon: Globe2,
  },
  {
    year: '2023',
    title: 'Innovation Award',
    description: 'Recognized as "Most Innovative FinTech Solution" at Africa Tech Summit.',
    icon: Award,
  },
  {
    year: '2024',
    title: 'Strategic Partnerships',
    description: 'Formed key partnerships with major financial institutions across the continent.',
    icon: Users2,
  },
  {
    year: '2025',
    title: 'Global Recognition',
    description: 'Achieved unicorn status and expanded services to international markets.',
    icon: Sparkles,
  },
];

interface TimelineMilestoneProps {
  milestone: {
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
  };
  index: number;
}

const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({ milestone, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
        <milestone.icon className="w-6 h-6 text-secondary" />
      </div>
      <div className="flex-1">
        <div className="text-xl font-bold text-secondary mb-1">{milestone.year}</div>
        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
        <p className="text-gray-400">{milestone.description}</p>
      </div>
    </motion.div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 25, 48, 0)', 'rgba(10, 25, 48, 0.9)']
  );

  const timelineRef = useRef(null);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const timelineY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -150],
  );

  useEffect(() => {
    const updateTimelineWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.scrollWidth);
      }
    };

    updateTimelineWidth();
    window.addEventListener('resize', updateTimelineWidth);
    return () => window.removeEventListener('resize', updateTimelineWidth);
  }, []);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          color: 0x00b4ff,
          backgroundColor: 0x0a1930,
          points: 10,
          maxDistance: 25,
          spacing: 16,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-primary text-white">
      <motion.nav
        style={{ backgroundColor: headerBackground }}
        className="fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-secondary">
                Lan Onasis
              </span>
              <div className="hidden md:flex space-x-8">
                <a href="#vision" className="hover:text-secondary transition-colors">Our Vision</a>
                <a href="#ecosystem" className="hover:text-secondary transition-colors">The Ecosystem</a>
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
        
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { height: "auto", opacity: 1 },
            closed: { height: 0, opacity: 0 }
          }}
          className="md:hidden bg-primary/95 backdrop-blur-lg overflow-hidden"
        >
          <div className="px-4 py-4 space-y-4">
            <a href="#vision" className="block hover:text-secondary transition-colors">Our Vision</a>
            <a href="#ecosystem" className="block hover:text-secondary transition-colors">The Ecosystem</a>
            <a href="#story" className="block hover:text-secondary transition-colors">Our Story</a>
            <a href="#contact" className="block hover:text-secondary transition-colors">Contact</a>
            <button className="btn-primary w-full">
              Explore Our Ecosystem
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <section 
        ref={vantaRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-accent">
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
                alt="Digital Innovation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Vision</h2>
              <ul className="space-y-4 mb-8">
                {visionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <ChevronRight className="text-secondary mt-1 mr-2" size={20} />
                    <span className="text-lg">{point}</span>
                  </motion.li>
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

      <footer className="bg-primary-darker py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lan Onasis</h3>
              <p className="text-gray-400">
                Empowering African businesses through innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-secondary transition-colors">VortexCore AI</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">VortexComply</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">VortexRisk</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-secondary"
                />
                <button type="submit" className="btn-primary w-full">
                  Subscribe
                </button>
              </form>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="hover:text-secondary transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="hover:text-secondary transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="hover:text-secondary transition-colors">
                  <Linkedin size={24} />
                </a>
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