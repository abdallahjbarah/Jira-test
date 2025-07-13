import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';
import React from 'react';

interface NewsPageProps {
  params: {
    lang: Locale;
  };
}

export default function NewsPage({
  params: { lang },
}: NewsPageProps): React.ReactElement {
  return <ComingSoon />;
}
