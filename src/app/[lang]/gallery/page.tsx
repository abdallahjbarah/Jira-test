import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

interface GalleryPageProps {
  params: {
    lang: Locale;
  };
}

export default function GalleryPage({
  params: { lang },
}: GalleryPageProps): React.ReactElement {
  return <ComingSoon />;
}
