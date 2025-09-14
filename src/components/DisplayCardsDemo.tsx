"use client";

import DisplayCards from "../components/ui/display-cards";
import { Brain, CreditCard, Shield, BarChart3, Database, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DisplayCardsDemo = () => {
  const { t } = useTranslation();
  
  const platformCards = [
    {
      icon: <Brain className="size-5 text-blue-400" />,
      title: t('display_cards.vortexcore_ai.title'),
      description: t('display_cards.vortexcore_ai.description'),
      date: t('display_cards.vortexcore_ai.status'),
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500 font-semibold",
      className:
        "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 hover:shadow-lg",
    },
    {
      icon: <CreditCard className="size-5 text-green-400" />,
      title: t('display_cards.vortexpay.title'),
      description: t('display_cards.vortexpay.description'),
      date: t('display_cards.vortexpay.status'),
      iconClassName: "text-green-500",
      titleClassName: "text-green-500 font-semibold",
      className:
        "bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300 hover:shadow-lg",
    },
    {
      icon: <BarChart3 className="size-5 text-purple-400" />,
      title: t('display_cards.bizgenie.title'),
      description: t('display_cards.bizgenie.description'),
      date: t('display_cards.bizgenie.status'),
      iconClassName: "text-purple-500",
      titleClassName: "text-purple-500 font-semibold",
      className:
        "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 hover:shadow-lg",
    },
    {
      icon: <Shield className="size-5 text-orange-400" />,
      title: t('products.vortexcomply.name'),
      description: t('products.vortexcomply.description'),
      date: "Live",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500 font-semibold",
      className:
        "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300 hover:shadow-lg",
    },
    {
      icon: <Database className="size-5 text-indigo-400" />,
      title: t('platform_services.memory_service.title'),
      description: t('platform_services.memory_service.description'),
      date: "Live",
      iconClassName: "text-indigo-500",
      titleClassName: "text-indigo-500 font-semibold",
      className:
        "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-300 hover:shadow-lg",
    },
    {
      icon: <Cpu className="size-5 text-teal-400" />,
      title: t('products.vortexrisk.name'),
      description: t('products.vortexrisk.description'),
      date: "Beta",
      iconClassName: "text-teal-500",
      titleClassName: "text-teal-500 font-semibold",
      className:
        "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:border-teal-300 hover:shadow-lg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('platform_services.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('ecosystem.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ecosystem.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platformCards.map((card, index) => (
            <div
              key={index}
              className={`group relative flex flex-col justify-between rounded-xl border p-6 shadow-sm transition-all duration-300 ${card.className}`}
            >
              <div className="space-y-3">
                <div className={`flex items-center gap-3 ${card.iconClassName}`}>
                  {card.icon}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    card.date === 'Live' ? 'bg-green-100 text-green-700' :
                    card.date === 'Beta' ? 'bg-orange-100 text-orange-700' :
                    card.date === 'Active' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {card.date}
                  </div>
                </div>
                <h3 className={`text-xl font-semibold ${card.titleClassName}`}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs text-gray-500">
                  Learn more →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DisplayCardsDemo };
