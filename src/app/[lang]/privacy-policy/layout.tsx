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

  let policyDescription = '';
  try {
    const policiesData = await fetchPolicies();

    if (lang === 'ar' && policiesData.privacyPolicyAr) {
      policyDescription = policiesData.privacyPolicyAr.substring(0, 200);

      if (policiesData.privacyPolicyAr.length > 200) {
        policyDescription += '...';
      }
    } else if (policiesData.privacyPolicyEn) {
      policyDescription = policiesData.privacyPolicyEn.substring(0, 200);

      if (policiesData.privacyPolicyEn.length > 200) {
        policyDescription += '...';
      }
    } else {
      policyDescription =
        lang === 'ar'
          ? 'تعرف على كيفية جمع بوكاجري واستخدام وحماية معلوماتك الشخصية. توضح سياسة الخصوصية الخاصة بنا التزامنا بخصوصية البيانات وأمانها.'
          : 'Learn about how Bookagri collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data privacy and security.';
    }
  } catch (error) {
    policyDescription =
      lang === 'ar'
        ? 'تعرف على كيفية جمع بوكاجري واستخدام وحماية معلوماتك الشخصية. توضح سياسة الخصوصية الخاصة بنا التزامنا بخصوصية البيانات وأمانها.'
        : 'Learn about how Bookagri collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data privacy and security.';
  }

  return {
    title:
      lang === 'ar' ? 'بوكاجري - سياسة الخصوصية' : 'Bookagri - Privacy Policy',
    description: policyDescription,
    keywords: SEO_KEYWORDS,
    openGraph: {
      url: 'https://www.bookagri.com/privacy-policy',
      title:
        lang === 'ar'
          ? 'بوكاجري - سياسة الخصوصية'
          : 'Bookagri - Privacy Policy',
      description: policyDescription,
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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
