import React from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { DropdownContent, DropdownItem, OptionsButton } from './styles';
import { useTranslation } from '@/contexts/TranslationContext';
import { useUpdateNotifications } from '@/lib/apis/notifications/useUpdateNotifications';
import { useDeleteNotifications } from '@/lib/apis/notifications/useDeleteNotifications';
import { useQueryClient } from '@tanstack/react-query';
import { Notification } from '@/lib/types';

interface NotificationDropdownProps {
  notification: Notification;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notification,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useUpdateNotifications({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  const { mutate: deleteNotification } = useDeleteNotifications({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  const handleMarkAsRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    markAsRead({ id: notification._id });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(notification._id);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Dropdown
      trigger={<OptionsButton>⋯</OptionsButton>}
      content={
        <DropdownContent>
          <DropdownItem
            onClick={handleMarkAsRead}
            onMouseDown={handleMouseDown}
          >
            {notification.readAt ? (
              <p>{t('notifications.markAsUnread')}</p>
            ) : (
              <p>{t('notifications.markAsRead')}</p>
            )}
          </DropdownItem>
          <DropdownItem
            isDelete
            onClick={handleDelete}
            onMouseDown={handleMouseDown}
          >
            {t('notifications.delete')}
          </DropdownItem>
        </DropdownContent>
      }
      position='bottom-right'
    />
  );
};

export default NotificationDropdown;
