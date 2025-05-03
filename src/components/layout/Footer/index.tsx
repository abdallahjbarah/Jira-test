import React from 'react';
import CustomLink from '@components/ui/CustomLink';
import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import { LINKS_DATA, SOCIAL_MEDIA_DATA } from '@utils/constants';
import InstagramSvg from '@components/svg/footer/InstagramSvg';
import TiktokSvg from '@components/svg/footer/TiktokSvg';
import LinkedinSvg from '@components/svg/footer/LinkedinSvg';
import WhatsappSvg from '@components/svg/footer/WhatsappSvg';
import FacebookSvg from '@components/svg/footer/FacebookSvg';
import Image from 'next/image';

interface LinkData {
  name: string;
  path: string;
}

interface SocialMediaData {
  instagram: { link: string };
  facebook: { link: string };
  tiktok: { link: string };
  linkedin: { link: string };
  whatsapp: { link: string };
}

export default function Footer(): React.ReactElement {
  return (
    <footer className='flex min-h-[28.875rem] flex-col items-center justify-between bg-primary_5'>
      <div className='pt-[4rem] w-full laptopS:px-[8.75rem]'>
        <div className='flex flex-col items-center gap-x-[15.5rem] gap-y-8 lg:flex-row'>
          <div className='self-center laptopS:self-start'>
            {/* Logo */}
            <div className='w-full h-full max-w-[11.81rem] max-h-[3rem] m-auto laptopS:m-0'>
              <CustomLink path={'/'}>
                <Image
                  className='w-[11.8125rem] h-[3rem]'
                  quality={100}
                  src={BookagriLogoSvg}
                  alt='Bookagri Logo'
                />
              </CustomLink>
            </div>

            {/*  Social Media */}
            <ul className='mt-6 laptopS:mt-[9.25rem] flex gap-[0.9375rem]'>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.instagram?.link}>
                <li>
                  <InstagramSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.facebook?.link}>
                <li>
                  <FacebookSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.tiktok?.link}>
                <li>
                  <TiktokSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.linkedin?.link}>
                <li>
                  <LinkedinSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500' />
                </li>
              </a>
              <a target='_blank' href={SOCIAL_MEDIA_DATA?.whatsapp?.link}>
                <li>
                  <WhatsappSvg style='fill-primary_4 hover:fill-primary_1 transition-all duration-500' />
                </li>
              </a>
            </ul>
          </div>

          {/* Links */}
          <div className='flex w-full flex-col items-center justify-end tabletM:gap-y-8 tabletM:flex-row tabletM:items-start'>
            {/* Pages */}
            <div className='w-[19rem] tabletM:w-[12.5rem] tabletM:me-6'>
              <h2 className='text-custom-20 font-custom-700 text-primary_4'>
                Pages
              </h2>
              <ul className='mt-[1.5rem] mb-4 flex w-full flex-col gap-4 tabletM:mt-6'>
                {LINKS_DATA?.slice(0, 5)?.map(
                  (item: LinkData, index: number) => (
                    <li
                      key={item?.name + index + 'Footer'}
                      className='text-custom-18 font-custom-400 text-primary_4'
                    >
                      <CustomLink
                        className='transition-all duration-300 hover:text-primary_1 hover:font-custom-800'
                        path={item?.path}
                      >
                        {item?.name}
                      </CustomLink>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className='w-[19rem] tabletM:w-[12.5rem] tabletM:me-20'>
              <ul className='mb-4 flex w-full flex-col gap-4 tabletM:mt-[3.375rem]'>
                {LINKS_DATA?.slice(5)?.map((item: LinkData, index: number) => (
                  <li
                    key={item?.name + index + 'Footer'}
                    className='text-custom-18 font-custom-400 text-primary_4'
                  >
                    <CustomLink
                      className='transition-all duration-300 hover:text-primary_1 hover:font-custom-800'
                      path={item?.path}
                    >
                      {item?.name}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* End Pages */}

            {/* Contact Us */}
            <div className='w-[19rem] tabletM:w-[12.5rem] tabletM:me-6'>
              <h2 className='text-custom-20 font-custom-700 text-primary_4'>
                Contact Us
              </h2>

              <div className='my-[1.5rem] flex w-full flex-col gap-4 tabletM:mt-6'>
                <div className='text-custom-18 text-primary_4'>
                  <h2 className='font-custom-700 mb-2'>Email</h2>
                  <p className='font-custom-400'>info@bookagri.com</p>
                </div>

                <div className='text-custom-18 text-primary_4'>
                  <h2 className='font-custom-700 mb-2'>Phone</h2>
                  <p className='font-custom-400'>00962-77-2236393</p>
                  <p className='font-custom-400'>00962-77-0504153</p>
                  <p className='font-custom-400'>00962-78-7877885</p>
                  <p className='font-custom-400'>00962-79-5593907</p>
                </div>
              </div>
            </div>

            <div className='w-[19rem] tabletM:w-[17.3125rem] text-primary_4 text-custom-18'>
              <div className='flex w-full flex-col gap-4 tabletM:mt-[3.375rem]'>
                <div>
                  <h2 className='font-custom-700 mb-2'>Address</h2>
                  <p className='font-custom-400'>
                    Marj Al-Hamam, Amman, Jordan
                  </p>
                  <p className='font-custom-400'>Zip Code: 11733</p>
                </div>

                <div>
                  <p className='font-custom-700'>09:00 - 17:00</p>
                </div>
              </div>
            </div>
            {/* End Contact Us */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='h-full w-full mt-4 laptopS:mt-0'>
        <hr />
        <div className='my-[1.5rem] flex content-end justify-center gap-2'>
          <p className='text-custom-18 font-custom-400 text-primary_4'>
            Copyright © Bookagri.com
          </p>
        </div>
      </div>
    </footer>
  );
}
