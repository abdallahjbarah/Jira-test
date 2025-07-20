'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { Notification } from '@/lib/types';
import { IntersectionObserverTrigger } from '../../IntersectionObserverTrigger';
import {
  NotificationContainer,
  NotificationHeader,
  NotificationContent,
  NotificationFooter,
} from './styles';
import NotificationList from './NotificationList';
import NotificationDropdown from './NotificationDropdown';
import NotificationsActions from './NotificationsActions';
import CircularLoader from '@/components/ui/CircularLoader';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

export { NotificationDropdown };

interface NotificationMenuProps {
  notifications: Notification[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
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

  const handleIntersect = React.useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <NotificationContainer>
        <div className='flex justify-center items-center h-[400px]'>
          <CircularLoader size={40} />
        </div>
      </NotificationContainer>
    );
  }

  if (error) {
    return (
      <NotificationContainer>
        <div className='p-5'>Error loading notifications</div>
      </NotificationContainer>
    );
  }

  if (notifications.length === 0) {
    return (
      <NotificationContainer>
        <NotificationHeader>
          {t('notifications.notifications')}
        </NotificationHeader>
        <NotificationContent className='flex flex-col items-center justify-center min-h-[400px] p-5'>
          <Image
            src='/SVGs/shared/notifications-empty.svg'
            alt='notifications'
            width={156}
            height={156}
          />
          <p className='font-custom-700 text-custom-24 mt-14'>
            {t('notifications.noNotifications')}
          </p>
        </NotificationContent>
      </NotificationContainer>
    );
  }

  return (
    <NotificationContainer>
      <NotificationHeader>
        {t('notifications.notifications')}
      </NotificationHeader>

      <NotificationContent className='customScroll'>
        <NotificationList
          notifications={notifications}
          locale={locale as 'en' | 'ar'}
        />

        {isFetchingNextPage && (
          <div className='flex items-center justify-center py-4'>
            <CircularLoader size={40} />
          </div>
        )}

        {hasNextPage && notifications.length > 0 && (
          <IntersectionObserverTrigger
            onIntersect={handleIntersect}
            enabled={hasNextPage && !isFetchingNextPage}
            className='h-4'
          />
        )}
      </NotificationContent>

      {!!notifications.length && (
        <NotificationFooter>
          <NotificationsActions />
        </NotificationFooter>
      )}
    </NotificationContainer>
  );
}

export default NotificationMenu;
