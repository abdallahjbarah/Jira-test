import React from 'react';
import Footer from '@/components/layout/Footer';
import InnerHeader from '@/components/layout/InnerHeader';

export default function InnerPagesLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div>
      <InnerHeader />
      {children}
      <Footer />
    </div>
  );
}
