import { Notification } from '@/lib/types';
import { NotificationCategory, NotificationPaths } from '@/lib/enums';
import { format } from 'date-fns';

// Interface for localized content
export interface LocalizedContent {
  en: string;
  ar: string;
}

// Reshape notification object for localized display
export interface LocalizedNotification extends Notification {
  title: LocalizedContent;
  message: LocalizedContent;
  type: LocalizedContent;
}

export const reshapeNotification = (
  notification: Notification,
): LocalizedNotification => {
  return {
    ...notification,
    title: {
      en: notification.titleEn,
      ar: notification.titleAr,
    } as LocalizedContent,
    message: {
      en: notification.descriptionEn,
      ar: notification.descriptionAr,
    } as LocalizedContent,
    type: {
      en: notification.typeEn,
      ar: notification.typeAr,
    } as LocalizedContent,
  };
};

// Format timestamp helper function
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - timestamp.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else {
    return format(timestamp, 'hh:mm a');
  }
};

// Format date header helper function
export const formatDateHeader = (category: string): string => {
  if (category === NotificationCategory.TODAY) {
    return format(new Date(), 'MM/dd/yyyy');
  } else if (category === NotificationCategory.YESTERDAY) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return format(yesterday, 'MM/dd/yyyy');
  }
  return '';
};

// Group notifications by date
export const groupNotificationsByDate = (
  notifications: Notification[],
): Record<string, Notification[]> => {
  if (!notifications || notifications.length === 0)
    return {
      [NotificationCategory.TODAY]: [],
      [NotificationCategory.YESTERDAY]: [],
      [NotificationCategory.PREVIOUS_DAYS]: [],
    };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return notifications.reduce(
    (acc: Record<string, Notification[]>, notification: Notification) => {
      const notificationDate = new Date(notification.createdAt);
      notificationDate.setHours(0, 0, 0, 0);

      let key;
      if (notificationDate.getTime() === today.getTime()) {
        key = NotificationCategory.TODAY;
      } else if (notificationDate.getTime() === yesterday.getTime()) {
        key = NotificationCategory.YESTERDAY;
      } else {
        key = NotificationCategory.PREVIOUS_DAYS;
      }

      acc[key].push(notification);
      return acc;
    },
    {
      [NotificationCategory.TODAY]: [],
      [NotificationCategory.YESTERDAY]: [],
      [NotificationCategory.PREVIOUS_DAYS]: [],
    } as Record<string, Notification[]>,
  );
};

export const getNotificationPath = (
  notification: LocalizedNotification,
): string => {
  const path = notification.path;

  switch (path) {
    case NotificationPaths.Bookings:
      return `/my-bookings/${notification.pathId}`;
    case NotificationPaths.Offers:
      return `/offers`;
    case NotificationPaths.newUpdates:
      return `/offers`;
    case NotificationPaths.Thanks:
      return `/thanks`;
    default:
      return '';
  }
};
