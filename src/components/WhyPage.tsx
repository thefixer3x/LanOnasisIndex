import { useTranslation } from 'react-i18next';
import { ArrowRight, Lightbulb, Brain, Heart, Workflow, ShieldCheck } from 'lucide-react';

/**
 * WhyPage — the /why route for apps/lanonasis-index.
 *
 * Cognitive-identity reframe: this page carries the "why continuity
 * instead of memory" argument. It is paired with /how so visitors can
 * move from values to mechanics without leaving the marketing domain.
 */
export function WhyPage() {
  const { t } = useTranslation();

  const pillarIcons = [Workflow, Brain, Heart, Lightbulb] as const;

  return (
    <div className="min-h-screen bg-primary text-white">
      <header className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-[120px] bg-purple-500/20 animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full blur-[100px] bg-blue-400/15 animate-float" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Lightbulb className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">
              {t('why_page.badge')}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            {t('why_page.title')}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('why_page.subtitle')}
          </p>
        </div>
      </header>

      {/* Problem framing */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary">
            {t('why_page.problem_title')}
          </h2>
          <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {t('why_page.problem_body')}
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-secondary">
            {t('why_page.pillars_title')}
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('why_page.pillars_subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['continuity', 'reflection', 'identity', 'briefing'] as const).map((key, idx) => {
              const Icon = pillarIcons[idx];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-purple-500/40 transition-colors"
                >
                  <Icon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {t(`why_page.pillars.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t(`why_page.pillars.${key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shift framing */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-secondary">
            {t('why_page.shift_title')}
          </h2>

          <div className="space-y-4">
            {(['retrieval_to_continuity', 'storage_to_reflection', 'memory_to_identity', 'query_to_briefing'] as const).map(
              (key) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-gray-400 line-through text-sm md:text-base">
                    {t(`why_page.shift.${key}.from`)}
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 mx-auto" />
                  <div className="text-white font-medium text-sm md:text-base">
                    {t(`why_page.shift.${key}.to`)}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <ShieldCheck className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                {t('why_page.trust_title')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('why_page.trust_body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {t('why_page.closing_title')}
          </h2>
          <p className="text-gray-300 mb-8">{t('why_page.closing_body')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              {t('why_page.cta_primary')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#home"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors"
            >
              {t('why_page.cta_secondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhyPage;