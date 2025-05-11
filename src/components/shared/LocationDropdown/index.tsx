'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';
import DestinationItem from './DestinationItem';
import RegionSelector, { Region, regions } from '../RegionSelector';

// Types for the component
type City = 'All' | 'Amman' | 'Ajloun' | 'Jarash' | 'Irbi';
type Destination = string;

interface LocationDropdownProps {
  onChange?: (value: string) => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({ onChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedCity, setSelectedCity] = useState<City>('All');
  const [displayValue, setDisplayValue] = useState('Search destinations');

  // City data - these would typically be filtered based on the selected region
  const cities: City[] = ['All', 'Amman', 'Ajloun', 'Jarash', 'Irbi'];

  // Suggested destinations
  const suggestedDestinations: Destination[] = [
    'Annual Agritech Expo',
    'Organic Farming Symposium',
    'Eco-Friendly Farm Tour',
    'Gourmet Cooking Class',
    'Eco-Friendly Farm Tour',
    'Seasonal Harvest Package',
    'Annual Agritech Expo',
    'Organic Farming Symposium',
  ];

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    // Reset city selection when changing regions
    if (region !== 'Jordan') {
      setSelectedCity('All');
    }
    updateDisplayValue(region, region === 'Jordan' ? selectedCity : 'All');
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    updateDisplayValue(selectedRegion as Region, city);
  };

  const handleDestinationSelect = (destination: string) => {
    setDisplayValue(destination);
    if (onChange) {
      onChange(destination);
    }
  };

  const updateDisplayValue = (region: Region, city: City) => {
    if (region === 'Flexible') {
      setDisplayValue("I'm flexible");
    } else if (region === 'Jordan' && city !== 'All') {
      setDisplayValue(city);
    } else if (region) {
      setDisplayValue(
        regions.find((r) => r.id === region)?.label || 'Search destinations',
      );
    } else {
      setDisplayValue('Search destinations');
    }

    if (onChange) {
      onChange(displayValue);
    }
  };

  const dropdownContent = (
    <div className='bg-white rounded-xl shadow-lg w-[460px] p-6'>
      {/* Region selection */}
      <RegionSelector
        selectedRegion={selectedRegion}
        onSelectRegion={handleRegionSelect}
        className='mb-6'
      />

      {/* City selection - only show when Jordan is selected */}
      {selectedRegion === 'Jordan' && (
        <div className='flex flex-wrap gap-2 mb-6'>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCity === city
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Suggested destinations */}
      <div>
        <h3 className='text-gray-500 mb-3'>Suggested destinations</h3>
        <div className='space-y-1'>
          {suggestedDestinations.map((destination, index) => (
            <DestinationItem
              key={index}
              title={destination}
              isHighlighted={index === 5}
              onClick={() => handleDestinationSelect(destination)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Dropdown
      trigger={
        <FilterBarItem
          title={{ en: 'Where', ar: 'الوجهة' }}
          value={displayValue || 'Search destinations'}
          onClick={() => {}}
        />
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default LocationDropdown;
