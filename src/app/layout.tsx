import '@styles/globals.scss';
import { Locale } from '@utils/constants';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return <>{children}</>;
}
