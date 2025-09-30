import Footer from '@/components/layout/Footer';
import InnerHeader from '@/components/layout/InnerHeader';
import React from 'react';

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
