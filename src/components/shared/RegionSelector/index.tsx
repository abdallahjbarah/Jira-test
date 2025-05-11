'use client';

import React from 'react';
import Image from 'next/image';

// Types for regions
export type Region =
  | 'MenaRegion'
  | 'Flexible'
  | 'Jordan'
  | 'Europe'
  | 'Africa'
  | null;

// Region data
export const regions = [
  {
    id: 'MenaRegion',
    label: 'Mena Region',
    icon: '/SVGs/shared/map-icons/mena-egion-icon.svg',
  },
  {
    id: 'Flexible',
    label: "I'm flexible",
    icon: '/SVGs/shared/map-icons/flexible-icon.svg',
  },
  {
    id: 'Jordan',
    label: 'Jordan',
    icon: '/SVGs/shared/map-icons/jordan-icon.svg',
  },
  {
    id: 'Europe',
    label: 'Europe',
    icon: '/SVGs/shared/map-icons/europe-icon.svg',
  },
  {
    id: 'Africa',
    label: 'Africa',
    icon: '/SVGs/shared/map-icons/africa-icon.svg',
  },
];

interface RegionSelectorProps {
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  className?: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onSelectRegion,
  className = '',
}) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {regions.map((region) => (
        <div
          key={region.id}
          onClick={() => onSelectRegion(region.id as Region)}
          className={`flex flex-col items-center cursor-pointer transition-all ${
            selectedRegion === region.id
              ? 'opacity-100'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div
            className={`w-16 h-16 relative overflow-hidden mb-2 ${
              selectedRegion === region.id
                ? 'border border-solid border-[#222222] rounded-lg'
                : ''
            }`}
          >
            <Image
              src={region.icon}
              alt={region.label}
              fill
              className='object-contain'
            />
          </div>
          <span className='text-sm font-medium'>{region.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RegionSelector;
