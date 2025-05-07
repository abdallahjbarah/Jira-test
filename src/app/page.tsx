import { Metadata } from 'next';
import { SEO_KEYWORDS } from '@utils/constants';

export const metadata: Metadata = {
  title: 'Bookagri - Authentic Agritourism in Jordan',
  description:
    'Experience authentic agritourism in Jordan with Bookagri. Connect with local farmers, participate in hands-on activities, and enjoy rural stays. Book your agricultural adventure today!',
  keywords: SEO_KEYWORDS,
};

// This is a fallback page that should never be shown
// The middleware should redirect before this is rendered
export default function RootPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <p>Redirecting to localized page...</p>
    </div>
  );
}
