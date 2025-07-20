import FilterBar from '@/components/shared/FilterBar';
import CollectionsListing from '@/components/web/collections/CollectionsListing';
import ContactUs from '@/components/web/landing-page/ContactUs';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { getDictionary } from '@/utils/dictionaries';
import { Locale, SEO_KEYWORDS } from '@utils/constants';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

interface CollectionsPageProps {
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({
  params,
}: CollectionsPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: SEO_KEYWORDS,
    openGraph: {
      url: 'https://www.bookagri.com/',
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [
        {
          url: 'https://www.bookagri.com/images/shared/BookagriLogo.png',
          width: 300,
          height: 150,
          alt: dictionary.metadata.logoAlt,
        },
      ],
      siteName: dictionary.metadata.siteName,
    },
    twitter: {
      creator: '@bookagri',
      site: '@bookagri',
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function CollectionsPage({
  params,
}: CollectionsPageProps): React.ReactElement {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main>
        <div className='container mb-[30px] laptopM:mb-[68px] flex items-center justify-center'>
          <Suspense
            fallback={
              <div className='h-[60px] flex items-center justify-center'>
                Loading filters...
              </div>
            }
          >
            <FilterBar />
          </Suspense>
        </div>
        <div className='container py-[29px]'>
          <Suspense
            fallback={
              <div className='h-[200px] flex items-center justify-center'>
                Loading collections...
              </div>
            }
          >
            <CollectionsListing />
          </Suspense>
        </div>
        <DownloadApp />
        <ContactUs />
        <ContactUsForm />
      </main>
    </InnerPagesLayout>
  );
}
