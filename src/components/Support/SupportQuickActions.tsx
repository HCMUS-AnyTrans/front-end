import React from 'react';
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
  const actions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'blue',
      bgColor: 'bg-blue-100',
      hoverBgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      actionText: 'Start chat',
      onClick: onLiveChat,
    },
    {
      title: 'Email Support',
      description: 'Response within 24 hours',
      icon: <Mail className="w-6 h-6" />,
      color: 'green',
      bgColor: 'bg-green-100',
      hoverBgColor: 'bg-green-600',
      textColor: 'text-green-600',
      actionText: 'Send email',
      onClick: onEmailSupport,
    },
    {
      title: 'Documentation',
      description: 'Guides and tutorials',
      icon: <Book className="w-6 h-6" />,
      color: 'purple',
      bgColor: 'bg-purple-100',
      hoverBgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      actionText: 'View docs',
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
