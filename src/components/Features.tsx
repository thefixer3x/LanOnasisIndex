
import { Brain, Shield, CreditCard, BarChart3, Lightbulb, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            {t('features.title')}
          </h2>
          <p>
            {t('features.description')}
          </p>
        </div>
        <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="size-4" />
              <h3 className="text-sm font-medium">{t('features.ai.title')}</h3>
            </div>
            <p className="text-sm">{t('features.ai.description')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="size-4" />
              <h3 className="text-sm font-medium">{t('features.compliance.title')}</h3>
            </div>
            <p className="text-sm">{t('features.compliance.description')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <h3 className="text-sm font-medium">{t('features.payments.title')}</h3>
            </div>
            <p className="text-sm">{t('features.payments.description')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              <h3 className="text-sm font-medium">{t('features.analytics.title')}</h3>
            </div>
            <p className="text-sm">{t('features.analytics.description')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="size-4" />
              <h3 className="text-sm font-medium">{t('features.insights.title')}</h3>
            </div>
            <p className="text-sm">{t('features.insights.description')}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <h3 className="text-sm font-medium">{t('features.support.title')}</h3>
            </div>
            <p className="text-sm">{t('features.support.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
