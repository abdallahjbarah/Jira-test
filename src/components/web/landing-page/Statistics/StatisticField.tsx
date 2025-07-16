'use client';

import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '@contexts/TranslationContext';

interface StatisticFieldProps {
  number: string;
  titleKey: string;
  key?: string | number;
}

export default function StatisticField({
  number,
  titleKey,
  key,
}: StatisticFieldProps) {
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const [counterOn, setCounterOn] = useState(false);

  useEffect(() => {
    if (inView) setCounterOn(true);
  }, [inView]);

  const title = t(titleKey);

  return (
    <div
      ref={ref}
      key={key}
      className='w-[200px] sm:w-[220px] md:w-[240px] laptopS:w-[15.625rem] flex flex-col items-center laptopS:items-center'
    >
      <div className='text-primary_1 text-2xl sm:text-3xl md:text-4xl laptopS:text-custom-40 font-custom-600 leading-tight sm:leading-tight md:leading-tight laptopS:leading-custom-48'>
        {counterOn && (
          <CountUp start={0} end={parseInt(number)} duration={3} delay={0} />
        )}
        +
      </div>
      <div
        className='text-primary_5 text-sm sm:text-base md:text-lg laptopS:text-custom-22 font-custom-400 mt-1 sm:mt-2 md:mt-2 laptopS:mt-1 text-center laptopS:text-start'
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
}
