import React from 'react';
import BgHomePageImg from '@images/home/BgHomePage.jpg';
import LeafImg from '@images/home/Leaf.png';
import Image from 'next/image';
import FilledButton from '@components/ui/buttons/FilledButton';
import styles from './style.module.scss';

export default function Hero() {
  return (
    <section
      className={`${styles['bg-linear-gradient']} relative w-full min-h-screen flex items-end justify-start`}
    >
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <Image
          src={BgHomePageImg}
          fill
          sizes='100vw'
          objectFit='cover'
          objectPosition='center'
          alt='Background'
          priority
          placeholder='blur'
          quality={100}
        />
      </div>
      <div className='z-10 text-white ms-[8.75rem] mb-[8rem] desktop:mb-[16.9375rem] relative'>
        <div className='w-[4.6875rem] h-[3.875rem] absolute top-[-3.4375rem] left-[-2.1875rem]'>
          <Image src={LeafImg} alt='Leaf' priority />
        </div>
        <h1 className='text-custom-70 font-custom-700 font-gellix-Bold'>
          Connecting you with <br /> a world of agritourism
        </h1>
        <h2 className='text-custom-32 font-custom-400 mt-4'>
          Book or become a host for agritourism <br /> experiences and rural
          stays
        </h2>
        <FilledButton
          path='/'
          text='Discover More'
          width='w-[13.67rem]'
          height='h-[4.8125rem]'
          className='mt-5 rounded-custom-16'
          icon={null}
          onClick={() => {}}
          buttonType='button'
          isDisable={false}
        />
      </div>
    </section>
  );
}
