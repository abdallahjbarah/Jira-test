import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';

interface EventsPageProps {
  params: {
    lang: Locale;
  };
}

export default function EventsPage({
  params: { lang },
}: EventsPageProps): React.ReactElement {
  return <ComingSoon />;
}
