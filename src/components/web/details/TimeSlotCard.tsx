import React from 'react';

interface TimeSlotCardProps {
  timeRange: string;
  adultPrice: string | null;
  childrenPrice: string | null;
  infantsPrice: string | null;
  onChoose: () => void;
  currency?: string;
  type?: 'Stay' | 'Regular';
  title?: string;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  timeRange,
  adultPrice,
  childrenPrice,
  infantsPrice,
  onChoose,
  currency = 'JOD',
  type = 'Regular',
  title,
}) => {
  console.log('infantsPrice', infantsPrice);
  if (type === 'Stay') {
    return (
      <div className='w-full bg-white border border-[#F3F1F1] rounded-[6px] shadow-[0px_4px_4px_rgba(184,184,184,0.25)] px-[21px] py-[15px] mb-[0.3rem]'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-custom-600 text-xl text-text_1'>{title}</h3>
          <div className='flex justify-between items-center'>
            <div className='font-custom-600 text-xl text-text_1'>
              {adultPrice} <span className='font-sans'>/night</span>
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
    <div className='w-full bg-white border border-[#F3F1F1] rounded-[6px] shadow-[0px_4px_4px_rgba(184,184,184,0.25)] px-[21px] py-[15px] max-h-[136px] min-h-[136px] mb-[0.3rem]'>
      <div className='flex justify-between items-end'>
        <div className='flex flex-col gap-2'>
          <div className='font-custom-400 text-sm font-sans text-text_1'>
            {timeRange}
          </div>
          {adultPrice != null && (
            <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>
              {adultPrice} /<span className='font-sans'>adult</span>
            </div>
          )}
          {childrenPrice != null && (
            <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>
              {childrenPrice} /<span className='font-sans'>children</span>
            </div>
          )}
          {infantsPrice != null && (
            <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>
              {infantsPrice} /<span className='font-sans'>infant</span>
            </div>
          )}
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
