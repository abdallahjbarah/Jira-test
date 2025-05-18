'use client';
import React from 'react';
import Image from 'next/image';
import DownloadBookagriApp from '@images/home/DownloadBookagriApp.png';
import AppStoreSvg from '@SVGs/home/AppStore.svg';
import GooglePlaySvg from '@SVGs/home/GooglePlay.svg';
import MovingColorfulBorder from '@components/ui/MovingColorfulBorder';
import { useTranslation } from '@contexts/TranslationContext';

export default function DownloadApp(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section className='bg-secondary_2 w-full flex justify-center items-center'>
      <div className='flex flex-col laptopS:flex-row gap-20 items-center justify-center'>
        <div className='flex flex-col gap-12 max-w-[43.875rem] pt-[4rem]'>
          <div className='px-4'>
            <h2 className='text-custom-32 font-custom-400 text-primary_1 mb-2'>
              {t('downloadApp.subtitle')}
            </h2>
            <h1 className='text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold mb-6'>
              {t('downloadApp.title')}
            </h1>
            <p className='text-custom-24 font-custom-400 text-secondary_1'>
              {t('downloadApp.description')}
            </p>
          </div>
          <div className='flex flex-wrap gap-6 justify-center laptopS:justify-start'>
            <MovingColorfulBorder className='rounded-[12px]'>
              <a className='element' href='#' target='_blank'>
                <Image
                  quality={100}
                  src={GooglePlaySvg}
                  alt={t('downloadApp.googlePlay')}
                />
              </a>
            </MovingColorfulBorder>

            <MovingColorfulBorder className='rounded-[12px]'>
              <a href='#' target='_blank'>
                <Image
                  quality={100}
                  src={AppStoreSvg}
                  alt={t('downloadApp.appStore')}
                />
              </a>
            </MovingColorfulBorder>
          </div>
        </div>
        <div className='w-full h-full max-w-[36rem] max-h-[40.125rem] my-10 rounded-custom-32'>
          <Image
            quality={100}
            placeholder='blur'
            src={DownloadBookagriApp}
            alt='DownloadBookagriApp'
          />
        </div>
      </div>
    </section>
  );
}
