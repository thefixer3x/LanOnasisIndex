import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass, Layers, RefreshCcw, Sparkles, Activity } from 'lucide-react';

/**
 * HowPage — the /how route for apps/lanonasis-index.
 *
 * Cognitive-identity reframe: this page is the operational answer to
 * "how does LanOnasis actually carry continuity forward?". It exists so a
 * first-time visitor can move from the marketing landing page into a
 * concrete, longitudinal product surface without leaving the marketing
 * domain.
 */
export function HowPage() {
  const { t } = useTranslation();

  const stepIcons = [Activity, RefreshCcw, Layers, Sparkles] as const;

  return (
    <div className="min-h-screen bg-primary text-white">
      <header className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-blue-500/20 animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[100px] bg-blue-400/15 animate-float" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {t('how_page.badge')}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            {t('how_page.title')}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('how_page.subtitle')}
          </p>
        </div>
      </header>

      {/* Continuity loop */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-secondary">
            {t('how_page.pipeline_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['capture', 'reflect', 'synthesize', 'brief'] as const).map((key, idx) => {
              const Icon = stepIcons[idx];
              return (
                <div
                  key={key}
                  className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-blue-500/40 transition-colors"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-sm font-bold text-blue-400">
                    {idx + 1}
                  </div>
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {t(`how_page.steps.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t(`how_page.steps.${key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-secondary">
            {t('how_page.principles_title')}
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('how_page.principles_subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['continuity_over_retrieval', 'reflection_over_storage', 'identity_over_time', 'briefing_over_query'] as const).map(
              (key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-secondary">
                    {t(`how_page.principles.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t(`how_page.principles.${key}.body`)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {t('how_page.closing_title')}
          </h2>
          <p className="text-gray-300 mb-8">{t('how_page.closing_body')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#why"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-secondary text-primary font-semibold hover:opacity-90 transition-opacity"
            >
              {t('how_page.cta_primary')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#home"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-secondary/30 text-secondary hover:bg-secondary/10 transition-colors"
            >
              {t('how_page.cta_secondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowPage;