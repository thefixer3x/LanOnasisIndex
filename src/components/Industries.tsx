"use client";

import {
  ArrowRight,
  Building,
  ChevronRight,
  GraduationCap,
  Home,
  Landmark,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface IndustryConfig {
  key:
    | 'financial_services'
    | 'smes'
    | 'ecommerce'
    | 'education'
    | 'logistics'
    | 'real_estate'
    | 'public_sector';
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const INDUSTRY_CONFIG: IndustryConfig[] = [
  {
    key: 'financial_services',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'smes',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'ecommerce',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'education',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'logistics',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'real_estate',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'public_sector',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
  },
];

export function Industries() {
  const { t } = useTranslation();

  const industries = INDUSTRY_CONFIG.map((config) => {
    const valueProps = t(`industries.${config.key}.value_props`, {
      returnObjects: true,
    }) as unknown;

    return {
      ...config,
      name: t(`industries.${config.key}.name`),
      hero: t(`industries.${config.key}.hero`),
      description: t(`industries.${config.key}.description`),
      valueProps: Array.isArray(valueProps) ? (valueProps as string[]) : [],
    };
  });

  return (
    <section id="industries" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-secondary"
          >
            {t('industries.title')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl md:text-5xl font-bold"
          >
            {t('industries.subtitle')}
          </motion.h2>
        </div>

        <div className="space-y-20">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={industry.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`grid gap-10 lg:grid-cols-2 items-center ${isReversed ? 'lg:[&>div:first-child]:col-start-2 lg:[&>div:last-child]:col-start-1' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold">{industry.name}</h3>
                      <p className="text-secondary font-medium">{industry.hero}</p>
                    </div>
                  </div>

                  <p className="mb-6 text-lg text-gray-200 leading-relaxed">
                    {industry.description}
                  </p>

                  <h4 className="text-sm uppercase tracking-wide text-secondary mb-3">
                    {t('industries.value_props')}
                  </h4>
                  <div className="space-y-3">
                    {industry.valueProps.map((prop) => (
                      <motion.div
                        key={prop}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <ChevronRight className="mt-1 h-4 w-4 text-secondary" />
                        <span>{prop}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-2">
                    <a
                      href="https://lanonasis.com/industries"
                      className="btn-primary inline-flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('industries.learn_more')}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <p className="text-sm text-gray-400">
                      {industry.name} {t('industries.learn_more_suffix')}
                    </p>
                  </div>
                </div>

                <div className="relative h-[320px] overflow-hidden rounded-3xl">
                  <img
                    src={industry.image}
                    alt={`${industry.name} visual`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-secondary/10 to-transparent" />
                  <div className="absolute inset-0 border border-white/10 rounded-3xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 text-center md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {t('industries.cta_title')}
          </h3>
          <p className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto">
            {t('industries.cta_subtitle')}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <a
              href="https://dashboard.lanonasis.com/consultation"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              {t('industries.cta_primary')}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://lanonasis.com/#ecosystem"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              {t('industries.cta_secondary')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Industries;
