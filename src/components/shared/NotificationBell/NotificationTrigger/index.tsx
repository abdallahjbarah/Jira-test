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
      className={`relative text-secondary_6 hover:text-primary_6 ${
        isOpen ? 'text-primary_6' : ''
      }`}
    >
      <CustomSvg
        src='/SVGs/shared/notifications-icon.svg'
        className='!w-[25px] !h-[25px] laptopM:!w-[33px] laptopM:!h-[33px] block'
        width='100%'
        height='100%'
        alt='notifications'
      />
      {!!unreadNotificationsCount && (
        <div className='absolute -top-1/2 translate-y-1/2 -right-1/2 -translate-x-1/2 w-[21px] h-[21px] bg-primary_6 rounded-full border border-white border-solid flex items-center justify-center'>
          <span className='text-white text-custom-10 font-custom-600 leading-[1px]'>
            {unreadNotificationsCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationTrigger;
