'use client';

import React, { useCallback, useState } from 'react';
import Slider, { Settings as SlickSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ImageWithFallback, {
  ImageWithFallbackProps,
} from '../ImageWithFallback';

export interface ImageCarouselProps {
  images: string[];
  slickProps?: Partial<SlickSettings>;
  className?: string;
  imageClassName?: string;
  imageHeight?: string;
  imageProps?: Partial<ImageWithFallbackProps>;
}

const defaultSettings: SlickSettings = {
  dots: true,
  infinite: true,
  speed: 400, // Faster transition speed
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000, // Faster autoplay (2 seconds)
  arrows: true,
  lazyLoad: 'progressive',
  pauseOnHover: true,
  className:
    'rounded-custom-16 overflow-hidden relative slick-custom-arrows h-full',
  customPaging: () => (
    <div className='w-2 h-2 mx-1 rounded-full bg-white hover:bg-white/80 transition-colors duration-200' />
  ),
  appendDots: (dots: React.ReactNode) => {
    // Convert dots array to exactly 4 dots
    const dotsArray = React.Children.toArray(dots);
    const totalSlides = dotsArray.length;
    let visibleDots = dotsArray;

    if (totalSlides > 4) {
      const currentSlide = (dots as any).props?.children?.findIndex(
        (dot: any) => dot.props?.className?.includes('slick-active')
      );

      let start = 0;
      if (currentSlide >= 3) {
        start = Math.min(currentSlide - 1, totalSlides - 4);
      }

      visibleDots = dotsArray.slice(start, start + 4);
    }

    return (
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
        <ul style={{ margin: '0', padding: '0' }}>{visibleDots}</ul>
      </div>
    );
  },
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  slickProps,
  className = 'w-full h-full relative',
  imageClassName = 'object-cover',
  imageHeight = 'h-full',
  imageProps,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = React.useRef<Slider>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (sliderRef.current && images.length > 1) {
      sliderRef.current.slickPlay();
    }
  }, [images.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  }, []);

  const settings = React.useMemo(() => {
    return {
      ...defaultSettings,
      ...slickProps,
      dots: images.length > 1,
      arrows: images.length > 1,
      infinite: images.length > 1,
      autoplay: false, // We'll control this with hover
    };
  }, [slickProps, images.length]);

  return (
    <div
      className={className}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style jsx global>{`
        .slick-custom-arrows .slick-prev,
        .slick-custom-arrows .slick-next {
          width: 48px;
          height: 48px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          z-index: 10;
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
        }

        .slick-custom-arrows:hover .slick-prev,
        .slick-custom-arrows:hover .slick-next {
          opacity: 1;
          visibility: visible;
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
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          display: flex !important;
          justify-content: center;
          gap: 24px; /* Doubled gap between dots */
          padding: 0 24px; /* Increased padding */
        }

        .slick-slider:hover .slick-dots {
          opacity: 1;
          visibility: visible;
        }

        .slick-dots li {
          width: 10px; /* Slightly larger dots */
          height: 10px;
          margin: 0;
          padding: 0;
        }

        .slick-dots li button {
          width: 10px;
          height: 10px;
          padding: 0;
        }

        .slick-dots li button:before {
          width: 10px;
          height: 10px;
          color: white;
          opacity: 0.5;
          transition: all 0.2s ease;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: white;
          transform: scale(1.3); /* Larger active dot */
        }

        .slick-dots li.slick-more {
          cursor: default;
          margin-left: 8px; /* More space before ellipsis */
        }

        .slick-slide > div {
          height: 100%;
        }
      `}</style>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className={`relative ${imageHeight}`}>
            <ImageWithFallback
              src={image}
              alt={`Image ${index + 1}`}
              className={imageClassName}
              loading={index === 0 ? 'eager' : 'lazy'}
              {...imageProps}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(ImageCarousel);
