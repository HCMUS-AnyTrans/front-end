import { useTranslations } from 'next-intl';
import { LANDING_SECTION_IDS } from '@/data/site-marketing-nav';
import { benefitConfigs } from '../data/landing-content';

export function BenefitsSection() {
  const t = useTranslations('marketing.landing.benefits');

  return (
    <section id={LANDING_SECTION_IDS.features} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary-700">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {benefitConfigs.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.key}
                className="group rounded-[1.75rem] border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {t(`items.${benefit.key}.title`)}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {t(`items.${benefit.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
