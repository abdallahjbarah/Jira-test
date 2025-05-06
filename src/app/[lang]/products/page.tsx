import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

interface ProductsPageProps {
  params: {
    lang: Locale;
  };
}

export default function ProductsPage({
  params: { lang },
}: ProductsPageProps): React.ReactElement {
  return <ComingSoon />;
}
