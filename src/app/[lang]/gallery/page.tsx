import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';
import React from 'react';

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
