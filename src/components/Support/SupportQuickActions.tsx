'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Book } from 'lucide-react';
import { BaseActionCard } from '@/components/Common';

interface SupportQuickActionsProps {
  onLiveChat: () => void;
  onEmailSupport: () => void;
  onDocumentation: () => void;
}

export default function SupportQuickActions({
  onLiveChat,
  onEmailSupport,
  onDocumentation,
}: SupportQuickActionsProps) {
  const t = useTranslations('support.quickActions');

  const actions = [
    {
      title: t('liveChat.title'),
      description: t('liveChat.description'),
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'blue',
      bgColor: 'bg-blue-100',
      hoverBgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      actionText: t('liveChat.action'),
      onClick: onLiveChat,
    },
    {
      title: t('emailSupport.title'),
      description: t('emailSupport.description'),
      icon: <Mail className="w-6 h-6" />,
      color: 'green',
      bgColor: 'bg-green-100',
      hoverBgColor: 'bg-green-600',
      textColor: 'text-green-600',
      actionText: t('emailSupport.action'),
      onClick: onEmailSupport,
    },
    {
      title: t('documentation.title'),
      description: t('documentation.description'),
      icon: <Book className="w-6 h-6" />,
      color: 'purple',
      bgColor: 'bg-purple-100',
      hoverBgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      actionText: t('documentation.action'),
      onClick: onDocumentation,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {actions.map((action, index) => (
        <BaseActionCard key={index} {...action} />
      ))}
    </div>
  );
}
