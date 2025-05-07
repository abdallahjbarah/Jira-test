import React from 'react';
import BgHomePageImg from '@images/home/BgHomePage.jpg';
import LeafImg from '@images/home/Leaf.png';
import Image from 'next/image';
import FilledButton from '@components/ui/buttons/FilledButton';
import styles from './style.module.scss';
import { cn } from '@/utils/cn';

export default function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        styles['bg-linear-gradient'],
        'relative w-full min-h-screen flex items-end justify-center laptopS:items-end laptopS:justify-start',
        className,
      )}
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
      <div className='text-white container mx-auto'>
        <div className='relative'>
          <div className='w-[4.6875rem] h-[3.875rem] absolute top-[-3.4375rem] left-[-2.1875rem]'>
            <Image src={LeafImg} alt='Leaf' priority />
          </div>
          <h1 className='text-custom-45 tabletS:text-custom-70 font-custom-700 font-gellix-Bold'>
            Connecting you with <br className='hidden laptopS:block' /> a world
            of agritourism
          </h1>
          <h2 className='text-custom-30 tabletS:text-custom-32 font-custom-400 mt-4'>
            Book or become a host for agritourism{' '}
            <br className='hidden laptopS:block' /> experiences and rural stays
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
      </div>
    </section>
  );
}
