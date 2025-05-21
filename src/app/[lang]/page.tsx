import React from 'react';
import LandingPage from '@containers/web/LandingPage';
import PublicLayout from '@layouts/PublicLayout';
import { SEO_KEYWORDS } from '@utils/constants';
import Head from 'next/head';
import { Locale } from '@utils/constants';
import { getDictionary } from '@/utils/dictionaries';
import { Metadata } from 'next';

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
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Bookagri',
              url: 'https://www.bookagri.com',
              logo: 'https://www.bookagri.com/images/shared/BookagriLogo.png',
              sameAs: [
                'https://www.facebook.com/bookagrijo/',
                'https://www.instagram.com/bookagri',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+962-77-2236393',
                contactType: 'Customer Service',
              },
            }),
          }}
        />
      </Head>
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    </>
  );
}
