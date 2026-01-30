'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { UserData } from '@/types/account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

type PersonalInfoFormProps = {
  user: UserData;
  onChange?: (partial: Partial<UserData>) => void;
};

export default function PersonalInfoForm({
  user,
  onChange,
}: PersonalInfoFormProps) {
  const t = useTranslations('common.profile.personalInfo');

  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm font-semibold text-gray-900"
          >
            {t('fullName')}
          </Label>
          <Input
            id="fullName"
            type="text"
            defaultValue={user.fullName}
            onChange={(e) => onChange?.({ fullName: e.target.value })}
            className="focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-gray-900"
          >
            {t('emailAddress')}
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue={user.email}
            disabled
            className="bg-gray-50 text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-semibold text-gray-900"
          >
            {t('phoneNumber')}
          </Label>
          <Input
            id="phone"
            type="tel"
            defaultValue={user.phone}
            onChange={(e) => onChange?.({ phone: e.target.value })}
            className="focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="company"
            className="text-sm font-semibold text-gray-900"
          >
            {t('company')}
          </Label>
          <Input
            id="company"
            type="text"
            defaultValue={user.company}
            onChange={(e) => onChange?.({ company: e.target.value })}
            className="focus-visible:ring-primary"
          />
        </div>
      </div>
    </Card>
  );
}
