'use client';
import { t } from '@/utils';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Lightbox } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ImagesGallery = ({ images }: { images: string[] }) => {

  const { id } = useParams();

  // Preload images for lightbox
  useEffect(() => {
    if (!images || images.length === 0) return;

    images.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, [images]);

  const [index, setIndex] = useState(-1);

  const handleImageClick = (clickedIndex: number) => {
    setIndex(clickedIndex);
  };

  const handleShowAllClick = () => {
    setIndex(5);
  };

  // Get the images to display in the grid (max 5 images)
  const mainImage = images?.[0];
  const gridImages = images?.slice(1, 5) || [];
  const totalImages = images?.length || 0;

  const slides = images?.map(img => ({ src: img })) || [];

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-4 gap-2 rounded-lg overflow-hidden">
        {/* Main large image - left side */}
        <div className="col-span-2 relative aspect-[3/4]">
          <img
            src={mainImage}
            alt="Main property image"
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all duration-200"
            onClick={() => handleImageClick(0)}
          />
        </div>

        {/* Right side grid */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {gridImages.map((image, index) => (
            <div key={index} className="relative aspect-[3/4]">
              <img
                src={image}
                alt={`Property image ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all duration-200"
                onClick={() => handleImageClick(index + 1)}
              />
              
              {/* Show all photos button on the last visible image */}
              {index === 3 && totalImages > 5 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowAllClick();
                  }}
                  className="absolute bottom-2 right-2 bg-white text-black px-3 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1 text-sm shadow-lg z-10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM17 14H20V17H17V14Z" fill="currentColor"/>
                  </svg>
                  {t('showAllPhotos')}
                </button>
              )}
            </div>
          ))}
          
          {/* Fill empty spaces if less than 4 images */}
          {gridImages.length < 4 && Array.from({ length: 4 - gridImages.length }).map((_, index) => (
            <div key={`empty-${index}`} className="bg-gray-200 aspect-[3/4]" />
          ))}
        </div>
      </div>

      {/* Show all photos button when there are more than 1 image but no grid overlay */}
      {totalImages > 4 && (gridImages.length < 4 || totalImages <= 5) && (
        <button
          onClick={handleShowAllClick}
          className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM17 14H20V17H17V14Z" fill="currentColor"/>
          </svg>
          {t('showAllPhotos')}
        </button>
      )}
      
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
        on={{ view: ({ index: i }) => setIndex(i) }}
        styles={{
          container: {
            backgroundColor: '#000000d9',
          },
        }}
      />
    </div>
  )
}

export default ImagesGallery
