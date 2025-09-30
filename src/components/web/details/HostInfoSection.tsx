import Image from 'next/image';
import React from 'react';

interface Host {
  _id: string;
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  description: string;
}

interface CoHost {
  firstName: string;
  lastName: string;
  description: string;
  languages: {
    _id: string;
    nameAr: string;
    nameEn: string;
  }[];
  image?: string;
}

interface HostInfoSectionProps {
  hosts?: Host;
  coHosts?: CoHost;
}

const HostInfoSection: React.FC<HostInfoSectionProps> = ({
  hosts,
  coHosts,
}) => (
  <div className='flex flex-col gap-10'>
    <div className='flex gap-3 items-start mobileM:gap-3 laptopM:gap-4'>
      <div className='rounded-full w-[50px] h-[50px] mobileM:w-[60px] mobileM:h-[60px] laptopM:w-[80px] laptopM:h-[80px] flex-shrink-0'>
        <Image
          src={hosts?.profileImageUrl || ''}
          alt='host'
          width={80}
          height={80}
          className='w-full h-full object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col gap-1 justify-start'>
        <p className='font-custom-700 text-text_1 text-custom-16 mobileM:text-custom-22 laptopM:text-custom-30'>
          Host information
        </p>
        <p className='font-custom-400 font-sems text-text_3 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20'>
          {hosts?.description}
        </p>
      </div>
    </div>
    <div className='flex gap-4 items-start'>
      <div className='rounded-full w-[50px] h-[50px] mobileM:w-[60px] mobileM:h-[60px] laptopM:w-[80px] laptopM:h-[80px] flex-shrink-0'>
        <Image
          src={coHosts?.image || '/images/placeholder.jpg'}
          alt='co-host'
          width={80}
          height={80}
          className='w-full h-full object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col gap-1 justify-start'>
        <p className='font-custom-700 text-text_1 text-custom-16 mobileM:text-custom-22 laptopM:text-custom-30'>
          Co-Host information
        </p>
        <p className='font-custom-400 font-sems text-text_3 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20'>
          {coHosts?.firstName} {coHosts?.lastName} • Hosted in{' '}
          {coHosts?.languages.map(language => language.nameEn).join(', ')}
        </p>
        <p className='font-custom-400 font-sems text-text_3 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20'>
          {coHosts?.description}
        </p>
      </div>
    </div>
  </div>
);

export default HostInfoSection;
