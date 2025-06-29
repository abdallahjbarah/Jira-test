import { SEO_KEYWORDS, Locale } from '@utils/constants';
import { Metadata } from 'next';
import { fetchPolicies } from '@/lib/apis/policies/useFetchPolicies';
import React from 'react';

type Props = {
  params: { lang: Locale };
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { lang } = params;

  let termsDescription = '';
  try {
    const policiesData = await fetchPolicies();

    if (lang === 'ar' && policiesData.termsConditionsAr) {
      termsDescription = policiesData.termsConditionsAr.substring(0, 200);

      if (policiesData.termsConditionsAr.length > 200) {
        termsDescription += '...';
      }
    } else if (policiesData.termsConditionsEn) {
      termsDescription = policiesData.termsConditionsEn.substring(0, 200);

      if (policiesData.termsConditionsEn.length > 200) {
        termsDescription += '...';
      }
    } else {
      termsDescription =
        lang === 'ar'
          ? 'الشروط والأحكام الخاصة ببوكاجري. يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا وخدماتنا.'
          : 'Bookagri Terms and Conditions. Please read these terms carefully before using our website and services.';
    }
  } catch (error) {
    termsDescription =
      lang === 'ar'
        ? 'الشروط والأحكام الخاصة ببوكاجري. يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا وخدماتنا.'
        : 'Bookagri Terms and Conditions. Please read these terms carefully before using our website and services.';
  }

  return {
    title:
      lang === 'ar'
        ? 'بوكاجري - الشروط والأحكام'
        : 'Bookagri - Terms & Conditions',
    description: termsDescription,
    keywords: SEO_KEYWORDS,
    openGraph: {
      url: 'https://www.bookagri.com/terms-and-conditions',
      title:
        lang === 'ar'
          ? 'بوكاجري - الشروط والأحكام'
          : 'Bookagri - Terms & Conditions',
      description: termsDescription,
      images: [
        {
          url: 'https://www.bookagri.com/images/shared/BookagriLogo.png',
          width: 300,
          height: 150,
          alt: 'Bookagri Logo',
        },
      ],
      siteName: 'Bookagri',
    },
    twitter: {
      creator: '@bookagri',
      site: '@bookagri',
      card: 'summary_large_image',
    },
  };
}

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
