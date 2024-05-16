import Image from 'next/image';
import DownloadBookagriApp from '@images/home/DownloadBookagriApp.png';
import AppStoreSvg from '@SVGs/home/AppStore.svg';
import GooglePlaySvg from '@SVGs/home/GooglePlay.svg';
import MovingColorfulBorder from '@components/ui/MovingColorfulBorder';

export default function DownloadApp() {
  return (
    <section className='bg-secondary_2 w-full flex justify-center items-center'>
      <div className='flex flex-col laptopS:flex-row gap-20 items-center'>
        {/* Content */}
        <div className='flex flex-col gap-12 max-w-[43.875rem]'>
          {/* About Us */}
          <div>
            <h2 className='text-custom-32 font-custom-400 text-primary_1 mb-2'>
              Download the Bookagri app
            </h2>
            <h1 className='text-custom-48 font-custom-800 text-primary_5 font-gellix-Bold mb-6'>
              Choose your experience, create lifelong memories
            </h1>
            <p className='text-custom-24 font-custom-400 text-secondary_1'>
              The Bookagri app brings together a global community of guests and
              hosts. You can find your perfect farm or rural stay along with the
              most fun and interactive agritourism experiences here led by
              locals besides locally made foods and crafts.
            </p>
          </div>
          <div className='flex gap-6'>
            {/* App Store */}
            <MovingColorfulBorder className='rounded-[12px]'>
              <a className='element' href='#' target='_blank'>
                <Image src={GooglePlaySvg} alt='Frame' />
              </a>
            </MovingColorfulBorder>

            {/* Google Play */}
            <MovingColorfulBorder className='rounded-[12px]'>
              <a href='#' target='_blank'>
                <Image src={AppStoreSvg} alt='Frame' />
              </a>
            </MovingColorfulBorder>
          </div>
        </div>

        {/* Image */}
        <div className='w-[36rem] h-[40.125rem] my-10 rounded-custom-32'>
          <Image placeholder='blur' src={DownloadBookagriApp} alt='AboutUs' />
        </div>
      </div>
    </section>
  );
}
