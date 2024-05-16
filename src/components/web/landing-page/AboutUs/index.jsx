import Image from 'next/image';
import AboutUsImg from '@images/home/AboutUs.jpg';
import VisionSVG from '@SVGs/home/VisionSVG.svg';
import MissionSvg from '@SVGs/home/MissionSvg.svg';
import FilledButton from '@components/ui/buttons/FilledButton';

export default function AboutUs() {
  return (
    <section id='AboutUs' className='bg-secondary_2 min-h-screen w-full flex ps-[8.75rem] items-center'>
      <div className='flex flex-col laptopS:flex-row gap-20 items-center'>
        {/* Image */}
        <div className='w-[50rem] h-[50rem] my-[8.75rem]'>
          <Image style={{borderRadius: "2rem"}} placeholder="blur" src={AboutUsImg} alt='AboutUs' />
        </div>

        {/* Content */}
        <div className='flex flex-col gap-12 max-w-[43.875rem]'>
          {/* About Us */}
          <div>
            <h1 className='text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold'>
              About Us
            </h1>
            <p className='text-custom-24 font-custom-400 text-secondary_1 mt-6'>
              Bookagri was born in 2015 with an idea to connect farmers and
              farming experiences with local and foreign tourists. Every day,
              hosts offer unique agritourism experiences and rural stays that
              make it possible for guests to connect with rural communities in a
              more authentic way.
            </p>
          </div>

          {/* Vision */}
          <div className='flex gap-4'>
            <div className='w-full bg-primary_4 max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
              <div className='w-10 h-9'>
                <Image src={VisionSVG} alt='Vision logo' />
              </div>
            </div>
            <div>
              <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                Vision
              </h2>
              <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                Bookagri envisions a leading global interactive platform for
                agritourism where anyone can belong to any agritourism
                experience anytime, anywhere using their device.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className='flex gap-4'>
            <div className='w-full bg-primary_4 max-w-[6.4375rem] max-h-[6.4375rem] rounded-custom-20 flex justify-center items-center'>
              <div className='w-10 h-9'>
                <Image src={MissionSvg} alt='Mission logo' />
              </div>
            </div>
            <div>
              <h2 className='text-custom-24 font-custom-800 text-primary_5 font-gellix-Bold'>
                Mission
              </h2>
              <p className='text-custom-18 font-custom-400 text-secondary_1 mt-2'>
                Bookagri is on a mission to bring in all agritourism businesses
                to its platform where everyone can connect with their inner
                farmer at any village, farm and countryside worldwide.{' '}
              </p>
            </div>
          </div>

          {/* Read More */}
          <div className=''>
            <FilledButton
              path='#'
              text='Read More'
              width='w-[11.3125rem]'
              height='h-[4.8125rem]'
              className='mt-5 rounded-custom-16'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
