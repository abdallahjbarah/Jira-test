import React from 'react';
import Image from 'next/image';

interface Host {
  image: string;
  name: string;
  languages: string;
  description: string;
}

interface HostInfoSectionProps {
  hosts: Host[];
}

const HostInfoSection: React.FC<HostInfoSectionProps> = ({ hosts }) => (
  <div className='flex flex-col gap-10'>
    {hosts.map((host, idx) => (
      <div className='flex gap-4 items-start' key={idx}>
        <div className='rounded-full w-20 h-20 flex-shrink-0'>
          <Image
            src={host.image}
            alt='host'
            width={80}
            height={80}
            className='w-full h-full object-cover rounded-full'
          />
        </div>
        <div className='flex flex-col gap-1 justify-start'>
          <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
            {host.name}
          </p>
          <p className='font-custom-400 font-sems text-text_3 text-custom-28'>
            {host.languages}
            <br />
            {host.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default HostInfoSection; 