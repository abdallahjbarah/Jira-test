'use client';
import React, { memo } from 'react';
import BgHomePageImg from '@images/home/BgHomePage.jpg';
import LeafImg from '@images/home/Leaf.png';
import Image from 'next/image';
import FilledButton from '@components/ui/buttons/FilledButton';
import styles from './style.module.scss';
import { cn } from '@/utils/cn';
import { useTranslation } from '@contexts/TranslationContext';
import Styled from 'styled-components';

const StyledHeroIconWrapper = Styled.div`
  width: 4.6875rem;
  height: 3.875rem;
  position: absolute;
  top: -3.4375rem;
  left: -2.1875rem;

  [dir='rtl'] & {
    left: auto;
    right: -2.1875rem;
  }

  @media (max-width: 768px) {
    left: -1rem;
    [dir='rtl'] & {
      right: -1rem;
    }
  }

`;

function Hero({
  className,
  contentClassName,
}: {
  className?: string;
  contentClassName?: string;
}) {
  const { t } = useTranslation();

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
      <div
        className={cn('text-white container mx-auto py-64', contentClassName)}
      >
        <div className='relative'>
          <StyledHeroIconWrapper className='w-[4.6875rem] h-[3.875rem] absolute top-[-3.4375rem] left-[-1rem] laptopS:left-[-2.1875rem]'>
            <Image src={LeafImg} alt='Leaf' priority />
          </StyledHeroIconWrapper>
          <h1 className='text-custom-30 laptopS:text-custom-45 tabletS:text-custom-70 font-custom-700 font-gellix-Bold'>
            {t('hero.title') || 'Connecting you with'}{' '}
            <br className='hidden laptopS:block' />{' '}
            {t('hero.titleSecondLine') || 'a world of agritourism'}
          </h1>
          <h2 className='text-custom-22 tabletS:text-custom-32 font-custom-400 mt-4'>
            {t('hero.subtitle') || 'Book or become a host for agritourism'}{' '}
            <br className='hidden laptopS:block' />{' '}
            {t('hero.subtitleSecondLine') || 'experiences and rural stays'}
          </h2>
          <FilledButton
            path='/all'
            text={t('hero.discoverMore') || 'Discover More'}
            width='w-[13.67rem]'
            height='h-[3.625rem] laptopS:h-[4.8125rem]'
            className='mt-[39px] rounded-custom-16 !text-custom-22 !laptopS:text-custom-24'
            buttonType='button'
            isDisable={false}
          />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
