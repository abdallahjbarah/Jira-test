import React from 'react';
import PublicLayout from '@layouts/PublicLayout';

interface ErrorPagesLayoutProps {
  title: string;
  subTitle: string;
  image: React.ReactNode;
  hasRedirectButton?: boolean;
  path?: string;
}

export default function ErrorPagesLayout({
  title,
  subTitle,
  image,
  hasRedirectButton = true,
  path = '/',
}: ErrorPagesLayoutProps): React.ReactElement {
  return (
    <PublicLayout isFooter={false}>
      <div
        className='flex flex-col justify-center items-center'
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <div className='text-center mb-10'>
          <div className='text-grayscale_1 text-custom-48 leading-custom-80 font-custom-600 mb-8'>
            {title}
          </div>
          <div className='text-grayscale_2 text-custom-18 leading-custom-30 font-custom-500 mb-8'>
            {subTitle}
          </div>
        </div>
        <div className='imageContainer'>{image}</div>
      </div>
    </PublicLayout>
  );
}
