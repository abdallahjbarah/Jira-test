'use client';
import { useTranslation } from '@contexts/TranslationContext';
import Vector from '@images/home/Vector.png';
import MissionSvg from '@SVGs/home/MissionSvg.svg';
import VisionSVG from '@SVGs/home/VisionSVG.svg';
import Image from 'next/image';
import React from 'react';

export default function AboutUs(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section
      id='AboutUs'
      className='bg-secondary_2 flex px-[1rem] items-center justify-center laptopS:justify-start '
    >
      <div className='flex flex-col laptopS:flex-row laptopS:gap-20 items-center justify-center container mx-auto'>
        <div className='w-full max-w-[50rem] max-h-[50rem] my-[4rem] laptopS:my-[8.75rem]'>
          <Image
            quality={100}
            style={{ borderRadius: '2rem' }}
            placeholder='blur'
            src={Vector}
            alt='AboutUs'
          />
        </div>

        <div className='flex flex-col gap-12 max-w-[43.875rem] pb-[4rem] laptopS:pb-0'>
          <div>
            <h1 className=' text-custom-30 mobileM:text-custom-40 laptopM:text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold'>
              {t('aboutUs.title')}
            </h1>
            <p className='text-custom-16 mobileM:text-custom-20 laptopM:text-custom-24 font-custom-400 text-secondary_1 mt-6'>
              {t('aboutUs.description')}
            </p>
          </div>

          <div className='flex gap-4'>
            <div className='w-full bg-primary_4 max-w-[4.4375rem] max-h-[4.4375rem] mobileM:max-w-[6.4375rem] mobileM:max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
              <div className='w-7 h-6 mobileM:w-10 mobileM:h-9'>
                <Image src={VisionSVG} alt='Vision logo' />
              </div>
            </div>
            <div>
              <h2 className='text-custom-18 mobileM:text-custom-20 laptopM:text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                {t('aboutUs.vision.title')}
              </h2>
              <p className='text-custom-14 mobileM:text-custom-16 laptopM:text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                {t('aboutUs.vision.description')}
              </p>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-full bg-primary_4 max-w-[4.4375rem] max-h-[4.4375rem] mobileM:max-w-[6.4375rem] mobileM:max-h-[6.4375rem]  rounded-custom-20 flex justify-center items-center'>
              <div className='w-7 h-6 mobileM:w-10 mobileM:h-9'>
                <Image src={MissionSvg} alt='Mission logo' />
              </div>
            </div>
            <div>
              <h2 className='text-custom-18 mobileM:text-custom-20 laptopM:text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                {t('aboutUs.mission.title')}
              </h2>
              <p className='text-custom-14 mobileM:text-custom-16 laptopM:text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                {t('aboutUs.mission.description')}
              </p>
            </div>
          </div>

          {/* <div className=''>
            <FilledButton
              path='#'
              text={t('aboutUs.readMore')}
              width='w-[8.3125rem] mobileM:w-[11.3125rem]'
              height='h-[2.8125rem] mobileM:h-[4.8125rem]'
              className='mt-5 rounded-custom-16'
              icon={null}
              onClick={() => {}}
              buttonType='button'
              isDisable={false}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
