"use client"

import { useLocale, useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { DocTone } from "@/features/doc-tones"
import { getDocToneDescription, getDocToneLabel } from "@/features/doc-tones"
import { cn } from "@/lib/utils"

interface ToneSelectorProps {
  tones: DocTone[]
  value: string
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  onChange: (tone: string) => void
}

export function ToneSelector({
  tones,
  value,
  isLoading,
  isError,
  onRetry,
  onChange,
}: ToneSelectorProps) {
  const locale = useLocale()
  const t = useTranslations("documents")
  const tCommon = useTranslations("common")

  return (
    <div>
      <Label className="mb-2 block">{t("configure.toneLabel")}</Label>
      {isLoading ? (
        <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          {tCommon("loading")}
        </div>
      ) : isError ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          <span>{t("configure.toneLoadError")}</span>
          {onRetry ? (
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              {t("configure.retry")}
            </Button>
          ) : null}
        </div>
      ) : tones.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          {t("configure.noTones")}
        </div>
      ) : (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tones.map((tone) => (
          <button
            key={tone.id || tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            className={cn(
              "flex min-h-20 flex-col items-start rounded-lg border p-2.5 text-left transition-all",
              value === tone.value
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:bg-muted/50"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                value === tone.value ? "text-primary" : "text-foreground"
              )}
            >
              {getDocToneLabel(tones, tone.value, locale)}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
              {getDocToneDescription(tone, locale)}
            </span>
          </button>
        ))}
      </div>
      )}
    </div>
  )
}
