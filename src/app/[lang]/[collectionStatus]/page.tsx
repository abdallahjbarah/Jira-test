import React from 'react';
import Hero from '@components/web/landing-page/Hero';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import ContactUs from '@/components/web/landing-page/ContactUs';
import { Locale, COLLECTION_STATUS_LIST } from '@utils/constants';
import { notFound } from 'next/navigation';
import CollectionsListing from '@/components/web/collections/CollectionsListing';
import ComingSoon from '@/components/shared/ComingSoon';

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

  const collectionStatusItem = COLLECTION_STATUS_LIST.find(
    (item) => item.value === collectionStatus,
  );

  if (!collectionStatusItem) {
    return notFound();
  }

  if (collectionStatusItem.isSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Hero className='min-h-[30.313rem] laptopS:pb-[22px]' />
      <div className='container py-[29px]'>
        <CollectionsListing />
      </div>
      <DownloadApp />
      <ContactUs />
      <ContactUsForm />
    </>
  );
}
