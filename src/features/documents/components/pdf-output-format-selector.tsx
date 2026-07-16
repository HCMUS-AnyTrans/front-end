"use client"

import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { PdfOutputFormat } from "../types"

interface PdfOutputFormatSelectorProps {
  value: PdfOutputFormat
  onChange: (format: PdfOutputFormat) => void
}

const OUTPUT_FORMAT_OPTIONS: Array<{
  value: PdfOutputFormat
  titleKey: "docxTitle" | "pptxTitle"
  descriptionKey: "docxDescription" | "pptxDescription"
}> = [
  {
    value: "docx",
    titleKey: "docxTitle",
    descriptionKey: "docxDescription",
  },
  {
    value: "pptx",
    titleKey: "pptxTitle",
    descriptionKey: "pptxDescription",
  },
]

export function PdfOutputFormatSelector({ value, onChange }: PdfOutputFormatSelectorProps) {
  const t = useTranslations("documents.configure.pdfOutputFormat")

  return (
    <div>
      <Label className="mb-2 block">{t("label")}</Label>
      <p className="mb-3 text-xs text-muted-foreground">{t("description")}</p>

      <div className="grid gap-2 sm:grid-cols-2">
        {OUTPUT_FORMAT_OPTIONS.map((option) => (
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
