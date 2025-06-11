import React from 'react';
import Hero from '@components/web/landing-page/Hero';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import ContactUs from '@/components/web/landing-page/ContactUs';
import { Locale, COLLECTION_STATUS_LIST, COLLECTION_STATUS } from '@utils/constants';
import { notFound, redirect } from 'next/navigation';
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
  const { collectionStatus, lang } = params;

  // Redirect "all" to the homepage since it's now the main page
  if (collectionStatus === COLLECTION_STATUS.ALL) {
    redirect(`/${lang}`);
  }

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
      <Hero className='min-h-[30.313rem]' contentClassName='py-[1.375rem]' />
      <div className='container py-[29px]'>
        <CollectionsListing />
      </div>
      <DownloadApp />
      <ContactUs />
      <ContactUsForm />
    </>
  );
}
