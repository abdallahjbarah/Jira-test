'use client';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';

const ImagesGallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) {
    return null;
  }

  const handleClick = (index: number) => setIndex(index);

  const thumbnail = images[0];
  const galleryImages = images.slice(1);
  const slides = [thumbnail, ...galleryImages];

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-9 gap-[16px] lg:h-[600px] w-full'>
        <div className='rounded-lg h-[320px] relative lg:col-span-5 w-full  lg:h-[600px] shadow-md'>
          <Image
            onClick={() => handleClick(0)}
            width={600}
            height={600}
            src={thumbnail}
            alt='Main property image'
            className='rounded-[6px] h-full cursor-pointer w-full object-cover hover:brightness-75 transition-all duration-200'
            unoptimized
            onError={(e) => {}}
          />
        </div>
        <div className='hidden lg:grid lg:grid-cols-2 lg:col-span-4 lg:gap-[16px]'>
          {galleryImages.map((img, idx) => {
            if (idx < 4)
              return (
                <button
                  key={idx}
                  onClick={() => handleClick(idx + 1)}
                  className='max-h-[292px] shadow-md relative border-0 p-0 bg-transparent'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClick(idx + 1);
                    }
                  }}
                >
                  <Image
                    src={img}
                    alt={`img-${idx}`}
                    width={292}
                    height={292}
                    className='h-full w-full rounded-[6px] cursor-pointer bg-propy-overlay object-cover hover:brightness-75 transition-all duration-200'
                    unoptimized
                    onError={(e) => {}}
                  />
                  {idx === 3 && galleryImages.length > 4 && (
                    <div className='bg-propy-overlay rounded-[6px] w-full h-full text-center bottom-[100%] relative flex items-center justify-center cursor-pointer'>
                      <span className='text-[24px] text-[white]'>
                        + {galleryImages.length - 4}
                      </span>
                    </div>
                  )}
                </button>
              );
          })}
        </div>
      </div>
      <div className=''>
        <Lightbox
          slides={slides.map((slide) => ({ src: slide }))}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Counter, Fullscreen, Slideshow, Zoom]}
          counter={{
            separator: '/',
            container: {
              color: 'white',
            },
          }}
        />
      </div>
    </>
  );
};

export default ImagesGallery;
