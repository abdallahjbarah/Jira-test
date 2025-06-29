'use client';

import React from 'react';
import Slider, { Settings as SlickSettings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageWithFallback, {
  ImageWithFallbackProps,
} from '../ImageWithFallback';

export interface ImageCarouselProps {
  images: string[];
  slickProps?: Partial<SlickSettings>;
  className?: string;
  imageClassName?: string;
  imageHeight?: string;
  imageProps?: ImageWithFallbackProps;
}

const defaultSettings: SlickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  className:
    'rounded-custom-16 overflow-hidden relative slick-custom-arrows h-full',
  customPaging: () => (
    <div className='w-2 h-2 mx-0.5 rounded-full bg-white hover:bg-white/80 transition-colors duration-200' />
  ),
  appendDots: (dots: React.ReactNode) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        position: 'absolute',
        bottom: '20px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <ul style={{ margin: '0' }}> {dots} </ul>
    </div>
  ),
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  slickProps,
  className = 'w-full h-full relative',
  imageClassName = 'object-cover',
  imageHeight = 'h-full',
  imageProps,
}) => {
  const settings = React.useMemo(() => {
    return { ...defaultSettings, ...slickProps };
  }, [slickProps]);

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
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

        .slick-dots {
          bottom: 24px;
        }

        .slick-dots li {
          width: 8px;
        }

        .slick-dots li.slick-active {
          width: back;
        }
      `}</style>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={`relative ${imageHeight}`}>
            <ImageWithFallback
              src={image}
              alt={image}
              className={imageClassName}
              loading='lazy'
              {...imageProps}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(ImageCarousel);
