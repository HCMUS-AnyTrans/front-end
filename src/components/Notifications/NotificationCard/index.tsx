'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, ChevronRight, Pin } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';
import { NotificationIcon } from './NotificationIcon';
import { NotificationActions } from './NotificationActions';
import { NotificationMetadata } from './NotificationMetadata';
import { useNotificationCardStyles } from './useNotificationCardStyles';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  notification: NotificationItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onToggleRead: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
  formatTimestamp: (date: Date) => string;
};

const NotificationCard = memo(function NotificationCard({
  notification,
  isSelected,
  onToggleSelect,
  onToggleRead,
  onTogglePin,
  onDelete,
  formatTimestamp,
}: Props) {
  const t = useTranslations('notifications.card');
  const { cardClassName, titleClassName } = useNotificationCardStyles(
    notification,
    isSelected
  );

  return (
    <div className={cardClassName}>
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            className="mt-0.5 sm:mt-1 w-4 h-4 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />

          <NotificationIcon type={notification.type} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                  {notification.isPinned && (
                    <Pin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                  <h3 className={titleClassName}>{notification.title}</h3>
                  {!notification.isRead && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {notification.description}
                </p>
              </div>

              <NotificationActions
                notification={notification}
                onToggleRead={onToggleRead}
                onTogglePin={onTogglePin}
                onDelete={onDelete}
              />
            </div>

            <NotificationMetadata metadata={notification.metadata} />

            <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {formatTimestamp(notification.timestamp)}
                </span>
                <span>•</span>
                <span className="capitalize">{notification.category}</span>
              </div>
              {notification.category === 'translation' && (
                <Button
                  variant="link"
                  className="text-xs p-0 h-auto font-medium"
                >
                  {t('viewDetails')}
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NotificationCard;
