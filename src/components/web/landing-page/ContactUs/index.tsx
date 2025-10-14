'use client';
import { useTranslation } from '@contexts/TranslationContext';
import AboutUsImg from '@images/home/AboutUs.jpg';
import Image from 'next/image';
import React from 'react';

import AddressSVG from '@SVGs/home/Address.svg';
import EmailSVG from '@SVGs/home/Email.svg';
import whatsSvg from '@SVGs/home/whatsSvg.svg';

import Luster_Item from '@components/ui/Luster_Item';
import FacebookSVG from '@SVGs/home/Facebook.svg';
import InstagramSVG from '@SVGs/home/Instagram.svg';
import LinkedinSVG from '@SVGs/home/Linkedin.svg';
import TiktokSVG from '@SVGs/home/Tiktok.svg';
import WhatsappSVG from '@SVGs/home/Whatsapp.svg';
import { SOCIAL_MEDIA_DATA } from '@utils/constants';

export default function ContactUs(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section
      id='ContactUs'
      className='w-full flex container mx-auto px-4 items-center justify-center laptopS:justify-start'
    >
      <div className='flex flex-col laptopS:flex-row laptopS:gap-20 items-center justify-center w-full'>
        <div className='my-[4rem] laptopS:my-[7.5rem]'>
          <Image
            quality={100}
            style={{ borderRadius: '2rem' }}
            placeholder='blur'
            src={AboutUsImg}
            alt='AboutUs'
          />
        </div>

        <div className='flex flex-col gap-12 max-w-[43.875rem]'>
          <div>
            <h2 className='text-custom-24 font-custom-900 text-primary_1 mobileM:text-custom-32'>
              {t('contactUs.subtitle')}
            </h2>
            <h1 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold mobileM:text-custom-48'>
              {t('contactUs.title')}
            </h1>
          </div>

          <div className='flex flex-col gap-4'>
            <div
              className='border border-solid rounded-custom-16 border-secondary_3 cursor-pointer'
              onClick={() =>
                window.open(SOCIAL_MEDIA_DATA?.gmail?.link, '_blank')
              }
            >
              <div className='flex gap-4 p-2 mobileM:p-4'>
                <div className='w-full max-w-[4.4375rem] max-h-[4.4375rem] rounded-custom-20 flex justify-center items-center mobileM:max-w-[6.4375rem] mobileM:max-h-[6.4375rem]'>
                  <div className='w-[3.5rem] h-[3.5rem] mobileM:w-[5.5rem] mobileM:h-[5.5rem]'>
                    <Image src={EmailSVG} alt={t('contactUs.email.title')} />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-18 font-custom-800 text-primary_5 font-gellix-Bold mobileM:text-custom-24'>
                    {t('contactUs.email.title')}
                  </h2>
                  <p className='text-custom-14 font-custom-400 text-secondary_1 mt-2 mobileM:text-custom-18'>
                    {t('contactUs.email.value')}
                  </p>
                </div>
              </div>
            </div>

            <div
              className='border border-solid rounded-custom-16 border-secondary_3 cursor-pointer'
              onClick={() =>
                window.open(SOCIAL_MEDIA_DATA?.whatsapp?.link, '_blank')
              }
            >
              <div className='flex gap-4 p-2 mobileM:p-4'>
                <div className='w-full max-w-[4.4375rem] max-h-[4.4375rem] rounded-custom-20 flex justify-center items-center mobileM:max-w-[6.4375rem] mobileM:max-h-[6.4375rem]'>
                  <div className='w-[3.5rem] h-[3.5rem] mobileM:w-[5.5rem] mobileM:h-[5.5rem]'>
                    <Image src={whatsSvg} alt={t('contactUs.whatsapp.title')} />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-18 font-custom-800 text-primary_5 font-gellix-Bold mobileM:text-custom-24'>
                    {t('contactUs.whatsapp.title')}
                  </h2>
                  <p className='text-custom-14 font-custom-400 text-secondary_1 mt-2 mobileM:text-custom-18'>
                    {t('contactUs.whatsapp.value')}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-2 mobileM:p-4'>
                <div className='w-full max-w-[4.4375rem] max-h-[4.4375rem] rounded-custom-20 flex justify-center items-center mobileM:max-w-[6.4375rem] mobileM:max-h-[6.4375rem]'>
                  <div className='w-[3.5rem] h-[3.5rem] mobileM:w-[5.5rem] mobileM:h-[5.5rem]'>
                    <Image
                      src={AddressSVG}
                      alt={t('contactUs.address.title')}
                    />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-18 font-custom-800 text-primary_5 font-gellix-Bold mobileM:text-custom-24'>
                    {t('contactUs.address.title')}
                  </h2>
                  <p className='text-custom-14 font-custom-400 text-secondary_1 mt-2 mobileM:text-custom-18'>
                    {t('contactUs.address.value')} <br />
                    {t('contactUs.address.zipCode')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4 justify-center laptopS:justify-start pb-16'>
            <a
              className='w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.facebook?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image
                  src={FacebookSVG}
                  alt={t('contactUs.socialMedia.facebook')}
                />
              </Luster_Item>
            </a>
            <a
              className='w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.linkedin?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image
                  src={LinkedinSVG}
                  alt={t('contactUs.socialMedia.linkedin')}
                />
              </Luster_Item>
            </a>
            <a
              className='w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.instagram?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image
                  src={InstagramSVG}
                  alt={t('contactUs.socialMedia.instagram')}
                />
              </Luster_Item>
            </a>
            <a
              className='w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.tiktok?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image
                  src={TiktokSVG}
                  alt={t('contactUs.socialMedia.tiktok')}
                />
              </Luster_Item>
            </a>
            <a
              className=' relative w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.whatsapp?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image
                  src={WhatsappSVG}
                  alt={t('contactUs.socialMedia.whatsapp')}
                />
              </Luster_Item>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
