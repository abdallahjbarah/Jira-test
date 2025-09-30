'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import FacebookSvg from '@components/svg/footer/FacebookSvg';
import InstagramSvg from '@components/svg/footer/InstagramSvg';
import LinkedinSvg from '@components/svg/footer/LinkedinSvg';
import TiktokSvg from '@components/svg/footer/TiktokSvg';
import WhatsappSvg from '@components/svg/footer/WhatsappSvg';
import CustomLink from '@components/ui/CustomLink';
import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import {
  COLLECTIONS_LINKS,
  LINKS_DATA,
  SOCIAL_MEDIA_DATA,
} from '@utils/constants';
import Image from 'next/image';
import React from 'react';

interface LinkData {
  name: {
    en: string;
    ar: string;
  };
  path: string;
}

export default function Footer(): React.ReactElement {
  const { locale, t } = useTranslation();

  const phoneValues = ['00962-77-2236393'];

  return (
    <footer className='flex min-h-[28.875rem] flex-col items-center justify-between bg-primary_5 mt-[20px]'>
      <div className='pt-[4rem] w-full laptopS:px-[2.75rem]'>
        <div className='flex flex-col items-start gap-y-8 lg:flex-row'>
          <div className='px-8 self-start laptopS:self-start mobileM:px-0'>
            <div className='w-full h-full max-w-[20.67rem] max-h-[5.25rem] m-auto laptopS:m-0'>
              <CustomLink path={'/'}>
                <Image
                  className='mobileM:w-[20.6719rem] mobileM:h-[5.25rem]'
                  quality={100}
                  src={BookagriLogoSvg}
                  alt='Bookagri Logo'
                />
              </CustomLink>
            </div>

            <ul className='mt-6 laptopS:mt-[9.25rem] flex gap-[0.9375rem]'>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.instagram?.link}>
                <li>
                  <InstagramSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500 w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.facebook?.link}>
                <li>
                  <FacebookSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500 w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.tiktok?.link}>
                <li>
                  <TiktokSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500 w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.linkedin?.link}>
                <li>
                  <LinkedinSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500 w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.whatsapp?.link}>
                <li>
                  <WhatsappSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500 w-[2.75rem] h-[2.75rem] mobileM:w-[3.75rem] mobileM:h-[3.75rem]' />
                </li>
              </a>
            </ul>
          </div>

          <div className='px-8 gap-3 flex w-full flex-col items-center justify-center tabletM:justify-start tabletM:gap-y-8 tabletM:flex-row tabletM:items-start mobileM:gap-0'>
            <div className='w-full tabletM:me-6'>
              <div className='flex flex-col gap-4'>
                <ul className='flex flex-col gap-4'>
                  {LINKS_DATA?.map((item: LinkData, index: number) => (
                    <li
                      key={index}
                      className='text-custom-15 font-custom-400 text-primary_4 mobileM:text-custom-18'
                    >
                      <CustomLink
                        className='transition-all duration-300 hover:text-primary_1 hover:font-custom-800'
                        path={item?.path}
                      >
                        {item?.name[locale]}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='w-full tabletM:me-6'>
              <ul className='flex flex-col gap-4'>
                {COLLECTIONS_LINKS?.map((item: LinkData, index: number) => (
                  <li
                    key={index}
                    className='text-custom-15 font-custom-400 text-primary_4 mobileM:text-custom-18'
                  >
                    <CustomLink
                      className='transition-all duration-300 hover:text-primary_1 hover:font-custom-800'
                      path={item?.path}
                    >
                      {item?.name[locale]}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full tabletM:me-6 flex flex-col gap-4'>
              <div className='text-custom-15 text-primary_4 w-full mobileM:text-custom-18'>
                <h2 className='font-custom-700 mb-2'>
                  {t('footer.email.title')}
                </h2>
                <p className='font-custom-400'>{t('footer.email.value')}</p>
              </div>
              <div className='text-custom-15 text-primary_4 w-full mobileM:text-custom-18'>
                <h2 className='font-custom-700 mb-2'>
                  {t('footer.phone.title')}
                </h2>
                {phoneValues.map((phone, index) => (
                  <p key={index} className='font-custom-400'>
                    {phone}
                  </p>
                ))}
              </div>
            </div>
            <div className='w-full tabletM:me-6 flex flex-col gap-4'>
              <div className='text-custom-15 text-primary_4 w-full mobileM:text-custom-18'>
                <h2 className='font-custom-700 mb-2'>
                  {t('footer.address.title')}
                </h2>
                <p className='font-custom-400'>{t('footer.address.value')}</p>
                <p className='font-custom-400'>{t('footer.address.zipCode')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-full w-full mt-4 laptopS:mt-0'>
        <hr />
        <div className='my-[1.5rem] flex content-end justify-center gap-2'>
          <p className='text-custom-15 font-custom-400 text-primary_4 mobileM:text-custom-18'>
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
