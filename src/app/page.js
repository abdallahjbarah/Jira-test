import LandingPage from "@containers/web/LandingPage";
import PublicLayout from "@layouts/PublicLayout";
import { SEO_KEYWORDS } from "@utils/constants";
import Head from 'next/head';

export const metadata = {
  title: 'Bookagri - Authentic Agritourism in Jordan',
  description: 'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
  keywords: SEO_KEYWORDS,
  openGraph: {
    url: 'https://www.bookagri.com/',
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
    site_name: 'Bookagri',
  },
  twitter: {
    handle: '@bookagri',
    site: '@bookagri',
    cardType: 'summary_large_image',
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bookagri",
              url: "https://www.bookagri.com",
              logo: "https://www.bookagri.com/images/shared/BookagriLogo.png",
              sameAs: [
                "https://www.facebook.com/bookagrijo/",
                "https://www.instagram.com/bookagri",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+962-77-2236393",
                contactType: "Customer Service",
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
