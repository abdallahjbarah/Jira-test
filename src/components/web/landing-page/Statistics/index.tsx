'use client';
import React from 'react';
import StatisticField from './StatisticField';
import { statisticsData } from './statisticsData';

export default function Statistics() {
  return (
    <section className='w-full p-[2rem] laptopS:py-[7.5rem] flex flex-wrap gap-8 laptopS:gap-16 justify-center items-center'>
      {statisticsData?.map((item, index) => (
        <StatisticField
          key={index + item?.number + item?.titleKey}
          number={item?.number}
          titleKey={item?.titleKey}
        />
      ))}
    </section>
  );
}
