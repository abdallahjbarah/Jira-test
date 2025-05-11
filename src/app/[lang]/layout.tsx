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

export const metadata = {
  title: 'Bookagri - Authentic Agritourism in Jordan',
  description:
    'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
  keywords: SEO_KEYWORDS,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bookagri.com/',
    site_name: 'Bookagri',
    title: 'Bookagri - Authentic Agritourism in Jordan',
    description:
      'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
    images: [
      {
        url: 'https://www.bookagri.com/images/shared/BookagriLogo.png',
        width: 300,
        height: 150,
        alt: 'Bookagri Logo',
      },
    ],
  },
  twitter: {
    handle: '@bookagri',
    site: '@bookagri',
    cardType: 'summary_large_image',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
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
