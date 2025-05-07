import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface LoaderProps {
  isFullScreen?: boolean;
  style: string;
  width?: string;
}

export default function Loader({
  isFullScreen = true,
  style = '',
  width = '60',
}: LoaderProps): React.ReactElement {
  return (
    <div
      className={`${style} flex justify-center items-center ${
        isFullScreen && 'h-screen'
      } bg-opacity-10`}
    >
      <RotatingLines
        strokeColor='#47C409'
        strokeWidth='3'
        animationDuration='1.5'
        width={width}
        visible={true}
      />
    </div>
  );
}
