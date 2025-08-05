import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Zap, Award, Rocket } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: 'AI-Powered Analytics',
    description: 'Gain deep insights with our advanced AI analytics tools.',
    icon: Cpu,
  },
  {
    title: 'Compliance Automation',
    description: 'Automate your compliance processes efficiently.',
    icon: Shield,
  },
  {
    title: 'Risk Management',
    description: 'Mitigate risks with our intelligent risk management solutions.',
    icon: Zap,
  },
  {
    title: 'Enterprise Integration',
    description: 'Seamlessly integrate with your existing enterprise systems.',
    icon: Award,
  },
  {
    title: 'Global Scalability',
    description: 'Scale your operations globally with our robust solutions.',
    icon: Rocket,
  },
];

const AnimatedCardsStack: React.FC = () => {
  return (
    <section className="py-16 bg-primary-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our AI Services
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Leveraging cutting-edge AI to provide comprehensive solutions that drive your business forward.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-secondary/10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <service.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
              <motion.a
                href="#"
                className="mt-4 inline-flex items-center text-secondary font-medium hover:underline"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCardsStack;