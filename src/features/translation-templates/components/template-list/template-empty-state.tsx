import { useTranslations } from 'next-intl';
import { ClipboardList, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplateEmptyStateProps {
  hasFilters: boolean;
  onCreateClick: () => void;
  isError?: boolean;
  onRetry?: () => void;
}

export function TemplateEmptyState({
  hasFilters,
  onCreateClick,
  isError,
  onRetry,
}: TemplateEmptyStateProps) {
  const t = useTranslations('templates');

  const title = isError
    ? t('loadErrorTitle')
    : hasFilters
      ? t('noResults')
      : t('noTemplates');
  const description = isError
    ? t('loadErrorDescription')
    : hasFilters
      ? t('noResultsDescription')
      : t('noTemplatesDescription');

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ClipboardList className="mb-4 size-12 text-muted-foreground/50" />
      <h3 className="mb-1 text-base font-medium text-foreground">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {isError ? (
        <Button size="sm" variant="outline" onClick={onRetry}>
          {t('retry')}
        </Button>
      ) : !hasFilters ? (
        <Button size="sm" onClick={onCreateClick}>
          <Plus className="size-4" />
          {t('createTemplate')}
        </Button>
      ) : null}
    </div>
  );
}
