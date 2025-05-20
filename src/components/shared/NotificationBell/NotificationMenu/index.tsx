'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { Notification } from '@/lib/types';
import { IntersectionObserverTrigger } from '../../IntersectionObserverTrigger';
import { NotificationContainer, NotificationHeader } from './styles';
import NotificationList from './NotificationList';
import NotificationDropdown from './NotificationDropdown';
import NotificationsActions from './NotificationsActions';
import CircularLoader from '@/components/ui/CircularLoader';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

// Export the NotificationDropdown component for reuse
export { NotificationDropdown };

interface NotificationMenuProps {
  notifications: Notification[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

function NotificationMenu({
  notifications,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: NotificationMenuProps): React.ReactElement {
  const { t, locale } = useTranslation();

  if (isLoading) {
    return (
      <NotificationContainer className='p-5 flex justify-center items-center'>
        <CircularLoader size={40} />
      </NotificationContainer>
    );
  }

  if (error) {
    return (
      <NotificationContainer className='p-5'>
        Error loading notifications
      </NotificationContainer>
    );
  }

  if (notifications.length === 0) {
    return (
      <NotificationContainer className='flex flex-col items-center justify-center max-h-[800px] h-[800px]'>
        <Image
          src='/SVGs/shared/notifications-empty.svg'
          alt='notifications'
          width={156}
          height={156}
        />
        <p className='font-custom-700 text-custom-24 mt-14'>
          {t('notifications.noNotifications')}
        </p>
      </NotificationContainer>
    );
  }

  return (
    <NotificationContainer>
      <NotificationHeader className='mb-[32px] px-[11px]'>
        {t('notifications.notifications')}
      </NotificationHeader>

      <NotificationList
        notifications={notifications}
        locale={locale as 'en' | 'ar'}
      />

      {isFetchingNextPage && (
        <div className='flex items-center justify-center py-2'>
          <CircularLoader size={40} />
        </div>
      )}

      {hasNextPage && notifications.length > 0 && (
        <IntersectionObserverTrigger
          onIntersect={() => {
            console.log('onIntersect');
            if (!isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          enabled={hasNextPage && !isFetchingNextPage}
          className='h-4'
        />
      )}

      {!!notifications.length && <NotificationsActions />}
    </NotificationContainer>
  );
}

export default NotificationMenu;
