import type { Term } from "@/features/glossary"
import type {
  CreateTranslationJobDto,
  GlossaryInputMode,
  ManualTerm,
  TranslationConfig,
} from "../types"

type GlossaryModeConfig = Pick<TranslationConfig, "selectedGlossaryId" | "manualTerms"> & {
  glossaryInputMode?: GlossaryInputMode
}

type GlossaryTermLike = Pick<Term, "srcTerm" | "tgtTerm">

export function hasNonEmptyManualTerms(manualTerms: ManualTerm[]): boolean {
  return manualTerms.some((term) => term.src.trim().length > 0 || term.tgt.trim().length > 0)
}

export function countValidManualTerms(manualTerms: ManualTerm[]): number {
  return manualTerms.filter((term) => term.src.trim().length > 0 && term.tgt.trim().length > 0).length
}

export function deriveGlossaryInputMode(config: GlossaryModeConfig): GlossaryInputMode {
  if (config.glossaryInputMode === "none") {
    return "none"
  }

  if (hasNonEmptyManualTerms(config.manualTerms)) {
    return "manual"
  }

  if (config.selectedGlossaryId) {
    return "saved"
  }

  return config.glossaryInputMode ?? "saved"
}

export function shouldConfirmManualToSavedSwitch({
  glossaryInputMode,
  manualTerms,
}: {
  glossaryInputMode: GlossaryInputMode
  manualTerms: ManualTerm[]
}): boolean {
  return glossaryInputMode === "manual" && hasNonEmptyManualTerms(manualTerms)
}

export function buildUserGlossaryEntries({
  glossaryInputMode,
  manualTerms,
  glossaryTerms,
}: {
  glossaryInputMode: GlossaryInputMode
  manualTerms: ManualTerm[]
  glossaryTerms?: GlossaryTermLike[]
}): NonNullable<CreateTranslationJobDto["user_glossary"]> {
  const entries = new Map<string, { src_lang: string; tgt_lang: string }>()

  if (glossaryInputMode === "saved") {
    ;(glossaryTerms ?? []).forEach((term) => {
      const src = term.srcTerm.trim()
      const tgt = term.tgtTerm.trim()

      if (!src || !tgt) {
        return
      }

      entries.set(src.toLowerCase(), { src_lang: src, tgt_lang: tgt })
    })
  } else if (glossaryInputMode === "manual") {
    manualTerms.forEach((term) => {
      const src = term.src.trim()
      const tgt = term.tgt.trim()

      if (!src || !tgt) {
        return
      }

      entries.set(src.toLowerCase(), { src_lang: src, tgt_lang: tgt })
    })
  }

  return Array.from(entries.values())
}
