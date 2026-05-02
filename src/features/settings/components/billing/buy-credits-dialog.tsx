'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditPackageCard } from '@/components/shared';
import {
  createCreditPackageFormatter,
  createCreditPackageViewModel,
  sortActiveCreditPackages,
} from '@/lib/credit-package';
import { useCreditPackages, useCreatePayment } from '../../hooks/use-billing';

interface BuyCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyCreditsDialog({
  open,
  onOpenChange,
}: BuyCreditsDialogProps) {
  const t = useTranslations('settings.billing');
  const locale = useLocale();
  const { formatCredits, formatAmount, formatPerCredit } =
    createCreditPackageFormatter(locale);
  const { packages, isLoading, isError, refetch } = useCreditPackages();
  const { createPaymentAsync, isCreating } = useCreatePayment();
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const packageList = useMemo(
    () => sortActiveCreditPackages(packages),
    [packages],
  );

  const selectedPackage = useMemo(() => {
    if (!packageList.length) return null;
    return (
      packageList.find((item) => item.id === selectedPackageId) ?? packageList[0]
    );
  }, [packageList, selectedPackageId]);

  const handleBuy = async () => {
    if (!selectedPackage) return;

    setPaymentError(null);

    try {
      const dashboardUrl = `${window.location.origin}/${locale}/dashboard?source=payment`;
      const data = await createPaymentAsync({
        packageId: selectedPackage.id,
        returnUrl: dashboardUrl,
        cancelUrl: dashboardUrl,
      });
      window.location.href = data.paymentUrl;
    } catch {
      setPaymentError(t('paymentCreateError'));
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setPaymentError(null);
      setSelectedPackageId(null);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-4xl overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-6 pt-6 pb-4">
          <DialogTitle>{t('buyCreditsTitle')}</DialogTitle>
          <DialogDescription>{t('buyCreditsDescription')}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-xl border bg-card p-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="mt-3 h-8 w-28" />
                  <Skeleton className="mt-3 h-6 w-24" />
                  <Skeleton className="mt-5 h-20 w-full" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm text-destructive">{t('packagesError')}</p>
              <Button variant="outline" className="mt-3" onClick={() => refetch()}>
                {t('retry')}
              </Button>
            </div>
          ) : packageList.length === 0 ? (
            <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
              {t('packagesEmpty')}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {packageList.map((pkg) => {
                const packageView = createCreditPackageViewModel(pkg);
                const isPopular =
                  pkg.tags.includes('best-value') || pkg.tags.includes('popular');
                const isSelected = selectedPackage?.id === pkg.id;

                return (
                  <CreditPackageCard
                    key={pkg.id}
                    layout="compact"
                    selected={isSelected}
                    highlighted={isPopular}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    title={pkg.name}
                    creditsText={formatCredits(pkg.credits)}
                    creditsLabel={t('credits')}
                    originalPriceText={
                      packageView.discountPercent
                        ? formatAmount(packageView.price, packageView.currency)
                        : undefined
                    }
                    priceText={formatAmount(
                      packageView.discountedPrice,
                      packageView.currency,
                    )}
                    perCreditText={formatPerCredit(
                      packageView.unitPrice,
                      packageView.currency,
                      t('perCreditLabel'),
                    )}
                    topBadge={
                      isPopular
                        ? {
                            label: t('mostPopular'),
                            icon: <Star className="size-3 fill-current" />,
                            tone: 'primary',
                            placement: 'top-right',
                          }
                        : undefined
                    }
                    metaBadges={
                      packageView.discountPercent || packageView.bonusPercent ? (
                        <>
                          {packageView.discountPercent ? (
                            <Badge className="border border-success/20 bg-success/10 text-success hover:bg-success/10">
                              {t('savePercent', {
                                percent: packageView.discountPercent,
                              })}
                            </Badge>
                          ) : null}
                          {packageView.bonusPercent ? (
                            <Badge className="border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                              {t('bonusCredits', {
                                credits: packageView.bonusCredits,
                              })}
                            </Badge>
                          ) : null}
                        </>
                      ) : null
                    }
                    details={
                      ((pkg.description?.[locale] ?? pkg.description?.en) ?? []).length ? (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {(pkg.description?.[locale] ?? pkg.description?.en ?? []).map(
                            (item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 size-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      ) : (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success">
                              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                            </div>
                            <span>{t('noPackageDescription')}</span>
                          </li>
                        </ul>
                      )
                    }
                  />
                );
              })}
            </div>
          )}

          {paymentError ? (
            <p className="mt-4 text-sm text-destructive">{paymentError}</p>
          ) : null}
        </div>

        <DialogFooter className="border-t px-6 py-4 sm:justify-between">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t('close')}
          </Button>
          <Button
            onClick={handleBuy}
            disabled={!selectedPackage || isLoading || isError || isCreating}
          >
            {isCreating ? t('processingPayment') : t('buySelectedPackage')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
