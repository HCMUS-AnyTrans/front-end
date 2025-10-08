export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type NotificationCategory = 'translation' | 'billing' | 'system';

export type NotificationMetadata = {
  fileName?: string;
  wordsTranslated?: number;
  creditsUsed?: number;
  creditsRemaining?: number;
  totalCredits?: number;
};

export type NotificationItem = {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  isPinned: boolean;
  metadata?: NotificationMetadata;
};

export type NotificationsStats = {
  total: number;
  unread: number;
  translation: number;
  billing: number;
  system: number;
};

export type NotificationFilter = {
  id: 'all' | 'unread' | NotificationCategory;
  label: string;
  count: number;
};
