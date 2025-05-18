import React from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className='rounded-custom-16 overflow-hidden w-full h-[30rem] relative'>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className='object-cover'
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className='flex gap-4 w-full h-[30rem]'>
        <div className='flex-1 relative rounded-custom-16 overflow-hidden'>
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex-1 relative rounded-custom-16 overflow-hidden'>
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            className='object-cover'
          />
        </div>
      </div>
    );
  }

  // Three or more images: 1 big left, 2 stacked right
  return (
    <div className='flex gap-4 w-full h-[30rem]'>
      <div className='flex-[2] relative rounded-custom-16 overflow-hidden'>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-4 flex-1 h-full'>
        <div className='relative rounded-custom-16 overflow-hidden flex-1'>
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            className='object-cover'
          />
        </div>
        <div className='relative rounded-custom-16 overflow-hidden flex-1'>
          <Image
            src={images[2].src}
            alt={images[2].alt}
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery; 