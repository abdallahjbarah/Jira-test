import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

interface OffersPackagesPageProps {
  params: {
    lang: Locale;
  };
}

export default function OffersPackagesPage({
  params: { lang },
}: OffersPackagesPageProps): React.ReactElement {
  return <ComingSoon />;
}
