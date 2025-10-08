import React from 'react';
import { BaseActionCard } from '@/src/components/Common';

interface SupportQuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  actionText: string;
  onClick: () => void;
}

export default function SupportQuickActionCard({
  title,
  description,
  icon,
  color,
  bgColor,
  hoverBgColor,
  textColor,
  actionText,
  onClick,
}: SupportQuickActionCardProps) {
  return (
    <BaseActionCard
      title={title}
      description={description}
      icon={icon}
      color={color}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      textColor={textColor}
      actionText={actionText}
      onClick={onClick}
    />
  );
}
