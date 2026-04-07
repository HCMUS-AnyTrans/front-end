"use client"

import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { PdfTranslationFlow } from "../types"

interface PdfFlowSelectorProps {
  value: PdfTranslationFlow
  onChange: (flow: PdfTranslationFlow) => void
}

const PDF_FLOW_OPTIONS: Array<{
  value: PdfTranslationFlow
  titleKey: "formatPreservedTitle" | "nonFormatPreservedTitle"
  descriptionKey: "formatPreservedDescription" | "nonFormatPreservedDescription"
}> = [
  {
    value: "format_preserved",
    titleKey: "formatPreservedTitle",
    descriptionKey: "formatPreservedDescription",
  },
  {
    value: "non_format_preserved",
    titleKey: "nonFormatPreservedTitle",
    descriptionKey: "nonFormatPreservedDescription",
  },
]

export function PdfFlowSelector({ value, onChange }: PdfFlowSelectorProps) {
  const t = useTranslations("documents.configure.pdfFlow")

  return (
    <div>
      <Label className="mb-2 block">{t("label")}</Label>
      <p className="mb-3 text-xs text-muted-foreground">{t("description")}</p>

      <div className="grid gap-2 sm:grid-cols-2">
        {PDF_FLOW_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-20 flex-col items-start rounded-lg border p-2.5 text-left transition-all",
              value === option.value
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:bg-muted/50"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                value === option.value ? "text-primary" : "text-foreground"
              )}
            >
              {t(option.titleKey)}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {t(option.descriptionKey)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
