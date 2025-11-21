import { Zap, Shield, DollarSign, Brain, BarChart3, CreditCard, Lock } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation();
  
  const platformFeatures = [
    {
      icon: Brain,
      name: t('products.vortexcore_ai.name'),
      description: t('products.vortexcore_ai.description'),
    },
    {
      icon: Shield,
      name: t('products.vortexcomply.name'),
      description: t('products.vortexcomply.description'),
    },
    {
      icon: BarChart3,
      name: t('products.vortexrisk.name'),
      description: t('products.vortexrisk.description'),
    },
    {
      icon: Zap,
      name: t('products.vortexshield.name'),
      description: t('products.vortexshield.description'),
    },
    {
      icon: BarChart3,
      name: t('products.vortexiq.name'),
      description: t('products.vortexiq.description'),
    },
    {
      icon: CreditCard,
      name: t('products.vortexpay.name'),
      description: t('products.vortexpay.description'),
    },
    {
      icon: Lock,
      name: t('products.vortexsecure.name'),
      description: t('products.vortexsecure.description'),
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl text-gray-900">
            Powering Africa's Digital Transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive AI-powered platform suite enables businesses across Africa to innovate, 
            comply, and scale with confidence in the digital economy.
          </p>
        </div>
        <div className="relative mx-auto grid max-w-2xl lg:max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
