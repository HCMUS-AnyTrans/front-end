'use client';

import React from 'react';
import { UserData, Session } from '@/types/account';
import { ShowPasswords } from '@/components/Account/Profile/ChangePasswordSection';
import {
  ProfilePictureSection,
  PersonalInfoForm,
  ChangePasswordSection,
  TwoFactorToggle,
  ActiveSessionsList,
  ProfileSaveBar,
} from '@/components/Account/Profile';

interface ProfileTabContentProps {
  contentSpacing: string;
  showPasswords: ShowPasswords;
  onTogglePasswordVisibility: (field: keyof ShowPasswords) => void;
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
  sessions: Session[];
  onRevokeSession: (sessionId: string) => void;
  onSignOutAllOthers: () => void;
}

export function ProfileTabContent({
  contentSpacing,
  showPasswords,
  onTogglePasswordVisibility,
  userData,
  onUpdateUserData,
  sessions,
  onRevokeSession,
  onSignOutAllOthers,
}: ProfileTabContentProps) {
  return (
    <div className={contentSpacing}>
      <ProfilePictureSection user={userData} onUploadClick={() => {}} />
      <PersonalInfoForm user={userData} onChange={(p) => onUpdateUserData(p)} />
      <ChangePasswordSection
        show={showPasswords}
        onToggle={onTogglePasswordVisibility}
      />
      <TwoFactorToggle enabled={false} onToggle={() => {}} />
      <ActiveSessionsList
        sessions={sessions}
        onRevoke={onRevokeSession}
        onSignOutAllOthers={onSignOutAllOthers}
      />
      <ProfileSaveBar onCancel={() => {}} onSave={() => {}} />
    </div>
  );
}
