import React from 'react';
import { BaseHeader } from '@/src/components/Common';

interface SupportHeaderProps {
  title: string;
  description: string;
}

export default function SupportHeader({
  title,
  description,
}: SupportHeaderProps) {
  return <BaseHeader title={title} description={description} variant="page" />;
}
