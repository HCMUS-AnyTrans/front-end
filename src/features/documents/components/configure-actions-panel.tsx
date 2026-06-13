"use client"

import { AppCard, AppCardContent } from "@/components/ui/app-card"
import { ConfigureActions } from "./configure-actions"

interface ConfigureActionsPanelProps {
  onBack: () => void
  onSaveTemplate?: () => void
  onStart: () => void
  isLoading?: boolean
  isSavingTemplate?: boolean
  isStartDisabled: boolean
  isSaveTemplateVisible?: boolean
  isSaveTemplateDisabled?: boolean
  isInsufficientCredits: boolean
}

export function ConfigureActionsPanel({
  onBack,
  onSaveTemplate,
  onStart,
  isLoading,
  isSavingTemplate,
  isStartDisabled,
  isSaveTemplateVisible,
  isSaveTemplateDisabled,
  isInsufficientCredits,
}: ConfigureActionsPanelProps) {
  return (
    <AppCard>
      <AppCardContent padding="all" className="space-y-3 p-4">
        <ConfigureActions
          onBack={onBack}
          onSaveTemplate={onSaveTemplate}
          onStart={onStart}
          isLoading={isLoading}
          isSavingTemplate={isSavingTemplate}
          isStartDisabled={isStartDisabled}
          isSaveTemplateVisible={isSaveTemplateVisible}
          isSaveTemplateDisabled={isSaveTemplateDisabled}
          isInsufficientCredits={isInsufficientCredits}
          containerClassName={
            isSaveTemplateVisible ? "grid grid-cols-3 gap-2" : "grid grid-cols-2 gap-2"
          }
          backButtonClassName="w-full"
          startButtonClassName="w-full"
        />
      </AppCardContent>
    </AppCard>
  )
}
