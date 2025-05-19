'use client';

import { useFetchNotifications } from '@/lib/apis/notifications/useFetchNotifications';
import { NotificationCategory } from '@/lib/enums';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import Dropdown from '@/components/ui/Dropdown';
import CustomSvg from '@/components/ui/CustomSvg';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

const NotificationContainer = styled.div`
  width: 360px;
  background-color: white;
  padding-block: 26px;
  border-top-left-radius: 24px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  border: 1px solid #f4f4f4;
  transition: all 0.3s ease;

  &::before {
    content: '';
    width: 56px;
    height: 67px;
    transform: rotate(90deg);
    border-bottom-right-radius: 50px;
    background-color: #fe360a;
    position: absolute;
    top: -5px;
    right: 0;
  }
`;

const NotificationHeader = styled.div`
  font-weight: 400;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: 0%;
`;

const DateSection = styled.div`
  background-color: #cdefbd;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const DateLabel = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
`;

const DateValue = styled.span`
  color: #666;
  font-size: 14px;
  line-height: 100%;
`;

const NotificationItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTypeIndicator = styled.div<{ read?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 12px;

  &::before {
    content: '';
    display: ${(props) => (props.read ? 'none' : 'inline-block')};
    width: 8px;
    height: 8px;
    background-color: #4caf50;
    border-radius: 50%;
    margin-right: 6px;
    align-self: center;
  }
`;

const NotificationTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const TimeAgo = styled.span`
  font-size: 12px;
`;

const NotificationMessage = styled.div`
  font-size: 14px;
  line-height: 100%;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button<{ isDelete?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.isDelete ? '#f44336' : '#333')};
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 18px;
  padding: 0;
`;

const DropdownContent = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 160px;
  overflow: hidden;
`;

const DropdownItem = styled.button<{ isDelete?: boolean }>`
  display: block;
  width: 100%;
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.isDelete ? '#f44336' : '#333')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

function NotificationMenu(): React.ReactElement {
  const { data, isLoading, error } = useFetchNotifications();
  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null);

  // Group notifications by "Today", "Yesterday", "Previous Days"
  const groupedNotifications = useMemo(() => {
    if (!data) return { Today: [], Yesterday: [], 'Previous Days': [] };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return data.reduce(
      (acc, notification) => {
        const notificationDate = new Date(notification.timestamp);
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
      } as Record<string, any[]>,
    );
  }, [data]);

  const formatTimestamp = (timestamp: Date): string => {
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

  const formatDateHeader = (category: string): string => {
    if (category === NotificationCategory.TODAY) {
      return format(new Date(), 'MM/dd/yyyy');
    } else if (category === NotificationCategory.YESTERDAY) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return format(yesterday, 'MM/dd/yyyy');
    }
    return '';
  };

  const handleOptionsClick = (notificationId: string) => {
    setSelectedNotification(notificationId);
  };

  const handleMarkAsRead = (notificationId: string) => {
    // Implement mark as read functionality
    console.log('Mark as read', notificationId);
  };

  const handleDelete = (notificationId: string) => {
    // Implement delete functionality
    console.log('Delete', notificationId);
  };

  const handleMarkAllAsRead = () => {
    // Implement mark all as read functionality
    console.log('Mark all as read');
  };

  const handleDeleteAll = () => {
    // Implement delete all functionality
    console.log('Delete all');
  };

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <NotificationContainer className='p-5'>
        Loading notifications...
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

  if (!data?.length) {
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
        Notifications
      </NotificationHeader>

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

            {notifications.map((notification) => (
              <NotificationItem key={notification.id}>
                <div className='flex items-center justify-between'>
                  <NotificationTypeIndicator read={notification.read}>
                    {notification.type.charAt(0).toUpperCase() +
                      notification.type.slice(1)}{' '}
                  </NotificationTypeIndicator>

                  <Dropdown
                    trigger={<OptionsButton>⋯</OptionsButton>}
                    content={
                      <DropdownContent>
                        <DropdownItem
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </DropdownItem>
                        <DropdownItem
                          isDelete
                          onClick={() => handleDelete(notification.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    }
                    position='bottom-right'
                  />
                </div>

                <NotificationTitle className='flex items-center gap-2 justify-between'>
                  {notification.title.en}
                  <TimeAgo className='text-text_1'>
                    {formatTimestamp(new Date(notification.timestamp))}
                  </TimeAgo>
                </NotificationTitle>

                <NotificationMessage className='text-text_3'>
                  {notification.message.en}
                </NotificationMessage>
              </NotificationItem>
            ))}
          </React.Fragment>
        );
      })}

      <ActionsContainer>
        <ActionButton isDelete onClick={handleDeleteAll}>
          Delete All
        </ActionButton>
        <ActionButton onClick={handleMarkAllAsRead}>Mark as read</ActionButton>
      </ActionsContainer>
    </NotificationContainer>
  );
}

export default NotificationMenu;
