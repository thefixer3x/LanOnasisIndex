"use client";

import DisplayCards from "../components/ui/display-cards";
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DisplayCardsDemo = () => {
  const { t } = useTranslation();
  
  const defaultCards = [
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: t('display_cards.vortexcore_ai.title'),
      description: t('display_cards.vortexcore_ai.description'),
      date: t('display_cards.vortexcore_ai.status'),
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className:
        "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300",
    },
    {
      icon: <Sparkles className="size-4 text-green-300" />,
      title: t('display_cards.vortexpay.title'),
      description: t('display_cards.vortexpay.description'),
      date: t('display_cards.vortexpay.status'),
      iconClassName: "text-green-500",
      titleClassName: "text-green-500",
      className:
        "bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300",
    },
    {
      icon: <Sparkles className="size-4 text-purple-300" />,
      title: t('display_cards.bizgenie.title'),
      description: t('display_cards.bizgenie.description'),
      date: t('display_cards.bizgenie.status'),
      iconClassName: "text-purple-500",
      titleClassName: "text-purple-500",
      className:
        "[grid-area:stack] translate-x-12 translate-y-8 hover:translate-y-4 bg-slate-800/80 border border-slate-700 rounded-xl p-6 transition-all duration-300 hover:bg-slate-700/80 hover:border-slate-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Our Platform in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of our integrated fintech ecosystem
          </p>
        </div>
        
        <div className="flex min-h-[500px] w-full items-center justify-center">
          <div className="w-full max-w-4xl">
            <DisplayCards cards={defaultCards} />
          </div>
        </div>
      </div>
    </section>
  );
}

export { DisplayCardsDemo };
