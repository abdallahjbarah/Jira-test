import React from 'react';
import Hero from '@components/web/landing-page/Hero';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import ContactUs from '@/components/web/landing-page/ContactUs';
import { Locale, COLLECTION_STATUS_LIST } from '@utils/constants';
import { notFound } from 'next/navigation';

interface CollectionStatusPageProps {
  params: {
    lang: Locale;
    collectionStatus: string;
  };
}

export default function CollectionStatusPage({
  params,
}: CollectionStatusPageProps): React.ReactElement {
  const { collectionStatus } = params;
  console.log('collectionStatus', collectionStatus);

  if (!COLLECTION_STATUS_LIST.some((item) => item.value === collectionStatus)) {
    return notFound();
  }

  return (
    <InnerPagesLayout>
      <main>
        <Hero className='min-h-[30.313rem] py-12' />
        <DownloadApp />
        <ContactUs />
        <ContactUsForm />
      </main>
    </InnerPagesLayout>
  );
}
