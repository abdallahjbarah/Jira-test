import CustomSvg from '@/components/ui/CustomSvg';
import React from 'react';

const NotificationTrigger = ({
  unreadNotificationsCount,
  isOpen,
}: {
  unreadNotificationsCount: number;
  isOpen?: boolean;
}) => {
  return (
    <div
      className={`relative text-secondary_6 hover:text-primary_2 ${
        isOpen ? 'text-primary_2' : ''
      }`}
    >
      <CustomSvg
        src='/SVGs/shared/notifications-icon.svg'
        width={33}
        height={33}
        alt='notifications'
      />
      {!!unreadNotificationsCount && (
        <div className='absolute -top-1/2 translate-y-1/2 -right-1/2 -translate-x-1/2 w-[21px] h-[21px] bg-primary_2 rounded-full border border-white border-solid flex items-center justify-center'>
          <span className='text-white text-custom-10 font-custom-600 leading-[1px]'>
            {unreadNotificationsCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationTrigger;
