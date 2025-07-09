'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import React, { useEffect, useState } from 'react';
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
  min = 0,
  max,
  step = 1,
  value,
  onChange,
  currency = 'JOD',
  className = '',
  activeColor = 'bg-primary_1',
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [minInputValue, setMinInputValue] = useState<string>(
    Math.max(0, Math.round(value[0])).toString(),
  );
  const [maxInputValue, setMaxInputValue] = useState<string>(
    Math.round(value[1]).toString(),
  );

  useEffect(() => {
    const safeMin = Math.max(0, Math.round(value[0]));
    const safeMax = Math.max(safeMin, Math.round(value[1]));
    setLocalValue([safeMin, safeMax]);
    setMinInputValue(safeMin.toString());
    setMaxInputValue(safeMax.toString());
  }, [value]);

  const handleChange = (newValues: number[]) => {
    const safeMin = Math.max(0, Math.round(newValues[0]));
    const safeMax = Math.max(safeMin, Math.round(newValues[1]));
    const roundedValues: [number, number] = [safeMin, safeMax];
    setLocalValue(roundedValues);
    setMinInputValue(roundedValues[0].toString());
    setMaxInputValue(roundedValues[1].toString());
    onChange(roundedValues);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(currency, '').trim();
    setMaxInputValue(inputValue);

    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      // Only prevent negative values, allow any positive number
      const safeMax = Math.max(0, numValue);
      const newValue: [number, number] = [localValue[0], safeMax];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(currency, '').trim();
    setMinInputValue(inputValue);

    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      // For minimum, we still need to respect the maximum value
      const safeMin = Math.max(0, Math.min(numValue, localValue[1]));
      const newValue: [number, number] = [safeMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const formatDisplayValue = (value: string) => {
    return `${currency} ${value}`;
  };

  const primaryColor = activeColor.startsWith('bg-primary_1')
    ? '#47C409'
    : activeColor.replace('bg-', '');

  const sliderStyles = {
    '--range-slider-height': '4px',
    '--range-slider-connect-bg': primaryColor,
    '--range-slider-handle-ring-color': 'rgba(74, 222, 128, 0.3)',
  } as React.CSSProperties;

  const averagePrice = React.useMemo(() => {
    const price = (localValue[1] + localValue[0]) / 2;
    return Math.round(price);
  }, [localValue]);

  return (
    <div className={`${className}`}>
      <div className='text-xs text-gray-500 mb-3'>
        {t('filter.average-price')} {currency} {averagePrice}
      </div>

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

      <div className='flex justify-between gap-4 mt-6'>
        <label className='w-full border border-secondary_3 border-solid rounded-lg p-2'>
          <span className='block text-text_3 text-sm mb-1'>
            {t('filter.minimum')}
          </span>
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
          <span className='block text-text_3 text-sm mb-1'>
            {t('filter.maximum')}
          </span>
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
