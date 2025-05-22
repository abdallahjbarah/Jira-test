import React from 'react';
import CustomSvg from '@/components/ui/CustomSvg';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import CustomLink from '@/components/ui/CustomLink';

interface ProfileMenuItemProps {
  label: string;
  sublabel?: string;
  icon: string;
  href: string;
  isExternal?: boolean;
  onClick?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  sublabel,
  icon,
  href,
  isExternal = false,
  onClick,
}) => {
  const content = (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-[#424242]'>
          <CustomSvg src={icon} width={24} height={24} alt={label} />
        </div>
        <div>
          <p className='text-sm font-semibold text-text_1'>{label}</p>
          {sublabel && <p className='text-xs text-text_3'>{sublabel}</p>}
        </div>
      </div>
      <ChevronRightIcon className='w-4 h-4 text-text_1' />
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className='block cursor-pointer'>
        {content}
      </div>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='block'
      >
        {content}
      </a>
    );
  }

  return (
    <CustomLink path={href} className='block'>
      {content}
    </CustomLink>
  );
};

export default ProfileMenuItem;
