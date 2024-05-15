import BookagriLogo from '@components/svg/BookagriLogo';
import CustomLink from '@components/ui/CustomLink';
import FilledButton from '@components/ui/buttons/FilledButton';
import BgHomePage from '@public/images/home/BgHomePage.jpg';
import Image from 'next/image';

export default function ComingSoon() {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(183deg, rgba(0, 0, 0, 0.33) 8.42%, rgba(0, 0, 0, 0.00) 38.77%), linear-gradient(92deg, rgba(0, 0, 0, 0.44) 18.39%, rgba(0, 0, 0, 0.00) 107.81%)',
      }}
      className='relative w-full h-screen flex items-center justify-center bg-gradient-full'
    >
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <Image
          src={BgHomePage}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='Background'
          priority
        />
      </div>
      <div className='z-10 text-white text-center'>
        <div className='absolute top-[20px] left-[20px]'>
          <CustomLink path={'/'}>
            <BookagriLogo />
          </CustomLink>
        </div>

        <h1 className='text-custom-72 font-custom-700'>Coming Soon</h1>
        <p className='text-custom-32 mt-2 font-custom-400'>
          We're working hard to bring you something amazing.
          <br /> Stay tuned!
        </p>
        <FilledButton
          path='/'
          text='Go To Home'
          width='w-[13.67rem]'
          height='h-[4.81rem]'
          className='mt-5 rounded-custom-16'
        />
      </div>
    </div>
  );
}
