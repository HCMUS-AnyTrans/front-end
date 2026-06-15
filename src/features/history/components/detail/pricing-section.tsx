'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TranslationJobResponse } from '@/types';

interface HistoryJobDetailPricingSectionProps {
  job: TranslationJobResponse;
}

export function HistoryJobDetailPricingSection({
  job,
}: HistoryJobDetailPricingSectionProps) {
  const t = useTranslations('dashboard.history');

  if (job.cost_credits === undefined) {
    return null;
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t('detail.creditCost')}
        </p>
        <div className="flex items-center gap-1.5">
          <Image
            src="/shared/credit.png"
            alt="Credits"
            width={64}
            height={64}
            quality={100}
            sizes="64px"
            className="size-3.5 shrink-0"
          />
          <span className="font-semibold tabular-nums text-foreground">
            {job.cost_credits}
          </span>
          <span className="text-xs text-muted-foreground">credits</span>
        </div>
      </div>

      {job.pricing_breakdown && job.pricing_breakdown.length > 0 && (
        <div className="overflow-hidden rounded-lg border bg-muted/30">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  {t('detail.breakdown.service')}
                </th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                  {t('detail.breakdown.quantity')}
                </th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                  {t('detail.breakdown.credits')}
                </th>
              </tr>
            </thead>
            <tbody>
              {job.pricing_breakdown.map((item, i) => (
                <tr
                  key={item.code}
                  className={
                    i < job.pricing_breakdown!.length - 1 ? 'border-b' : ''
                  }
                >
                  <td className="px-3 py-2 text-foreground">
                    <div>{item.name}</div>
                    <div className="text-muted-foreground">
                      {item.price} / {item.unit}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                    {item.quantity.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums text-foreground">
                    {item.credits}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/50">
                <td
                  colSpan={2}
                  className="px-3 py-2 font-semibold text-foreground"
                >
                  {t('detail.breakdown.total')}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-foreground">
                  {job.cost_credits}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
