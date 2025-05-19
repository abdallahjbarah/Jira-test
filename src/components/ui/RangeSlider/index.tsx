'use client';

import React, { useState, useEffect } from 'react';
import RangeSliderInput from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './styles.css';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  currency?: string;
  className?: string;
  activeColor?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  currency = 'JOD',
  className = '',
  activeColor = 'bg-primary_1',
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [minInputValue, setMinInputValue] = useState<string>(
    value[0].toString(),
  );
  const [maxInputValue, setMaxInputValue] = useState<string>(
    value[1].toString(),
  );

  useEffect(() => {
    setLocalValue(value);
    setMinInputValue(value[0].toString());
    setMaxInputValue(value[1].toString());
  }, [value]);

  // Handle value change from the library component
  const handleChange = (newValues: number[]) => {
    const newValue: [number, number] = [newValues[0], newValues[1]];
    setLocalValue(newValue);
    setMinInputValue(Math.round(newValue[0]).toString());
    setMaxInputValue(Math.round(newValue[1]).toString());
    onChange(newValue);
  };

  // Handle min input change
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get input value and remove currency and spaces
    const inputValue = e.target.value.replace(currency, '').trim();
    setMinInputValue(inputValue);

    // Parse numeric value
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      const newValue: [number, number] = [
        Math.min(numValue, localValue[1] - step),
        localValue[1],
      ];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  // Handle max input change
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get input value and remove currency and spaces
    const inputValue = e.target.value.replace(currency, '').trim();
    setMaxInputValue(inputValue);

    // Parse numeric value
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      const newValue: [number, number] = [
        localValue[0],
        Math.max(numValue, localValue[0] + step),
      ];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  // Format display value with currency
  const formatDisplayValue = (value: string) => {
    return `${currency} ${value}`;
  };

  // Extract color without the 'bg-' prefix for inline styles
  const primaryColor = activeColor.startsWith('bg-primary_1')
    ? '#47C409' // Default green-500 color
    : activeColor.replace('bg-', '');

  // Custom CSS variables for styling the range slider
  const sliderStyles = {
    '--range-slider-height': '4px',
    '--range-slider-connect-bg': primaryColor,
    '--range-slider-handle-ring-color': 'rgba(74, 222, 128, 0.3)',
  } as React.CSSProperties;

  const priceValue = React.useMemo(() => {
    return localValue[1] - localValue[0];
  }, [localValue]);

  return (
    <div className={`${className}`}>
      <div className='text-xs text-gray-500 mb-3'>
        The average price of an experience is {currency} {priceValue}
      </div>

      {/* Custom styled Range Slider */}
      <div className='px-3' style={sliderStyles}>
        <RangeSliderInput
          id='range-slider'
          min={min}
          max={max}
          step={step}
          value={localValue}
          onInput={handleChange}
          rangeSlideDisabled={false}
          className='custom-range-slider'
        />
      </div>
      {/* Min/Max input fields */}
      <div className='flex justify-between gap-4 mt-6'>
        <label className='w-full border border-secondary_3 border-solid rounded-lg p-2'>
          <span className='block text-text_3 text-sm mb-1'>Minimum</span>
          <div className='relative flex items-center gap-1'>
            <span className='text-text_1'>{currency}</span>
            <input
              type='text'
              value={minInputValue}
              onChange={handleMinInputChange}
              className='w-full text-text_1 focus:outline-none'
            />
          </div>
        </label>
        <label className='w-full border border-secondary_3 border-solid rounded-lg p-2'>
          <span className='block text-text_3 text-sm mb-1'>Maximum</span>
          <div className='relative flex items-center gap-1'>
            <span className='text-text_1'>{currency}</span>
            <input
              type='text'
              value={maxInputValue}
              onChange={handleMaxInputChange}
              className='w-full text-text_1 focus:outline-none'
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default RangeSlider;
