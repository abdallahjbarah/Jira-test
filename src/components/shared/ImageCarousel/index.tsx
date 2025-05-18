'use client';

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import CustomSvg from '@/components/ui/CustomSvg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  onFavoriteToggle: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onFavoriteToggle,
  isFavorite,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    className: 'rounded-custom-16 overflow-hidden relative slick-custom-arrows',
    customPaging: () => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-colors duration-200" />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="w-full h-[71.6875rem] relative mb-20">
      <style jsx global>{`
        .slick-custom-arrows .slick-prev,
        .slick-custom-arrows .slick-next {
          width: 48px;
          height: 48px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          z-index: 10;
          transition: background-color 0.3s;
        }
        
        .slick-custom-arrows .slick-prev {
          left: 24px;
        }
        
        .slick-custom-arrows .slick-next {
          right: 24px;
        }
        
        .slick-custom-arrows .slick-prev:hover,
        .slick-custom-arrows .slick-next:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        
        .slick-custom-arrows .slick-prev:before,
        .slick-custom-arrows .slick-next:before {
          font-size: 24px;
          opacity: 1;
        }
      `}</style>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[71.6875rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
      
      <button
        className="absolute top-3 right-3 z-10 p-6 hover:!text-primary_2"
        onClick={onFavoriteToggle}
      >
        <CustomSvg
          src="/SVGs/shared/heart-icon.svg"
          width={30}
          height={30}
          color={isFavorite ? '#FE360A' : '#fff'}
          className="transition-colors duration-200"
        />
      </button>
    </div>
  );
};

export default ImageCarousel; 