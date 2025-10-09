import React, { ReactNode } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';

interface TimeSlotCardProps {
  timeRange: string;
  adultPrice: string | ReactNode | null;
  childrenPrice: string | ReactNode | null;
  infantsPrice: string | ReactNode | null;
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
  currency = 'USD',
  type = 'Regular',
  title,
}) => {
  const { t } = useTranslation();
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
              {t('booking.choose')}
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
              {adultPrice} /
              <span className='font-sans'>{t('booking.adult')}</span>
            </div>
          )}
          {childrenPrice != null && (
            <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>
              {childrenPrice} /
              <span className='font-sans'>{t('booking.children')}</span>
            </div>
          )}
          {infantsPrice != null && (
            <div className='font-custom-600 text-sm font-gellix-Bold text-text_1'>
              {infantsPrice} /
              <span className='font-sans'>{t('booking.infant')}</span>
            </div>
          )}
        </div>
        <button
          onClick={onChoose}
          className='bg-[#47C409] text-white px-6 py-3 rounded-lg font-custom-700 text-sm font-gellix-Bold'
        >
          {t('booking.choose')}
        </button>
      </div>
    </div>
  );
};

export default TimeSlotCard;
