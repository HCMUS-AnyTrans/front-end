"use client"

import { BookMarked, PencilLine } from "lucide-react"
import { type ReactNode, useState } from "react"
import { useTranslations } from "next-intl"
import { AppCard, AppCardContent, AppCardHeader } from "@/components/ui/app-card"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { Glossary } from "@/features/glossary"
import type { GlossaryInputMode, ManualTerm } from "../types"
import { countValidManualTerms, shouldConfirmManualToSavedSwitch } from "../utils/glossary-mode"
import { ManualGlossaryTerms } from "./manual-glossary-terms"
import { SavedGlossarySelector } from "./saved-glossary-selector"

interface GlossarySectionProps {
  glossaries: Glossary[]
  domain: string
  glossaryInputMode: GlossaryInputMode
  selectedGlossaryId: string | null
  selectedGlossaryTermCount: number
  isLoadingGlossaries: boolean
  onSelectGlossary: (id: string | null) => void
  onGlossaryInputModeChange: (mode: GlossaryInputMode) => void
  onConfirmSavedGlossaryMode: () => void
  useSystemGlossary: boolean
  onUseSystemGlossaryChange: (enabled: boolean) => void
  manualTerms: ManualTerm[]
  onAddManualTerm: () => void
  onUpdateManualTerm: (id: string, field: "src" | "tgt", value: string) => void
  onRemoveManualTerm: (id: string) => void
}

function ModeCard({
  icon,
  title,
  description,
  isActive,
  onClick,
  children,
}: {
  icon: ReactNode
  title: string
  description: string
  isActive: boolean
  onClick: () => void
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background/70 transition-colors",
        isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
      )}
    >
      <button type="button" onClick={onClick} className="flex w-full items-start gap-3 p-4 text-left">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg border",
            isActive
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className={cn("text-sm font-medium", isActive ? "text-primary" : "text-foreground")}>
            {title}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </button>

      {isActive && children ? <div className="border-t px-4 pb-4 pt-4">{children}</div> : null}
    </div>
  )
}

export function GlossarySection({
  glossaries,
  domain,
  glossaryInputMode,
  selectedGlossaryId,
  selectedGlossaryTermCount,
  isLoadingGlossaries,
  onSelectGlossary,
  onGlossaryInputModeChange,
  onConfirmSavedGlossaryMode,
  useSystemGlossary,
  onUseSystemGlossaryChange,
  manualTerms,
  onAddManualTerm,
  onUpdateManualTerm,
  onRemoveManualTerm,
}: GlossarySectionProps) {
  const t = useTranslations("documents.configure")
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const validManualTerms = countValidManualTerms(manualTerms)
  const totalAppliedTerms =
    glossaryInputMode === "saved"
      ? selectedGlossaryTermCount
      : glossaryInputMode === "manual"
        ? validManualTerms
        : 0

  const handleSavedModeRequest = () => {
    if (glossaryInputMode === "saved") {
      onGlossaryInputModeChange("none")
      return
    }

    if (shouldConfirmManualToSavedSwitch({ glossaryInputMode, manualTerms })) {
      setIsConfirmOpen(true)
      return
    }

    onConfirmSavedGlossaryMode()
  }

  const handleManualModeRequest = () => {
    if (glossaryInputMode === "manual") {
      onGlossaryInputModeChange("none")
      return
    }

    onGlossaryInputModeChange("manual")
  }

  const handleConfirmSavedMode = () => {
    onConfirmSavedGlossaryMode()
    setIsConfirmOpen(false)
  }

  return (
    <>
      <AppCard>
        <AppCardHeader className="pb-3">
          <CardTitle className="text-base">{t("glossary")}</CardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-4">
          {domain !== "other" ? (
            <div className="flex items-start justify-between gap-4 rounded-xl border bg-background/70 px-4 py-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{t("systemGlossaryTitle")}</p>
                <p className="text-xs text-muted-foreground">{t("systemGlossaryDescription")}</p>
              </div>
              <Switch checked={useSystemGlossary} onCheckedChange={onUseSystemGlossaryChange} />
            </div>
          ) : null}

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{t("glossarySourceTitle")}</p>
            <p className="text-xs text-muted-foreground">{t("glossarySourceDescription")}</p>
          </div>

          <div className="space-y-4">
            <ModeCard
              icon={<BookMarked className="size-4" />}
              title={t("savedGlossaryCardTitle")}
              description={t("savedGlossaryCardDescription")}
              isActive={glossaryInputMode === "saved"}
              onClick={handleSavedModeRequest}
            >
              <SavedGlossarySelector
                glossaries={glossaries}
                selectedGlossaryId={selectedGlossaryId}
                isLoadingGlossaries={isLoadingGlossaries}
                onSelectGlossary={onSelectGlossary}
                embedded
              />
            </ModeCard>

            <ModeCard
              icon={<PencilLine className="size-4" />}
              title={t("manualGlossaryCardTitle")}
              description={t("manualGlossaryCardDescription")}
              isActive={glossaryInputMode === "manual"}
              onClick={handleManualModeRequest}
            >
              <ManualGlossaryTerms
                manualTerms={manualTerms}
                onAddManualTerm={onAddManualTerm}
                onUpdateManualTerm={onUpdateManualTerm}
                onRemoveManualTerm={onRemoveManualTerm}
                embedded
              />
            </ModeCard>
          </div>

          {glossaryInputMode === "none" ? (
            <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              {t("glossarySourceNoneSelected")}
            </div>
          ) : null}

          {totalAppliedTerms > 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-background/70 px-3 py-2.5">
              <span className="text-xs text-muted-foreground">{t("termsAppliedLabel")}</span>
              <span className="text-sm font-semibold text-foreground">
                {t("termsAppliedCount", { count: totalAppliedTerms })}
              </span>
            </div>
          ) : null}
        </AppCardContent>
      </AppCard>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("manualToSavedConfirmTitle")}</DialogTitle>
            <DialogDescription>{t("manualToSavedConfirmDescription")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              {t("manualToSavedConfirmCancel")}
            </Button>
            <Button onClick={handleConfirmSavedMode}>{t("manualToSavedConfirmContinue")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
