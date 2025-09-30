import CustomSvg from '@/components/ui/CustomSvg';
import React from 'react';

interface InfoItemProps {
  icon: string;
  title: string;
  description: string;
}

interface StaysFeatureProps {
  startDateTime?: number;
  endDateTime?: number;
  languages?: {
    nameAr: string;
    nameEn: string;
  }[];
  staysFeatures?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, description }) => (
  <div className='flex gap-2 items-start justify-start'>
    <CustomSvg src={icon} width={24} height={24} color='black' />
    <div className='flex flex-col justify-start'>
      <p className='font-custom-400 font-sans text-text_1 text-custom-16 mobileM:text-custom-18 laptopM:text-custom-20'>
        {title}
      </p>
      <p className='font-custom-400 font-sans text-text_3 text-custom-12 mobileM:text-custom-12 laptopM:text-custom-14'>
        {description}
      </p>
    </div>
  </div>
);

const StaysFeature: React.FC<StaysFeatureProps> = ({
  startDateTime,
  endDateTime,
  languages,
  staysFeatures,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {staysFeatures?.map((item, index) => <InfoItem key={index} {...item} />)}
    </div>
  );
};

export default StaysFeature;
