import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { marketingSectionHref } from '@/data/site-marketing-nav';
import { Link } from '@/i18n/navigation';
import { previewSlideConfigs } from '../data/landing-content';
import { ProductPreviewCarousel } from './product-preview-carousel';

export function HeroSection() {
  const t = useTranslations('marketing.landing.hero');
  const tSlides = useTranslations('marketing.landing.previewSlides');

  const previewSlides = previewSlideConfigs.map((slide) => ({
    id: slide.key,
    eyebrow: tSlides(`${slide.key}.eyebrow`),
    title: tSlides(`${slide.key}.title`),
    description: tSlides(`${slide.key}.description`),
    highlights: tSlides.raw(`${slide.key}.highlights`) as string[],
  }));

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Static grid background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/90 to-transparent" />
        <div className="absolute left-1/2 top-0 h-112 w-3xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t('title')}
            <br />
            <span className="text-primary">{t('titleAccent')}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            {t('description')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 min-w-52 rounded-full px-8 text-base shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/register">
                {t('primaryCta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 min-w-52 rounded-full px-8 text-base"
              asChild
            >
              <Link href={marketingSectionHref('pricing')}>
                {t('secondaryCta')}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
              {t('highlights.languages')}
            </span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
              {t('highlights.retention')}
            </span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
              {t('highlights.slides', { count: previewSlides.length })}
            </span>
          </div>
        </div>

        <ProductPreviewCarousel
          slides={previewSlides}
          goToSlideLabelTemplate={t('carousel.goToSlide', { index: '{index}' })}
          previousSlideLabel={t('carousel.previousSlide')}
          nextSlideLabel={t('carousel.nextSlide')}
        />
      </div>
    </section>
  );
}
