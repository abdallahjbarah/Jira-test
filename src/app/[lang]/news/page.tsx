import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

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
