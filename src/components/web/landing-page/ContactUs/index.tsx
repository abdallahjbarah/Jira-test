import React from 'react';
import Image from 'next/image';
import AboutUsImg from '@images/home/AboutUs.jpg';

// Contact info
import EmailSVG from '@SVGs/home/Email.svg';
import PhoneSVG from '@SVGs/home/Phone.svg';
import AddressSVG from '@SVGs/home/Address.svg';

// Social media
import FacebookSVG from '@SVGs/home/Facebook.svg';
import LinkedinSVG from '@SVGs/home/Linkedin.svg';
import InstagramSVG from '@SVGs/home/Instagram.svg';
import TiktokSVG from '@SVGs/home/Tiktok.svg';
import WhatsappSVG from '@SVGs/home/Whatsapp.svg';
import { SOCIAL_MEDIA_DATA } from '@utils/constants';
import Luster_Item from '@components/ui/Luster_Item';

export default function ContactUs(): React.ReactElement {
  return (
    <section
      id='ContactUs'
      className='min-h-screen w-full flex px-4 laptopS:ps-[8.75rem] items-center justify-center laptopS:justify-start'
    >
      <div className='flex flex-col laptopS:flex-row laptopS:gap-20 items-center'>
        {/* Image */}
        <div className='max-w-[50rem] max-h-[50rem] my-[4rem] laptopS:my-[7.5rem]'>
          <Image
            quality={100}
            style={{ borderRadius: '2rem' }}
            placeholder='blur'
            src={AboutUsImg}
            alt='AboutUs'
          />
        </div>

        {/* Contact Us */}
        <div className='flex flex-col gap-12 max-w-[43.875rem]'>
          <div>
            <h2 className='text-custom-32 font-custom-400 text-primary_1'>
              Contact Us
            </h2>
            <h1 className='text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold'>
              Have a question or feedback?
            </h1>
          </div>

          <div className='flex flex-col gap-4'>
            {/* Email */}
            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image src={EmailSVG} alt='Email logo' />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    Email
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    info@bookagri.com
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image src={PhoneSVG} alt='Phone logo' />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    Phone
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    00962-77-2236393
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className='border border-solid rounded-custom-16 border-secondary_3'>
              <div className='flex gap-4 p-4'>
                <div className='w-full max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
                  <div className='w-[5.5rem] h-[5.5rem]'>
                    <Image src={AddressSVG} alt='Address logo' />
                  </div>
                </div>
                <div>
                  <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                    Address
                  </h2>
                  <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                    Marj Al-Hamam, Amman , Jordan <br />
                    Zip Code: 11733
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
                <Image src={FacebookSVG} alt='Facebook logo' />
              </Luster_Item>
            </a>
            <a
              className='w-[3.75rem] h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.linkedin?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image src={LinkedinSVG} alt='Linkedin logo' />
              </Luster_Item>
            </a>
            <a
              className='w-[3.75rem] h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.instagram?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image src={InstagramSVG} alt='Instagram logo' />
              </Luster_Item>
            </a>
            <a
              className='w-[3.75rem] h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.tiktok?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image src={TiktokSVG} alt='Tiktok logo' />
              </Luster_Item>
            </a>
            <a
              className=' relative w-[3.75rem] h-[3.75rem]'
              href={SOCIAL_MEDIA_DATA?.whatsapp?.link}
              target='_blank'
            >
              <Luster_Item className=''>
                <Image src={WhatsappSVG} alt='Whatsapp logo' />
              </Luster_Item>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
