import CustomSvg from '@/components/ui/CustomSvg';
import React from 'react';

function HeaderNotification(): React.ReactElement {
  return (
    <div className='flex items-center gap-2'>
      <div className='relative text-secondary_6 hover:text-primary_2 cursor-pointer'>
        <CustomSvg
          src='/SVGs/shared/notifications-icon.svg'
          width={33}
          height={33}
          alt='notifications'
        />
        <div className='absolute -top-1/2 translate-y-1/2 -right-1/2 -translate-x-1/2 w-[21px] h-[21px] bg-primary_2 rounded-full border border-white border-solid flex items-center justify-center'>
          <span className='text-white text-custom-10 font-custom-600 leading-[1px]'>
            1
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderNotification;
