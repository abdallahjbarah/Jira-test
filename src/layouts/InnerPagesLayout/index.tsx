import React, { memo } from 'react';
import Footer from '@/components/layout/Footer';
import InnerHeader from '@/components/layout/InnerHeader';

function InnerPagesLayout({
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

export default InnerPagesLayout;
