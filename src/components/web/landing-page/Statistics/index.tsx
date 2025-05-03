import React from 'react';
import StatisticField from './StatisticField';
import { statisticsData } from './statisticsData';

export default function Statistics() {
  return (
    <section className='w-full h-[20.625rem] flex gap-16 justify-center items-center'>
      {statisticsData?.map((item, index) => (
        <StatisticField
          key={index + item?.number + item?.title?.toString()}
          number={item?.number}
          title={item?.title}
        />
      ))}
    </section>
  );
}
