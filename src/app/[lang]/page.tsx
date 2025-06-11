import React from 'react';
import Hero from '@components/web/landing-page/Hero';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import ContactUs from '@/components/web/landing-page/ContactUs';
import FilterBar from '@/components/shared/FilterBar';
import { Locale } from '@utils/constants';
import CollectionsListing from '@/components/web/collections/CollectionsListing';
import { getDictionary } from '@/utils/dictionaries';
import { Metadata } from 'next';
import { SEO_KEYWORDS } from '@utils/constants';

interface HomePageProps {
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
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

export default function Home({ params }: HomePageProps): React.ReactElement {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main>
        <div className='container mb-[30px] laptopM:mb-[68px] flex items-center justify-center'>
          <FilterBar />
        </div>
        <Hero className='min-h-[30.313rem]' contentClassName='py-[1.375rem]' />

        <div className='container py-[29px]'>
          <CollectionsListing />
        </div>
        <DownloadApp />
        <ContactUs />
        <ContactUsForm />
      </main>
    </InnerPagesLayout>
  );
}
