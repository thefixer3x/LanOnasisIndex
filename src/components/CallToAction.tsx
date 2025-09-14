
import { useTranslation } from 'react-i18next';

export function CallToAction() {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
      <div className="container mx-auto px-6">
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold mb-4">
          {t('navigation.get_started')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">{t('industries.financial_services.hero')}</h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-gray-100">
          {t('industries.financial_services.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://dashboard.LanOnasis.com/" 
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            {t('hero.cta_primary')}
          </a>
          <a 
            href="#ecosystem" 
            className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition"
          >
            {t('navigation.ecosystem')}
          </a>
        </div>
      </div>
    </section>
  );
}
