'use client';

import { Camera, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SettingsSection } from '../shared/settings-section';
import { AvatarCropModal, type CroppedAreaPixels } from './avatar-crop-modal';
import type { UserProfile } from '../../types';

interface ProfileAvatarSectionProps {
  helperText: string;
  profile: UserProfile;
  isUploading: boolean;
  isUpdating: boolean;
  pendingFile: File | null;
  cropOpen: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  getInitials: (name: string) => string;
  onAvatarClick: () => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCropSave: (cropArea: CroppedAreaPixels) => void;
  onCropCancel: () => void;
  onRemoveAvatar: () => void;
}

export function ProfileAvatarSection({
  helperText,
  profile,
  isUploading,
  isUpdating,
  pendingFile,
  cropOpen,
  fileInputRef,
  getInitials,
  onAvatarClick,
  onAvatarChange,
  onCropSave,
  onCropCancel,
  onRemoveAvatar,
}: ProfileAvatarSectionProps) {
  const t = useTranslations('settings.profile');

  return (
    <SettingsSection title={t('avatar')}>
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="size-20">
            <AvatarImage
              src={profile.avatarUrl || undefined}
              alt={profile.fullName}
            />
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(profile.fullName)}
            </AvatarFallback>
          </Avatar>
          {isUploading ? (
            <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm">
              <Loader2 className="size-3.5 animate-spin" />
            </div>
          ) : (
            <button
              onClick={onAvatarClick}
              className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Camera className="size-3.5" />
            </button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onAvatarClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {t('changeAvatar')}
                </>
              ) : (
                t('changeAvatar')
              )}
            </Button>
            {profile.avatarUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={onRemoveAvatar}
                disabled={isUploading || isUpdating}
              >
                <X className="size-4" />
                {t('removeAvatar')}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{helperText}</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onAvatarChange}
          className="hidden"
        />

        <AvatarCropModal
          open={cropOpen}
          file={pendingFile}
          onSave={onCropSave}
          onCancel={onCropCancel}
        />
      </div>
    </SettingsSection>
  );
}
