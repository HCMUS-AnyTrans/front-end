'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

type ProfileSaveBarProps = {
  onCancel: () => void;
  onSave: () => void;
};

export default function ProfileSaveBar({
  onCancel,
  onSave,
}: ProfileSaveBarProps) {
  const t = useTranslations('common.profile.actions');

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-3">
      <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
        {t('cancel')}
      </Button>
      <Button variant="gradient" onClick={onSave} className="w-full sm:w-auto">
        {t('saveChanges')}
      </Button>
    </div>
  );
}
