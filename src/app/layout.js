import "@styles/globals.scss";

import CustomAuthProvider from '@providers/CustomAuthProvider';
import ErrorBoundaryProvider from '@providers/ErrorBoundaryProvider';
import ReactQueryProvider from '@providers/ReactQueryProvider';
import ReactToastifyProvider from '@providers/ReactToastifyProvider';
import ReactPublicContextProvider from '@providers/ReactPublicContextProvider';
import ReactLoadingProvider from '@providers/ReactLoadingProvider';
import { SEO_KEYWORDS } from "@utils/constants";

export const metadata = {
  title: 'Bookagri - Authentic Agritourism in Jordan',
  description: 'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
  keywords: SEO_KEYWORDS,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bookagri.com/',
    site_name: 'Bookagri',
    title: 'Bookagri - Authentic Agritourism in Jordan',
    description: 'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        <CustomAuthProvider>
          <ErrorBoundaryProvider>
            <ReactQueryProvider>
              <ReactToastifyProvider>
                <ReactPublicContextProvider>
                  <ReactLoadingProvider>
                    {children}
                  </ReactLoadingProvider>
                </ReactPublicContextProvider>
              </ReactToastifyProvider>
            </ReactQueryProvider>
          </ErrorBoundaryProvider>
        </CustomAuthProvider>
      </body>
    </html>
  );
}
