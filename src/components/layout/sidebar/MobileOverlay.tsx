'use client';

import React from 'react';
import { MobileOverlayProps } from '@/src/types/sidebar';

export default function MobileOverlay({ isOpen, onClose }: MobileOverlayProps) {
  if (!isOpen) return null;
  return (
    <div
      className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
