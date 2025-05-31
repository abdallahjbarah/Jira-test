'use client';

import React from 'react';
import Image from 'next/image';
import { Continent } from '@/lib/types';
import { useTranslation } from '@/contexts/TranslationContext';

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
  continents?: Continent[];
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onSelectRegion,
  className = '',
  continents,
}) => {
  const { locale } = useTranslation();

  return (
    <div className={`flex justify-between ${className}`}>
      {continents?.map((continent) => (
        <div
          key={continent._id}
          onClick={() => onSelectRegion(continent._id as Region)}
          className={`flex flex-col items-center cursor-pointer transition-all ${
            selectedRegion === continent._id
              ? 'opacity-100'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div
            className={`w-16 h-16 relative overflow-hidden mb-2 ${
              selectedRegion === continent._id
                ? 'border border-solid border-[#222222] rounded-lg'
                : ''
            }`}
          >
            <Image
              src={continent.image}
              alt={continent.nameEn}
              fill
              className='object-contain'
            />
          </div>
          <span className='text-sm font-medium'>
            {locale === 'en' ? continent.nameEn : continent.nameAr}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RegionSelector;
