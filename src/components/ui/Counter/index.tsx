'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface CounterProps {
  title: string;
  description?: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  title,
  description,
  value,
  onIncrement,
  onDecrement,
  minValue = 0,
  maxValue,
  className,
}) => {
  const isDecrementDisabled = value <= minValue;
  const isIncrementDisabled = maxValue !== undefined && value >= maxValue;

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div>
        <h3 className='text-lg'>{title}</h3>
        {description && <p className='text-gray-500 text-sm'>{description}</p>}
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={onDecrement}
          className={cn(
            'w-8 h-8 bg-white rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center hover:shadow-lg',
            isDecrementDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 cursor-pointer',
          )}
          disabled={isDecrementDisabled}
          type='button'
          aria-label='Decrease'
        >
          <span className='text-xl'>-</span>
        </button>
        <span className='w-6 text-center'>{value}</span>
        <button
          onClick={onIncrement}
          className={cn(
            'w-8 h-8 bg-white rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center hover:shadow-lg',
            isIncrementDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 cursor-pointer',
          )}
          disabled={isIncrementDisabled}
          type='button'
          aria-label='Increase'
        >
          <span className='text-xl'>+</span>
        </button>
      </div>
    </div>
  );
};

export default Counter;
