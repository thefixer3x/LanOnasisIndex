
import { useTranslation } from 'react-i18next';

export function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-primary text-white text-center">
      <div className="container mx-auto px-6">
        <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold mb-4">
          {t('cta.badge')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <a href="https://dashboard.lanonasis.com" className="inline-block px-8 py-3 bg-secondary text-primary rounded-lg font-semibold shadow hover:bg-secondary/90 transition">
          {t('cta.button')}
        </a>
      </div>
    </section>
  );
}
