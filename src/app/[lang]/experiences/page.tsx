import React from 'react';
import ComingSoon from '@components/shared/ComingSoon';
import { Locale } from '@utils/constants';
import Hero from '@components/web/landing-page/Hero';
import PublicLayout from '@/layouts/PublicLayout';

interface ExperiencesPageProps {
  params: {
    lang: Locale;
  };
}

export default function ExperiencesPage(): React.ReactElement {
  return (
    <PublicLayout>
      <main className='relative flex flex-col items-center bg-white px-4'>
        <Hero className='min-h-[30.313rem]' />
      </main>
    </PublicLayout>
  );
}
