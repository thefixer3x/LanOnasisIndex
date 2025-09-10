import { Zap, ArrowDownToDot, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PricingTable = () => {
  const { t } = useTranslation();
  
  const tiers = [
    {
      name: t('pricing.tiers.starter.name'),
      price: { monthly: 15, yearly: 144 },
      description: t('pricing.tiers.starter.description'),
      icon: <Zap className="w-7 h-7 text-gray-500 dark:text-gray-400 animate-bounce" />,
      features: t('pricing.tiers.starter.features', { returnObjects: true }) as string[],
      highlight: false,
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: { monthly: 49, yearly: 470 },
      description: t('pricing.tiers.pro.description'),
      icon: <ArrowDownToDot className="w-7 h-7 text-blue-500 animate-pulse" />,
      features: t('pricing.tiers.pro.features', { returnObjects: true }) as string[],
      highlight: true,
      badge: t('pricing.tiers.pro.badge'),
    },
    {
      name: t('pricing.tiers.enterprise.name'),
      price: { monthly: 199, yearly: 1900 },
      description: t('pricing.tiers.enterprise.description'),
      icon: <Sparkles className="w-7 h-7 text-yellow-500 animate-spin" />,
      features: t('pricing.tiers.enterprise.features', { returnObjects: true }) as string[],
      highlight: false,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">{t('pricing.plans')}</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`flex-1 bg-white rounded-lg shadow-lg p-8 border-2 ${tier.highlight ? 'border-blue-500 scale-105' : 'border-transparent'} transition-transform`}
            >
              {tier.badge && (
                <div className="mb-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{tier.badge}</div>
              )}
              <div className="flex items-center justify-center mb-4">{tier.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <div className="text-3xl font-bold mb-4">${tier.price.monthly}/mo</div>
              <ul className="mb-6 space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 px-4 rounded ${tier.highlight ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} font-semibold hover:opacity-90 transition`}>Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PricingTable };
