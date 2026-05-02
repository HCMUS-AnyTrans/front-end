import { useTranslations } from 'next-intl';
import { LANDING_SECTION_IDS } from '@/data/site-marketing-nav';
import { stepConfigs } from '../data/landing-content';

export function HowItWorksSection() {
  const t = useTranslations('marketing.landing.howItWorks');

  return (
    <section
      id={LANDING_SECTION_IDS.howItWorks}
      className="relative overflow-hidden bg-muted/35 py-20 md:py-28"
    >
      <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
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

        <div className="grid gap-8 md:grid-cols-3">
          {stepConfigs.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.key}
                className="relative rounded-[1.75rem] border border-border bg-background/90 p-7 shadow-sm backdrop-blur"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {t(`steps.${step.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
