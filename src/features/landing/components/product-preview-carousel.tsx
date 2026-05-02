'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PreviewSlide } from '../data/landing-content';

type ProductPreviewCarouselProps = {
  slides: PreviewSlide[];
  goToSlideLabelTemplate: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
};

export function ProductPreviewCarousel({
  slides,
  goToSlideLabelTemplate,
  previousSlideLabel,
  nextSlideLabel,
}: ProductPreviewCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlide = useMemo(
    () => slides[currentSlide],
    [currentSlide, slides],
  );

  const nextSlide = () => {
    setCurrentSlide((value) => (value + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((value) => (value - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card/95 shadow-2xl shadow-primary/10 backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left — image placeholder (replace with <Image> later) */}
          <div className="relative border-b border-border bg-background/60 lg:border-r lg:border-b-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  'flex aspect-4/3 items-center justify-center transition-all duration-300',
                  index === currentSlide
                    ? 'relative opacity-100'
                    : 'pointer-events-none absolute inset-0 opacity-0',
                )}
              >
                {/* TODO: replace with <Image src={slide.image} /> */}
                <div className="flex flex-col items-center gap-3 text-muted-foreground/50">
                  <ImageIcon className="h-12 w-12" strokeWidth={1.2} />
                  <span className="text-sm font-medium">{slide.eyebrow}</span>
                </div>
              </div>
            ))}

            <div className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Right — text content + controls */}
          <div className="flex flex-col justify-between bg-card p-6 lg:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {activeSlide.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-9 text-foreground">
                {activeSlide.title}
              </h3>
              <p className="mt-4 leading-8 text-muted-foreground">
                {activeSlide.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {activeSlide.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={goToSlideLabelTemplate.replace(
                      '{index}',
                      String(index + 1),
                    )}
                    className={cn(
                      'h-2.5 rounded-full transition-all',
                      index === currentSlide
                        ? 'w-10 bg-primary'
                        : 'w-2.5 bg-border hover:bg-muted-foreground/40',
                    )}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={previousSlide}
                  aria-label={previousSlideLabel}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={nextSlide}
                  aria-label={nextSlideLabel}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
