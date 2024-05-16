'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function StatisticField({ number, title, key }) {
  const { ref, inView } = useInView();

  const [counterOn, setCounterOn] = useState(false);

  useEffect(() => {
    if (inView)
        setCounterOn(true);
  }, [inView]);

  return (
    <div ref={ref} key={key} className='w-[15.625rem]'>
      <div className='text-primary_1 text-custom-40 font-custom-600 leading-custom-48'>
        {counterOn && <CountUp start={0} end={number} duration={3} delay={0} />}+
      </div>
      <div className='text-primary_5 text-custom-22 font-custom-400 mt-1'>
        {title}
      </div>
    </div>
  );
}
