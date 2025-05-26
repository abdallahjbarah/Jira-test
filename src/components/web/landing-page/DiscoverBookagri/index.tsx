'use client';
import React from 'react';
import ProductsImg from '@images/home/Products.jpg';
import Events from '@images/home/Events.jpg';
import ImageContainer from './ImageContainer';
import Experiences from '@images/home/Experiences.png';
import Stays from '@images/home/Stays.png';
import Offers from '@images/home/Offers.png';
import { useTranslation } from '@contexts/TranslationContext';

export default function DiscoverBookagri(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section className='mt-[4rem] laptopS:mt-[8.375rem] my-[7.5rem] flex flex-col gap-8 justify-center items-center container mx-auto'>
      <div className='w-full max-w-[102.5rem] flex gap-8 flex-col laptopS:flex-row justify-center'>
        <div className='flex flex-col gap-8 flex-1'>
          <ImageContainer
            image={Experiences}
            title={t('experiences')}
            alt={t('experiences')}
            className={'h-[25rem] laptopS:h-full w-full'}
            path='/experiences'
          />

          <ImageContainer
            image={Stays}
            title={t('stays')}
            alt={t('stays')}
            className={'h-[25rem] laptopS:h-full w-full'}
            path='/stays'
          />
        </div>

        <div className='flex flex-col gap-8 flex-1'>
          <ImageContainer
            image={Events}
            title={t('events')}
            alt={t('events')}
            className={'h-[25rem] laptopS:h-full w-full'}
            path='/events'
          />

          <ImageContainer
            image={Offers}
            title={t('offers-packages')}
            alt={t('offers-packages')}
            className={'h-[25rem] laptopS:h-full w-full'}
            path='/offers'
          />
        </div>
      </div>
      <div className='flex flex-col gap-8 w-full max-w-[102.5rem]'>
        <ImageContainer
          image={ProductsImg}
          title={t('products')}
          alt={t('products')}
          className={'h-[25rem] laptopS:max-h-[34rem] laptopS:h-full w-full'}
          path='/products'
        />
      </div>
    </section>
  );
}
