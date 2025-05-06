import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

interface StaysPageProps {
  params: {
    lang: Locale;
  };
}

export default function StaysPage({
  params: { lang },
}: StaysPageProps): React.ReactElement {
  return <ComingSoon />;
}
