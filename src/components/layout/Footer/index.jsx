import CustomLink from '@components/ui/CustomLink';
import FacebookSvg from '@components/svg/FacebookSvg';
import InstagramSvg from '@components/svg/InstagramSvg';
import TiktokSvg from '@components/svg/TiktokSvg';
import LinkedinSvg from '@components/svg/LinkedinSvg';
import BookagriLogo from '@components/svg/BookagriLogo';
import WhatsappSvg from '@components/svg/WhatsappSvg';

export default function Footer() {
  return (
    <footer className='flex min-h-[28.625rem] flex-col items-center justify-between bg-primary_5'>
      <div className='mt-[4rem] w-full max-w-[102.5rem]'>
        <div className='flex flex-col items-center gap-x-[15.5rem] gap-y-8 lg:flex-row'>
          <div className='self-center laptopS:self-start'>
            <div className='w-full h-full max-w-[11.81rem] max-h-[3rem] m-auto laptopS:m-0'>
              <CustomLink path={'/'}>
                <BookagriLogo />
              </CustomLink>
            </div>
            <ul className='mt-6 laptopS:mt-[9.25rem] flex gap-[0.9375rem]'>
              <li>
                <a target='_blank' href='#'>
                  <FacebookSvg
                    style={
                      'fill-primary_4 hover:fill-primary_1 transition-all duration-500'
                    }
                  />
                </a>
              </li>
              <li>
                <a target='_blank' href='#'>
                  <InstagramSvg
                    style={
                      'fill-primary_4 hover:fill-primary_1 transition-all duration-500'
                    }
                  />
                </a>
              </li>
              <li>
                <a target='_blank' href='#'>
                  <TiktokSvg
                    style={
                      'fill-primary_4 hover:fill-primary_1 transition-all duration-500'
                    }
                  />
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  href='#'
                >
                  <LinkedinSvg
                    style={
                      'fill-primary_4 hover:fill-primary_1 transition-all duration-500'
                    }
                  />
                </a>
              </li>
              <li>
                <a target='_blank' href='#'>
                  <WhatsappSvg
                    style={
                      'fill-primary_4 hover:fill-primary_1 transition-all duration-500'
                    }
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className='flex w-full flex-col items-center justify-end gap-y-8 tabletM:flex-row tabletM:items-start'>
            {/* Pages */}
            <div className='w-[19rem] tabletM:w-[12.5rem] tabletM:me-6'>
              <h2 className='text-custom-20 font-custom-700 text-primary_4'>
                Pages
              </h2>
              <ul className='my-[1.5rem] flex w-full flex-col gap-4 tabletM:mt-6'>
                <CustomLink path={'/'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Home
                  </p>
                </CustomLink>
                <CustomLink path={'about-us'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    About Us
                  </p>
                </CustomLink>
                <CustomLink path={'news'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    News
                  </p>
                </CustomLink>
                <CustomLink path={'gallery'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Gallery
                  </p>
                </CustomLink>
                <CustomLink path={'experiences'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Experiences
                  </p>
                </CustomLink>
              </ul>
            </div>

            <div className='w-[19rem] tabletM:w-[12.5rem] tabletM:me-20'>
              <ul className='flex w-full flex-col gap-4 tabletM:mt-[3.375rem]'>
                <CustomLink path={'events'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Events
                  </p>
                </CustomLink>
                <CustomLink path={'stays'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Stays
                  </p>
                </CustomLink>
                <CustomLink path={'offers-packages'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Offers & Packages
                  </p>
                </CustomLink>
                <CustomLink path={'products'}>
                  <p className='text-custom-18 font-custom-400 text-primary_4 transition-all duration-300 hover:font-custom-800 hover:text-primary_1'>
                    Products
                  </p>
                </CustomLink>
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
                  <h2 className='font-custom-700'>Email</h2>
                  <p className='font-custom-400'>info@bookagri.com</p>
                </div>

                <div className='text-custom-18 text-primary_4'>
                  <h2 className='font-custom-700'>Phone</h2>
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
                  <h2 className='font-custom-700'>Address</h2>
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
