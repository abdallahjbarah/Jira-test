import React from 'react';
import CustomSvg from '@/components/ui/CustomSvg';

interface InfoItemProps {
  icon: string;
  title: string;
  description: string;
}

interface StaysFeatureProps {
  checkinTime?: string;
  checkoutTime?: string;
  languages?: {
    nameAr: string;
    nameEn: string;
  }[];
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, description }) => (
  <div className='flex gap-2 items-start justify-start'>
    <CustomSvg src={icon} width={24} height={24} color='black' />
    <div className='flex flex-col justify-start'>
      <p className='font-custom-400 font-sans text-text_1 text-custom-20'>
        {title}
      </p>
      <p className='font-custom-400 font-sans text-text_3 text-custom-14'>
        {description}
      </p>
    </div>
  </div>
);

const StaysFeature: React.FC<StaysFeatureProps> = ({
  checkinTime,
  checkoutTime,
  languages,
}) => {
  const infoItems = [
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Check-in',
      description: `${checkinTime} PM`,
    },
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Check-out',
      description: `${checkoutTime} PM`,
    },
    {
      icon: '/SVGs/shared/details-icons/spokenLanguageIcon.svg',
      title: 'Spoken Language',
      description:
        `${languages?.map(language => language.nameEn).join(', ') 
        } (Download a language translator app to communicate with host!)`,
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      {infoItems.map((item, index) => (
        <InfoItem key={index} {...item} />
      ))}
    </div>
  );
};

export default StaysFeature;
