'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from '../data';
import type { CroppedAreaPixels } from '../components/profile/avatar-crop-modal';
import type { UpdateProfileDto } from '../types';

interface UseProfileAvatarUploadOptions {
  onUploadAvatar: (
    payload: { file: File; cropData: CroppedAreaPixels },
    options?: {
      onSuccess?: () => void;
      onError?: (error: unknown) => void;
    },
  ) => void;
  onRemoveAvatar: (dto: UpdateProfileDto) => void;
}

export function useProfileAvatarUpload({
  onUploadAvatar,
  onRemoveAvatar,
}: UseProfileAvatarUploadOptions) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error('Unsupported file type. Please use JPG, PNG, or WebP.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Maximum size is 5 MB.');
        return;
      }

      setPendingFile(file);
      setCropOpen(true);
    },
    [],
  );

  const handleCropSave = useCallback(
    (cropArea: CroppedAreaPixels) => {
      if (!pendingFile) return;

      setCropOpen(false);
      onUploadAvatar(
        { file: pendingFile, cropData: cropArea },
        {
          onSuccess: () => toast.success('Avatar updated successfully.'),
          onError: (err) =>
            toast.error(getErrorMessage(err) || 'Failed to update avatar.'),
        },
      );
      setPendingFile(null);
    },
    [onUploadAvatar, pendingFile],
  );

  const handleCropCancel = useCallback(() => {
    setCropOpen(false);
    setPendingFile(null);
  }, []);

  const handleRemoveAvatar = useCallback(() => {
    onRemoveAvatar({ avatarUrl: null });
  }, [onRemoveAvatar]);

  return {
    pendingFile,
    cropOpen,
    fileInputRef,
    handleAvatarClick,
    handleAvatarChange,
    handleCropSave,
    handleCropCancel,
    handleRemoveAvatar,
  };
}
