import Image from 'next/image';
import CustomLink from '@components/ui/CustomLink';
import ArrowRight from '@components/svg/shared/ArrowRight';

export default function ImageContainer({ image, alt, style, title, path }) {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(118deg, rgba(0, 0, 0, 0.50) 2.75%, rgba(0, 0, 0, 0.00) 54.45%)',
      }}
      className={`relative rounded-custom-32`}
    >
      <div className='relative w-full' style={{ zIndex: -1 }}>
        <Image quality={100} placeholder='blur' src={image} alt={alt} style={{ ...style }} />
      </div>
      <div className='absolute top-[2.5rem] left-[2.5rem]'>
        <h2 className='text-custom-32 font-custom-800 text-primary_4 font-gellix-Bold mb-2 select-none'>
          {title}
        </h2>
        <CustomLink path={path || '#'}>
          <div className='group flex gap-4 items-center text-custom-24 font-custom-400 text-primary_4 hover:text-primary_2 transition-all duration-200'>
            <span>View All</span>
            <ArrowRight className='fill-primary_4 group-hover:fill-primary_2' />
          </div>
        </CustomLink>
      </div>
    </div>
  );
}
