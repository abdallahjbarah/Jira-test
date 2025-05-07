import React from 'react';
import Hero from '@components/web/landing-page/Hero';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { Locale } from '@utils/constants';

interface ExperiencesPageProps {
  params: {
    lang: Locale;
  };
}

export default function ExperiencesPage(): React.ReactElement {
  return (
    <InnerPagesLayout>
      <main>
        <Hero className='min-h-[30.313rem] py-12' />
      </main>
    </InnerPagesLayout>
  );
}
