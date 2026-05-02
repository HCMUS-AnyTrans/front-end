import { Check, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LANDING_SECTION_IDS } from '@/data/site-marketing-nav';
import { Link } from '@/i18n/navigation';
import { planConfigs } from '../data/landing-content';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const t = useTranslations('marketing.landing.pricing');

  return (
    <section id={LANDING_SECTION_IDS.pricing} className="py-20 md:py-28">
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

        <div className="grid gap-6 md:grid-cols-3">
          {planConfigs.map((plan) => (
            <article
              key={plan.key}
              className={cn(
                'relative flex h-full flex-col rounded-3xl border p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1',
                plan.popular
                  ? 'border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20'
                  : 'border-border bg-card text-card-foreground',
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground">
                  {t('popular')}
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={cn(
                      'text-sm font-medium uppercase tracking-[0.2em]',
                      plan.popular
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
                    )}
                  >
                    {t(`plans.${plan.key}.name`)}
                  </p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-semibold">
                      {plan.credits}
                    </span>
                    <span
                      className={cn(
                        'pb-1 text-sm',
                        plan.popular
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground',
                      )}
                    >
                      {t('credits')}
                    </span>
                  </div>
                </div>

                {plan.bonus ? (
                  <div
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
                      plan.popular
                        ? 'bg-primary-foreground/15 text-primary-foreground'
                        : 'bg-secondary/20 text-secondary-foreground',
                    )}
                  >
                    <Gift className="h-3.5 w-3.5" />
                    {t('bonusCredits', { credits: plan.bonus })}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 space-y-1">
                {plan.originalPrice ? (
                  <p className="text-xl font-semibold line-through">
                    {plan.originalPrice}
                  </p>
                ) : null}

                <p className="text-3xl font-semibold">
                  {plan.price}
                  <span className="ml-1 text-sm font-normal">VND</span>
                </p>
                <p
                  className={cn(
                    'text-sm',
                    plan.popular
                      ? 'text-primary-foreground/75'
                      : 'text-muted-foreground',
                  )}
                >
                  {plan.pricePerCredit} VND / credit
                </p>
                {plan.key !== 'starter' ? (
                  <p
                    className={cn(
                      'text-sm font-medium',
                      plan.popular ? 'text-secondary' : 'text-success',
                    )}
                  >
                    {t(`plans.${plan.key}.discount`)}
                  </p>
                ) : null}
              </div>

              <div
                className={cn(
                  'my-6 h-px',
                  plan.popular ? 'bg-primary-foreground/15' : 'bg-border',
                )}
              />

              <ul className="flex-1 space-y-3">
                {(t.raw(`plans.${plan.key}.features`) as string[]).map(
                  (feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <Check
                        className={cn(
                          'mt-1 h-4 w-4 shrink-0',
                          plan.popular ? 'text-secondary' : 'text-success',
                        )}
                      />
                      <span
                        className={
                          plan.popular
                            ? 'text-primary-foreground/90'
                            : 'text-foreground'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ),
                )}
              </ul>

              <Button
                className={cn(
                  'mt-8 w-full rounded-full',
                  plan.popular
                    ? 'bg-background text-foreground hover:bg-background/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90',
                )}
                asChild
              >
                <Link href="/register">{t('buyNow')}</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
