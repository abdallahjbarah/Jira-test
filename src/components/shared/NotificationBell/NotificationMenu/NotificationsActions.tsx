'use client';

import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { ActionButton, ActionsContainer } from './styles';
import { useReadAllNotifications } from '@/lib/apis/notifications/useReadAllNotifications';
import { useDeleteAllNotifications } from '@/lib/apis/notifications/useDeleteAllNotifications';

interface NotificationsActionsProps {}

function NotificationsActions({}: NotificationsActionsProps): React.ReactElement {
  const { t } = useTranslation();
  const { mutate: readAllNotifications, isPending: isReadingAllNotifications } =
    useReadAllNotifications();
  const {
    mutate: deleteAllNotifications,
    isPending: isDeletingAllNotifications,
  } = useDeleteAllNotifications();

  const handleMarkAllAsRead = () => {
    readAllNotifications({});
  };

  const handleDeleteAll = () => {
    deleteAllNotifications({});
  };

  return (
    <ActionsContainer>
      <ActionButton
        isDelete
        onClick={handleDeleteAll}
        disabled={isDeletingAllNotifications}
      >
        {t('notifications.deleteAll')}
      </ActionButton>
      <ActionButton
        onClick={handleMarkAllAsRead}
        disabled={isReadingAllNotifications}
      >
        {t('notifications.markAllAsRead')}
      </ActionButton>
    </ActionsContainer>
  );
}

export default NotificationsActions;
