'use client';

import { useLocale } from 'next-intl';
import { ProfileAccountInfoSection } from './account-info-section';
import { ProfileAvatarSection } from './avatar-section';
import { ProfileTabFallback } from './tab.fallback';
import { ProfilePersonalInfoSection } from './personal-info-section';
import { useProfile } from '../../hooks/use-profile';
import { useProfileAvatarUpload } from '../../hooks/use-profile-avatar-upload';
import { useProfileForm } from '../../hooks/use-profile-form';
import { useUpdateProfile } from '../../hooks/use-update-profile';
import { useUploadAvatar } from '../../hooks/use-upload-avatar';
import { formatPhoneNumber, getInitials } from '../../utils/profile';

export function ProfileTab() {
  const locale = useLocale();

  const { profile, isLoading } = useProfile();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const { uploadAvatar, isUploading } = useUploadAvatar();
  const profileForm = useProfileForm({
    profile: profile ?? {
      id: '',
      email: '',
      fullName: '',
      phone: null,
      avatarUrl: null,
      emailVerified: false,
      isOAuthUser: false,
      createdAt: '',
      lastLoginAt: null,
    },
    onSave: (dto, options) =>
      updateProfile(dto, {
        onSuccess: () => {
          options?.onSuccess?.();
        },
      }),
  });

  const avatarUpload = useProfileAvatarUpload({
    onUploadAvatar: (payload, options) =>
      uploadAvatar(payload, {
        onSuccess: () => {
          options?.onSuccess?.();
        },
        onError: (error) => {
          options?.onError?.(error);
        },
      }),
    onRemoveAvatar: updateProfile,
  });

  if (isLoading || !profile) {
    return <ProfileTabFallback />;
  }

  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  const dateTimeFormatter = new Intl.DateTimeFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <div className="space-y-6">
      <ProfileAvatarSection
        helperText="JPG, PNG, WebP · Max 5 MB · 1:1 recommended"
        profile={profile}
        isUploading={isUploading}
        isUpdating={isUpdating}
        pendingFile={avatarUpload.pendingFile}
        cropOpen={avatarUpload.cropOpen}
        fileInputRef={avatarUpload.fileInputRef}
        getInitials={getInitials}
        onAvatarClick={avatarUpload.handleAvatarClick}
        onAvatarChange={avatarUpload.handleAvatarChange}
        onCropSave={avatarUpload.handleCropSave}
        onCropCancel={avatarUpload.handleCropCancel}
        onRemoveAvatar={avatarUpload.handleRemoveAvatar}
      />

      <ProfilePersonalInfoSection
        profile={profile}
        isEditing={profileForm.isEditing}
        isUpdating={isUpdating}
        formData={profileForm.formData}
        formattedPhone={formatPhoneNumber(profile.phone)}
        onStartEdit={profileForm.handleStartEdit}
        onCancel={profileForm.handleCancel}
        onSave={profileForm.handleSave}
        onFormChange={profileForm.setFormData}
      />

      <ProfileAccountInfoSection
        profileId={profile.id}
        memberSinceText={dateFormatter.format(new Date(profile.createdAt))}
        lastLoginText={
          profile.lastLoginAt
            ? dateTimeFormatter.format(new Date(profile.lastLoginAt))
            : '—'
        }
      />
    </div>
  );
}
