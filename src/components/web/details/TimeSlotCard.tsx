import React from 'react';

interface TimeSlotCardProps {
  timeRange: string;
  adultPrice: number;
  childrenPrice: number;
  onChoose: () => void;
  currency?: string;
  type?: 'Stay' | 'Regular';
  title?: string;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  timeRange,
  adultPrice,
  childrenPrice,
  onChoose,
  currency = 'JOD',
  type = 'Regular',
  title
}) => {
  if (type === 'Stay') {
    return (
      <div className='w-full bg-white rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.08)] px-[21px] py-[15px] mb-[0.3rem]'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-custom-600 text-xl text-text_1'>{title}</h3>
          <div className='flex justify-between items-center'>
            <div className='font-custom-600 text-xl text-text_1'>
              {currency} {adultPrice} <span className='font-sans'>/night</span>
            </div>
            <button 
              onClick={onChoose}
              className='bg-[#47C409] text-white px-6 py-3 rounded-lg font-custom-700 text-sm font-gellix-Bold'
            >
              Choose
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full bg-white rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.08)] px-[21px] py-[15px] max-h-[136px] min-h-[136px] mb-[0.3rem]'>
      <div className='flex justify-between items-end'>
        <div className='flex flex-col gap-2'>
          <div className='font-custom-400 text-sm font-sans text-text_1'>{timeRange}</div>
          <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>{currency} {adultPrice} /<span className='font-sans'>adult</span></div>
          <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>{currency} {childrenPrice} /<span className='font-sans'>children</span></div>
          <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>Free /<span className='font-sans'>infant</span></div>
        </div>
        <button 
          onClick={onChoose}
          className='bg-[#47C409] text-white px-6 py-3 rounded-lg font-custom-700 text-sm font-gellix-Bold'
        >
          Choose
        </button>
      </div>
    </div>
  );
};

export default TimeSlotCard; 