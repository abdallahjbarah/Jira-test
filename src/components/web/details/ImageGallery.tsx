import Image from 'next/image';
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className='rounded-custom-16 overflow-hidden w-full h-[30rem] relative'>
        <Image src={images[0]} alt={images[0]} fill className='object-cover' />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className='flex gap-4 w-full h-[30rem]'>
        <div className='flex-1 relative rounded-custom-16 overflow-hidden'>
          <Image
            src={images[0]}
            alt={images[0]}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex-1 relative rounded-custom-16 overflow-hidden'>
          <Image
            src={images[1]}
            alt={images[1]}
            fill
            className='object-cover'
          />
        </div>
      </div>
    );
  }

  // More than 2 images
  const showModal = (index: number) => {
    setCarouselIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='flex gap-4 w-full h-[30rem]'>
        <div className='flex-[2] relative rounded-custom-16 overflow-hidden'>
          <Image src={images[0]} alt={images[0]} fill className='object-cover' />
        </div>
        <div className='flex flex-col gap-4 flex-1 h-full'>
          <div className='relative rounded-custom-16 overflow-hidden flex-1'>
            <Image
              src={images[1]}
              alt={images[1]}
              fill
              className='object-cover'
            />
          </div>
          <div
            className='relative rounded-custom-16 overflow-hidden flex-1'
          >
            <button
              type='button'
              className='w-full h-full absolute inset-0 z-10 cursor-pointer focus:outline-none'
              aria-label={images.length > 3 ? `Show ${images.length - 3} more images` : 'Open image gallery'}
              onClick={() => showModal(2)}
              tabIndex={0}
            >
              {/* Empty button for accessibility and click/keyboard support */}
            </button>
            <Image
              src={images[2]}
              alt={images[2]}
              fill
              className='object-cover'
              style={{ filter: images.length > 3 ? 'blur(2px) brightness(0.7)' : undefined }}
            />
            {images.length > 3 && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-white text-3xl font-bold bg-black bg-opacity-50 px-6 py-2 rounded-full'>
                  +{images.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal Popup */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
          <div className='relative bg-white rounded-lg p-4 max-w-3xl w-full'>
            <button
              className='absolute top-2 right-2 text-black text-2xl font-bold z-10'
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className='flex items-center justify-center'>
              <button
                className='text-2xl px-2'
                onClick={() => setCarouselIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              >
                &#8592;
              </button>
              <div className='relative w-[30rem] h-[20rem] mx-4'>
                <Image
                  src={images[carouselIndex]}
                  alt={images[carouselIndex]}
                  fill
                  className='object-contain rounded-lg'
                />
              </div>
              <button
                className='text-2xl px-2'
                onClick={() => setCarouselIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              >
                &#8594;
              </button>
            </div>
            <div className='flex justify-center mt-2 gap-2'>
              {images.map((img, idx) => (
                <button
                  key={img}
                  className={`w-4 h-4 rounded-full ${idx === carouselIndex ? 'bg-black' : 'bg-gray-300'}`}
                  onClick={() => setCarouselIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
