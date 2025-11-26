import { ArrowRight, Brain, Terminal, Code2, Key, BookOpen, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const serviceCards = (
  t: ReturnType<typeof useTranslation>['t']
) => [
  {
    title: t('platform_services.memory_service.title'),
    description: t('platform_services.memory_service.description'),
    icon: Brain,
    highlights: [
      t('platform_services.memory_service.dashboard'),
      t('platform_services.memory_service.api')
    ],
    ctaLabel: t('platform_services.memory_service.cta'),
    ctaHref: 'https://dashboard.lanonasis.com/'
  },
  {
    title: t('platform_services.cli_tool.title'),
    description: t('platform_services.cli_tool.description'),
    icon: Terminal,
    codeSample: 'npm install -g @lanonasis/cli',
    ctaLabel: t('platform_services.cli_tool.cta'),
    ctaHref: 'https://www.npmjs.com/package/@lanonasis/cli'
  },
  {
    title: t('platform_services.sdk.title'),
    description: t('platform_services.sdk.description'),
    icon: Code2,
    codeSample: 'npm install @lanonasis/sdk',
    ctaLabel: t('platform_services.sdk.cta'),
    ctaHref: 'https://docs.lanonasis.com/sdk'
  },
  {
    title: t('platform_services.api_keys.title'),
    description: t('platform_services.api_keys.description'),
    icon: Key,
    highlights: [
      t('platform_services.api_keys.zero_trust'),
      t('platform_services.api_keys.mcp_support')
    ],
    ctaLabel: t('platform_services.api_keys.cta'),
    ctaHref: 'https://dashboard.lanonasis.com/keys'
  },
  {
    title: t('platform_services.developer_portal.title'),
    description: t('platform_services.developer_portal.description'),
    icon: BookOpen,
    ctaLabel: t('platform_services.developer_portal.cta'),
    ctaHref: 'https://docs.lanonasis.com'
  },
  {
    title: t('platform_services.mcp.title'),
    description: t('platform_services.mcp.description'),
    icon: Cpu,
    ctaLabel: t('platform_services.mcp.cta'),
    ctaHref: 'https://mcp.lanonasis.com'
  }
];

export function PlatformServices() {
  const { t } = useTranslation();
  const cards = serviceCards(t);

  return (
    <section id="platform-services" className="py-20 bg-gradient-to-br from-black via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm"
          >
            {t('platform_services.badge')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            {t('platform_services.title')}
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            {t('platform_services.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-secondary/50"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{card.description}</p>
                {card.highlights && (
                  <ul className="space-y-2 text-sm text-gray-300 mb-6">
                    {card.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {card.codeSample && (
                  <div className="mb-6 rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-secondary">
                    <span>{card.codeSample}</span>
                  </div>
                )}
                <a
                  href={card.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a
            href="https://dashboard.lanonasis.com/signup"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition-transform hover:-translate-y-0.5"
          >
            {t('platform_services.sign_up_free')}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://docs.lanonasis.com/quickstart"
            className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-6 py-3 text-sm font-semibold text-secondary transition hover:border-secondary/70"
          >
            {t('platform_services.view_documentation')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default PlatformServices;
