import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';

// Import UI Kit components
import { 
  Button,
  Avatar,
  DisplayCards,
  LogoCarousel,
  CardsContainer,
  CardTransformed,
  BuiltByVisionariesTimeline
} from '@lan-onasis/ui-kit';

// Import the Developers component
import Developers from './components/Developers';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderContent = () => {
    switch (activeSection) {
      case 'developers':
        return <Developers />;
      case 'industries':
        return (
          <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-white text-center mb-12">Industries We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Banking & Finance', icon: Building2, description: 'Revolutionary fintech solutions' },
                  { name: 'Healthcare', icon: Target, description: 'AI-powered health management' },
                  { name: 'Education', icon: Users, description: 'Smart learning platforms' },
                  { name: 'Agriculture', icon: Globe, description: 'Precision farming technology' },
                  { name: 'Logistics', icon: Rocket, description: 'Supply chain optimization' },
                  { name: 'Energy', icon: Zap, description: 'Smart grid solutions' },
                ].map((industry, index) => (
                  <motion.div
                    key={industry.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => window.open(`https://api.lanonasis.com/industries/${industry.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`, '_blank')}
                  >
                    <industry.icon className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                    <p className="text-gray-300">{industry.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
              <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Lan Onasis
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    AI-Powered African Fintech Solutions Across Industries
                  </motion.p>
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Button
                      onClick={() => window.open('https://api.lanonasis.com', '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      Visit Dashboard <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-slate-800">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Our Platform Services</h2>
                <DisplayCards 
                  cards={[
                    {
                      title: 'VortexCore',
                      description: 'Advanced AI analytics and data processing platform',
                      onClick: () => window.open('https://api.lanonasis.com/vortexcore', '_blank')
                    },
                    {
                      title: 'Memory Service',
                      description: 'Intelligent data storage and retrieval system',
                      onClick: () => window.open('https://api.lanonasis.com/memory', '_blank')
                    },
                    {
                      title: 'AI SDK',
                      description: 'Comprehensive AI development toolkit',
                      onClick: () => window.open('https://api.lanonasis.com/ai-sdk', '_blank')
                    }
                  ]}
                />
              </div>
            </section>

            {/* Built by Visionaries Section */}
            <section className="py-20 bg-slate-900">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Built by Visionaries</h2>
                <CardsContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Seyed Erick',
                      role: 'Founder & CEO',
                      description: 'Visionary leader driving AI innovation across Africa',
                      avatar: '/avatars/seyed.jpg'
                    },
                    {
                      name: 'Technical Team',
                      role: 'Engineering Excellence',
                      description: 'World-class developers building the future of fintech',
                      avatar: '/avatars/team.jpg'
                    },
                    {
                      name: 'AI Research',
                      role: 'Innovation Lab',
                      description: 'Cutting-edge research in artificial intelligence',
                      avatar: '/avatars/research.jpg'
                    }
                  ].map((person, index) => (
                    <CardTransformed key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <div className="text-center">
                        <Avatar 
                          src={person.avatar}
                          alt={person.name}
                          className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-white mb-2">{person.name}</h3>
                        <p className="text-blue-400 mb-3">{person.role}</p>
                        <p className="text-gray-300 text-sm">{person.description}</p>
                      </div>
                    </CardTransformed>
                  ))}
                </CardsContainer>
              </div>
            </section>

            {/* Company Timeline */}
            <section className="py-20 bg-slate-800">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Our Journey</h2>
                <BuiltByVisionariesTimeline />
              </div>
            </section>

            {/* Logo Carousel */}
            <section className="py-20 bg-slate-900">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Trusted by Industry Leaders</h2>
                <LogoCarousel />
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-700 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Lan Onasis</h3>
                    <p className="text-gray-400">Transforming African businesses through innovative AI solutions</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
                    <ul className="space-y-2">
                      <li><a href="https://api.lanonasis.com/vortexcore" className="text-gray-400 hover:text-white transition-colors">VortexCore</a></li>
                      <li><a href="https://api.lanonasis.com/memory" className="text-gray-400 hover:text-white transition-colors">Memory Service</a></li>
                      <li><a href="https://api.lanonasis.com/ai-sdk" className="text-gray-400 hover:text-white transition-colors">AI SDK</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-2">
                      <li><button onClick={() => setActiveSection('industries')} className="text-gray-400 hover:text-white transition-colors">Industries</button></li>
                      <li><button onClick={() => setActiveSection('developers')} className="text-gray-400 hover:text-white transition-colors">Developers</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-700 mt-8 pt-8 text-center">
                  <p className="text-gray-400">&copy; 2024 Lan Onasis. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Lan Onasis | AI-Powered African Fintech Solutions Across Industries</title>
        <meta name="description" content="Transforming African businesses through innovative AI solutions. Explore our comprehensive platform including VortexCore, Memory Service, and AI SDK." />
        <meta name="keywords" content="AI, fintech, Africa, VortexCore, Memory Service, AI SDK, artificial intelligence, financial technology" />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setActiveSection('home')}
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Lan Onasis
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveSection('industries')}
                className={`text-sm font-medium transition-colors ${activeSection === 'industries' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Industries
              </button>
              <button 
                onClick={() => setActiveSection('developers')}
                className={`text-sm font-medium transition-colors ${activeSection === 'developers' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Developers
              </button>
              <Button
                onClick={() => window.open('https://api.lanonasis.com', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Dashboard
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-slate-700"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <button 
                  onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}
                  className={`block w-full text-left text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { setActiveSection('industries'); setIsMenuOpen(false); }}
                  className={`block w-full text-left text-sm font-medium transition-colors ${activeSection === 'industries' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                >
                  Industries
                </button>
                <button 
                  onClick={() => { setActiveSection('developers'); setIsMenuOpen(false); }}
                  className={`block w-full text-left text-sm font-medium transition-colors ${activeSection === 'developers' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                >
                  Developers
                </button>
                <Button
                  onClick={() => { window.open('https://api.lanonasis.com', '_blank'); setIsMenuOpen(false); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm w-full"
                >
                  Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
