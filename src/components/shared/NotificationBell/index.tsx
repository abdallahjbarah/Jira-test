'use client';

import CustomSvg from '@/components/ui/CustomSvg';
import React from 'react';
import NotificationMenu from './NotificationMenu';
import Dropdown from '@/components/ui/Dropdown';
import NotificationTrigger from './NotificationTrigger';
import { useFetchInfiniteNotifications } from '@/lib/apis/notifications/useFetchNotifications';
import useUser from '@/utils/hooks/useUser';
import { Notification } from '@/lib/types';

function NotificationBell(): React.ReactElement {
  const { userData } = useUser();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteNotifications(userData?.user._id || '', {
    limit: 10,
  });

  const notificationsData: Notification[] = React.useMemo(() => {
    return data?.pages.flatMap((page: any) => page.notifications) || [];
  }, [data]);

  const unreadCount = React.useMemo(() => {
    return data?.pages?.[0]?.unreadCount || 0;
  }, [data]);

  return (
    <div className='flex items-center gap-2'>
      <Dropdown
        trigger={<NotificationTrigger unreadNotificationsCount={unreadCount} />}
        content={
          <NotificationMenu
            notifications={notificationsData}
            isLoading={isLoading}
            error={error}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        }
        position='bottom-right'
        contentClassName='max-h-[800px] overflow-y-auto'
      />
    </div>
  );
}

export default NotificationBell;
