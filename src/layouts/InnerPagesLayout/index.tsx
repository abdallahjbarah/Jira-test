import React from 'react';
import Footer from '@/components/layout/Footer';
import InnerHeader from '@/components/layout/InnerHeader';

function InnerPagesLayout({
  children,
  headerProps,
}: {
  children: React.ReactNode;
  headerProps?: {
    withNavItems?: boolean;
  };
}): React.ReactElement {
  return (
    <div>
      <InnerHeader {...headerProps} />
      {children}
      <Footer />
    </div>
  );
}

export default InnerPagesLayout;
