"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  currentAvatar?: string;
  userName: string;
  onAvatarChange?: (file: File) => void;
}

export default function AvatarUploader({ currentAvatar, userName, onAvatarChange }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Call callback if provided
      onAvatarChange?.(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={previewUrl || undefined} alt={userName} />
          <AvatarFallback className="bg-[#19398f] text-white text-2xl font-semibold">
            {userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <button
          onClick={handleButtonClick}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#19398f] text-white rounded-full flex items-center justify-center hover:bg-[#142457] transition-colors cursor-pointer"
          aria-label="Change avatar"
        >
          <Camera size={16} />
        </button>
      </div>

      <Button
        variant="outline"
        onClick={handleButtonClick}
        className="cursor-pointer"
      >
        <Upload size={16} className="mr-2" />
        Change Avatar
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select avatar image"
      />
      
      <p className="text-sm text-[#717680] text-center font-nunito">
        Upload a new avatar. Max size: 5MB
      </p>
    </div>
  );
}
