"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConfigureActionsProps {
  onBack: () => void
  onSaveTemplate?: () => void
  onStart: () => void
  isLoading?: boolean
  isSavingTemplate?: boolean
  isStartDisabled: boolean
  isSaveTemplateVisible?: boolean
  isSaveTemplateDisabled?: boolean
  isInsufficientCredits: boolean
  containerClassName?: string
  backButtonClassName?: string
  startButtonClassName?: string
  hintClassName?: string
}

export function ConfigureActions({
  onBack,
  onSaveTemplate,
  onStart,
  isLoading,
  isSavingTemplate,
  isStartDisabled,
  isSaveTemplateVisible,
  isSaveTemplateDisabled,
  isInsufficientCredits,
  containerClassName,
  backButtonClassName,
  startButtonClassName,
  hintClassName,
}: ConfigureActionsProps) {
  const t = useTranslations("documents.configure")

  return (
    <>
      <div className={cn(containerClassName)}>
        <Button variant="outline" onClick={onBack} className={backButtonClassName}>
          {t("back")}
        </Button>
        {isSaveTemplateVisible ? (
          <Button
            variant="outline"
            onClick={onSaveTemplate}
            disabled={isSaveTemplateDisabled || isSavingTemplate}
            className={startButtonClassName}
          >
            {isSavingTemplate ? t("savingTemplate") : t("saveTemplate")}
          </Button>
        ) : null}
        <Button onClick={onStart} disabled={isStartDisabled} className={startButtonClassName}>
          {isLoading ? t("processing") : t("startTranslation")}
        </Button>
      </div>
      {isInsufficientCredits ? (
        <p className={cn("text-xs text-destructive", hintClassName)}>{t("estimate.insufficientActionHint")}</p>
      ) : null}
    </>
  )
}
