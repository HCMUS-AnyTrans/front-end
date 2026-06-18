'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { listCustomInstructionTemplatesApi } from '../api/custom-instruction-templates.api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (instruction: string) => void;
}

export function CustomInstructionTemplateDialog({
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const locale = useLocale() as 'en' | 'vi';
  const t = useTranslations();

  const { data: templates, isLoading } = useQuery({
    queryKey: ['custom-instruction-templates'],
    queryFn: listCustomInstructionTemplatesApi,
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {t('documents.configure.templateInstructionTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('documents.configure.templateInstructionDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {templates?.length === 0 && (
                <p className="col-span-2 text-sm text-muted-foreground text-center py-8">
                  {t('common.noResults')}
                </p>
              )}
              {templates?.map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card p-4 text-foreground cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all"
                  onClick={() => {
                    onSelect(template.instruction[locale]);
                    onOpenChange(false);
                  }}
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium">
                      {template.name[locale]}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {template.description[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
