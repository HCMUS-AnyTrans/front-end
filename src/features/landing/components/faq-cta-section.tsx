import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  LANDING_SECTION_IDS,
  marketingSectionHref,
} from '@/data/site-marketing-nav';
import { Link } from '@/i18n/navigation';
import { faqConfigs } from '../data/landing-content';
import { FaqItem } from './faq-item';

export function FaqCtaSection() {
  const tFaq = useTranslations('marketing.landing.faq');
  const tCta = useTranslations('marketing.landing.cta');

  return (
    <>
      <section
        id={LANDING_SECTION_IDS.faq}
        className="bg-muted/35 py-20 md:py-28"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary-700">
              {tFaq('eyebrow')}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {tFaq('title')}
            </h2>
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-border bg-card px-6 md:px-8">
            {faqConfigs.map((faq) => (
              <FaqItem
                key={faq.key}
                question={tFaq(`items.${faq.key}.question`)}
                answer={tFaq(`items.${faq.key}.answer`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-secondary/15 px-8 py-12 text-center shadow-lg shadow-primary/5 md:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {tCta('eyebrow')}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {tCta('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              {tCta('description')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full px-8 text-base"
                asChild
              >
                <Link href="/register">
                  {tCta('primaryCta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-8 text-base"
                asChild
              >
                <Link href={marketingSectionHref('pricing')}>
                  {tCta('secondaryCta')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
