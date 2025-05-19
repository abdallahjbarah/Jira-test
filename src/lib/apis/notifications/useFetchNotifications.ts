// Notification mock data based on the provided image
// /notification/list/{userId}

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export type NotificationType = 'booking' | 'announcement' | 'offer';

export interface Notification {
  id: string;
  type: NotificationType;
  title: {
    ar: string;
    en: string;
  };
  message: {
    ar: string;
    en: string;
  };
  timestamp: Date; // Actual timestamp, not formatted string
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: {
      ar: 'العنوان العربي',
      en: 'Notification Title',
    },
    message: {
      ar: 'الرسالة العربية',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod',
    },
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    read: true,
  },
  {
    id: '2',
    type: 'announcement',
    title: {
      ar: 'العنوان العربي',
      en: 'Notification Title',
    },
    message: {
      ar: 'الرسالة العربية',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod',
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    read: true,
  },
  {
    id: '3',
    type: 'offer',
    title: {
      ar: 'العنوان العربي',
      en: 'Notification Title',
    },
    message: {
      ar: 'الرسالة العربية',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod',
    },
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    read: false,
  },
  {
    id: '4',
    type: 'booking',
    title: {
      ar: 'العنوان العربي',
      en: 'Notification Title',
    },
    message: {
      ar: 'الرسالة العربية',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod',
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday at 12:20:20 PM
    read: false,
  },
  {
    id: '5',
    type: 'booking',
    title: {
      ar: 'العنوان العربي',
      en: 'Notification Title',
    },
    message: {
      ar: 'الرسالة العربية',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod',
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday at 12:20:20 PM
    read: false,
  },
];

const fetchNotifications = async (): Promise<Notification[]> => {
  // delay for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockNotifications;
};

export const useFetchNotifications = (
  queryOptions?: UseQueryOptions<Notification[], Error>,
) =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    ...queryOptions,
  });
