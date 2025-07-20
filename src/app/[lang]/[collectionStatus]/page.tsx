import ComingSoon from '@/components/shared/ComingSoon';
import CollectionsListing from '@/components/web/collections/CollectionsListing';
import ContactUs from '@/components/web/landing-page/ContactUs';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import {
  COLLECTION_STATUS,
  COLLECTION_STATUS_LIST,
  Locale,
} from '@utils/constants';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

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

  if (collectionStatus === COLLECTION_STATUS.ALL) {
    redirect(`/${lang}`);
  }

  const collectionStatusItem = COLLECTION_STATUS_LIST.find(
    item => item.value === collectionStatus
  );

  if (!collectionStatusItem) {
    return notFound();
  }

  if (collectionStatusItem.isSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <div className='container py-[29px]'>
        <CollectionsListing />
      </div>
      <DownloadApp />
      <ContactUs />
      <ContactUsForm />
    </>
  );
}
