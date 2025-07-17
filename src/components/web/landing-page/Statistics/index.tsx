'use client';
import React from 'react';
import StatisticField from './StatisticField';
import { statisticsData } from './statisticsData';

export default function Statistics() {
  return (
    <section className='w-full px-4 sm:px-6 md:px-8 laptopS:px-16 py-8 sm:py-12 md:py-16 laptopS:py-[7.5rem] flex flex-wrap md:flex-nowrap justify-center items-center gap-4 sm:gap-6 md:gap-8 laptopS:gap-4 overflow-x-auto md:overflow-x-visible'>
      {statisticsData?.map((item, index) => (
        <div key={index} className='flex-shrink-0'>
          <StatisticField
            key={index + item?.number + item?.titleKey}
            number={item?.number}
            titleKey={item?.titleKey}
          />
        </div>
      ))}
    </section>
  );
}
