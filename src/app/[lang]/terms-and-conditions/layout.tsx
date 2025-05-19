import { SEO_KEYWORDS } from '@utils/constants';
import { Metadata } from 'next';
import { Locale } from '@utils/constants';
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

  // Fetch policy content from API
  let termsDescription = '';
  try {
    const policiesData = await fetchPolicies();

    // Extract terms and conditions content based on language
    if (lang === 'ar' && policiesData.termsConditionsAr) {
      // Extract the first 200 characters as a summary for the description
      termsDescription = policiesData.termsConditionsAr.substring(0, 200);
      // Add ellipsis if the content is longer than 200 characters
      if (policiesData.termsConditionsAr.length > 200) {
        termsDescription += '...';
      }
    } else if (policiesData.termsConditionsEn) {
      // Extract the first 200 characters as a summary for the description
      termsDescription = policiesData.termsConditionsEn.substring(0, 200);
      // Add ellipsis if the content is longer than 200 characters
      if (policiesData.termsConditionsEn.length > 200) {
        termsDescription += '...';
      }
    } else {
      // Fallback descriptions if API doesn't return content
      termsDescription =
        lang === 'ar'
          ? 'الشروط والأحكام الخاصة ببوكاجري. يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا وخدماتنا.'
          : 'Bookagri Terms and Conditions. Please read these terms carefully before using our website and services.';
    }
  } catch (error) {
    console.error('Failed to fetch policy data for metadata:', error);
    // Fallback descriptions if API call fails
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
