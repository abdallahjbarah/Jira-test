'use client';
import React from 'react';
import Image from 'next/image';
import AboutUsImg from '@images/home/AboutUs.jpg';
import { useTranslation } from '@contexts/TranslationContext';

import EmailSVG from '@SVGs/home/Email.svg';
import PhoneSVG from '@SVGs/home/Phone.svg';
import AddressSVG from '@SVGs/home/Address.svg';

import FacebookSVG from '@SVGs/home/Facebook.svg';
import LinkedinSVG from '@SVGs/home/Linkedin.svg';
import InstagramSVG from '@SVGs/home/Instagram.svg';
import TiktokSVG from '@SVGs/home/Tiktok.svg';
import WhatsappSVG from '@SVGs/home/Whatsapp.svg';
import { SOCIAL_MEDIA_DATA } from '@utils/constants';
import Luster_Item from '@components/ui/Luster_Item';

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
            <h2 className='text-custom-32 font-custom-400 text-primary_1'>
              {t('contactUs.subtitle')}
            </h2>
            <h1 className='text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold'>
              {t('contactUs.title')}
            </h1>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image src={EmailSVG} alt={t('contactUs.email.title')} />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    {t('contactUs.email.title')}
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    {t('contactUs.email.value')}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image src={PhoneSVG} alt={t('contactUs.phone.title')} />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    {t('contactUs.phone.title')}
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    {t('contactUs.phone.value')}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image
                      src={AddressSVG}
                      alt={t('contactUs.address.title')}
                    />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    {t('contactUs.address.title')}
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    {t('contactUs.address.value')} <br />
                    {t('contactUs.address.zipCode')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4 justify-center laptopS:justify-start pb-16'>
            <a
              className='w-[3.75rem] h-[3.75rem]'
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
              className='w-[3.75rem] h-[3.75rem]'
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
              className='w-[3.75rem] h-[3.75rem]'
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
              className='w-[3.75rem] h-[3.75rem]'
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
              className=' relative w-[3.75rem] h-[3.75rem]'
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
