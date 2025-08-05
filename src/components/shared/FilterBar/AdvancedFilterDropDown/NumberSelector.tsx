'use client';

import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface NumberSelectorProps {
  title: string;
  value: number | 'any' | '8+';
  onChange: (value: number | 'any' | '8+') => void;
  maxNumber?: number;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  title,
  value,
  onChange,
  maxNumber = 7,
}) => {
  const { t } = useTranslation();
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div>
      <h3 className='font-medium mb-3'>{title}</h3>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          className={`px-4 py-2 rounded-full text-sm font-medium
            ${value === 'any' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => onChange('any')}
        >
          {t('filter.any')}
        </button>
        {numbers.map((num) => (
          <button
            key={num}
            type='button'
            className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-medium
              ${value === num ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
        <button
          type='button'
          className={`px-4 py-2 rounded-full text-sm font-medium
            ${value === '8+' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => onChange('8+')}
        >
          +8
        </button>
      </div>
    </div>
  );
};

export default NumberSelector;
