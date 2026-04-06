import type { GlossaryTemplate } from '../types';

export type GlossaryTemplateLike = GlossaryTemplate;

export type GlossarySourceType = 'manual' | 'template' | 'document' | null;

export function filterTemplatesByDomain<T extends GlossaryTemplateLike>(
  templates: T[],
  domainId: string,
): T[] {
  const normalizedDomainId = domainId.trim().toLowerCase();

  if (!normalizedDomainId) {
    return templates;
  }

  return templates.filter(
    (template) => template.domainId.trim().toLowerCase() === normalizedDomainId,
  );
}

export function resetSourceSpecificState({
  nextSourceType,
  selectedTemplateId,
  documentFiles,
}: {
  nextSourceType: GlossarySourceType;
  selectedTemplateId: string | null;
  documentFiles: File[] | string[];
}) {
  return {
    selectedTemplateId:
      nextSourceType === 'template' ? selectedTemplateId : null,
    documentFiles: nextSourceType === 'document' ? documentFiles : [],
  };
}

export function getCreateGlossaryStepTwoState(sourceType: GlossarySourceType): {
  submitDisabled: boolean;
  submitLabelKey: string;
  helperKey: string | null;
  ready: boolean;
  requiresTemplate?: boolean;
  requiresDocument?: boolean;
} {
  if (sourceType === 'manual') {
    return {
      submitDisabled: false,
      submitLabelKey: 'createGlossary',
      helperKey: null,
      ready: true,
    };
  }

  if (sourceType === 'template') {
    return {
      submitDisabled: false,
      submitLabelKey: 'createGlossary',
      helperKey: 'stepTwo.templateSelectHelper',
      ready: false,
      requiresTemplate: true,
    };
  }

  if (sourceType === 'document') {
    return {
      submitDisabled: false,
      submitLabelKey: 'createGlossary',
      helperKey: 'stepTwo.documentSelectHelper',
      ready: false,
      requiresDocument: true,
    };
  }

  return {
    submitDisabled: true,
    submitLabelKey: 'stepTwo.selectSource',
    helperKey: 'stepTwo.selectSourceHelper',
    ready: false,
  };
}
