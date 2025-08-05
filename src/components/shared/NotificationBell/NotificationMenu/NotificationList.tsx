import React, { useMemo } from 'react';
import { Notification } from '@/lib/types';
import {
  formatTimestamp,
  formatDateHeader,
  groupNotificationsByDate,
  reshapeNotification,
  getNotificationPath,
} from '@/utils/helpers/notificationHelpers';
import {
  DateLabel,
  DateSection,
  DateValue,
  NotificationItem,
  NotificationMessage,
  NotificationTitle,
  NotificationTypeIndicator,
  TimeAgo,
} from './styles';
import CustomLink from '@/components/ui/CustomLink';
import NotificationDropdown from './NotificationDropdown';

interface NotificationListProps {
  notifications: Notification[];
  locale: 'en' | 'ar';
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  locale,
}) => {
  const groupedNotifications = useMemo(
    () => groupNotificationsByDate(notifications),
    [notifications],
  );

  return (
    <>
      {Object.entries(groupedNotifications).map(([category, notifications]) => {
        if (notifications.length === 0) return null;

        return (
          <React.Fragment key={category}>
            <DateSection>
              <DateLabel>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </DateLabel>
              <DateValue>{formatDateHeader(category)}</DateValue>
            </DateSection>

            {notifications.map((notification: Notification) => {
              const notificationObject = reshapeNotification(notification);

              const path = getNotificationPath(notificationObject);

              return (
                <CustomLink key={notificationObject._id} path={path}>
                  <NotificationItem>
                    <div className='flex items-center justify-between'>
                      <NotificationTypeIndicator read={notification.readAt}>
                        {notificationObject.type[locale]
                          .charAt(0)
                          .toUpperCase() +
                          notificationObject.type[locale].slice(1)}{' '}
                      </NotificationTypeIndicator>

                      <NotificationDropdown notification={notification} />
                    </div>

                    <NotificationTitle className='flex items-center gap-2 justify-between'>
                      {notificationObject.title[locale]}
                      <TimeAgo className='text-text_1'>
                        {formatTimestamp(new Date(notification.createdAt))}
                      </TimeAgo>
                    </NotificationTitle>

                    <NotificationMessage className='text-text_3'>
                      {notificationObject.message[locale]}
                    </NotificationMessage>
                  </NotificationItem>
                </CustomLink>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NotificationList;
