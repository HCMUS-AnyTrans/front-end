'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type ShowPasswords = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

type ChangePasswordSectionProps = {
  show: ShowPasswords;
  onToggle: (field: keyof ShowPasswords) => void;
};

function PasswordInput({
  id,
  label,
  show,
  onToggle,
}: {
  id: string;
  label: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          className="pr-10 focus-visible:ring-primary"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function ChangePasswordSection({
  show,
  onToggle,
}: ChangePasswordSectionProps) {
  const t = useTranslations('common.profile.changePassword');

  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {t('changePassword')}
        </h4>
        <div className="space-y-3">
          <PasswordInput
            id="currentPassword"
            label={t('currentPassword')}
            show={show.current}
            onToggle={() => onToggle('current')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PasswordInput
              id="newPassword"
              label={t('newPassword')}
              show={show.new}
              onToggle={() => onToggle('new')}
            />

            <PasswordInput
              id="confirmPassword"
              label={t('confirmPassword')}
              show={show.confirm}
              onToggle={() => onToggle('confirm')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
