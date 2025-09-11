import { getDictionary } from '@/utils/dictionaries';
import { Locale } from '@utils/constants';
import { Metadata } from 'next';

interface PaymentLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({
  params,
}: Omit<PaymentLayoutProps, 'children'>): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: 'Payment Status - Bookagri',
    description: 'Payment status page for your booking',
  };
}

export default function PaymentLayout({ children }: PaymentLayoutProps) {
  return <>{children}</>;
}
