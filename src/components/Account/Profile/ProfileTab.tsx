import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  avatar?: string;
}

interface ProfileTabProps {
  userData: UserData;
}

export default function ProfileTab({ userData }: ProfileTabProps) {
  const t = useTranslations('common.profile.personalInfo');
  const tActions = useTranslations('common.profile.actions');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t('fullName')}</Label>
            <Input
              id="fullName"
              type="text"
              defaultValue={userData.fullName}
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('emailAddress')}</Label>
            <Input
              id="email"
              type="email"
              defaultValue={userData.email}
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phoneNumber')}</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={userData.phone}
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">{t('company')}</Label>
            <Input
              id="company"
              type="text"
              defaultValue={userData.company}
              className="focus-visible:ring-primary"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button variant="default" size="lg">
            {tActions('saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  );
}
