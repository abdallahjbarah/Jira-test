'use client';
import FallbackImage from '@public/images/shared/BookagriLogo.png';
import Image, { ImageProps, StaticImageData } from 'next/image';
import React from 'react';
import Shimmer from '../Shimmer';

type ImageSource = string | StaticImageData;

export interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: ImageSource;
  fallbackSrc?: ImageSource;
}

const ImageShimmer = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`absolute rounded-md inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Shimmer />
    </div>
  );
};

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}: ImageWithFallbackProps) => {
  const [state, setState] = React.useState({
    imgSrc: src,
    isLoading: true,
  });

  const handleError = React.useCallback(() => {
    const fallback = fallbackSrc || FallbackImage;
    setState((prev) => ({ ...prev, imgSrc: fallback as ImageSource }));
  }, [fallbackSrc]);

  const handleLoad = React.useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  React.useEffect(() => {
    if (src) {
      setState((prev) => ({ ...prev, imgSrc: src }));
    }
  }, [src]);

  return (
    <div className='relative w-full h-full'>
      <Image
        {...rest}
        unoptimized
        src={(state.imgSrc || FallbackImage) as string | StaticImageData}
        alt={alt}
        onError={handleError}
        loading='lazy'
        onLoad={handleLoad}
      />
      <ImageShimmer isLoading={state.isLoading} />
    </div>
  );
};

export default React.memo(ImageWithFallback);
