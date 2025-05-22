import CustomAuthProvider from '@providers/CustomAuthProvider';
import ErrorBoundaryProvider from '@providers/ErrorBoundaryProvider';
import ReactQueryProvider from '@providers/ReactQueryProvider';
import ReactToastifyProvider from '@providers/ReactToastifyProvider';
import ReactPublicContextProvider from '@providers/ReactPublicContextProvider';
import ReactLoadingProvider from '@providers/ReactLoadingProvider';
import { SEO_KEYWORDS } from '@utils/constants';
import { Locale } from '@utils/constants';
import { TranslationProvider } from '@/contexts/TranslationContext';
import StyledComponentsRegistry from '@/lib/registry';
import '@styles/globals.scss';
import { getDictionary } from '@/utils/dictionaries';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, 'children'>): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: SEO_KEYWORDS,
    openGraph: {
      type: 'website',
      locale: params.lang === 'ar' ? 'ar_JO' : 'en_US',
      url: 'https://www.bookagri.com/',
      siteName: dictionary.metadata.siteName,
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
    },
    twitter: {
      creator: '@bookagri',
      site: '@bookagri',
      card: 'summary_large_image',
    },
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <TranslationProvider>
          <CustomAuthProvider>
            <ErrorBoundaryProvider>
              <ReactQueryProvider>
                <ReactToastifyProvider>
                  <ReactPublicContextProvider>
                    <ReactLoadingProvider>
                      <StyledComponentsRegistry>
                        {children}
                      </StyledComponentsRegistry>
                    </ReactLoadingProvider>
                  </ReactPublicContextProvider>
                </ReactToastifyProvider>
              </ReactQueryProvider>
            </ErrorBoundaryProvider>
          </CustomAuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
