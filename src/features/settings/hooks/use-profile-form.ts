'use client';

import { useCallback, useState } from 'react';
import type { UpdateProfileDto, UserProfile } from '../types';

interface UseProfileFormOptions {
  profile: UserProfile;
  onSave: (dto: UpdateProfileDto, options?: { onSuccess?: () => void }) => void;
}

export function useProfileForm({ profile, onSave }: UseProfileFormOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  const handleStartEdit = useCallback(() => {
    setFormData({
      fullName: profile.fullName,
      phone: profile.phone || '',
    });
    setIsEditing(true);
  }, [profile.fullName, profile.phone]);

  const handleCancel = useCallback(() => {
    setFormData({
      fullName: profile.fullName,
      phone: profile.phone || '',
    });
    setIsEditing(false);
  }, [profile.fullName, profile.phone]);

  const handleSave = useCallback(() => {
    onSave(
      {
        fullName: formData.fullName,
        phone: formData.phone || null,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  }, [formData.fullName, formData.phone, onSave]);

  return {
    isEditing,
    formData,
    setFormData,
    handleStartEdit,
    handleCancel,
    handleSave,
  };
}
