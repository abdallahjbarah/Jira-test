import React from 'react';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  isFooter?: boolean;
  isHeader?: boolean;
}

export default function PublicLayout({
  children,
  isFooter = true,
  isHeader = true,
}: PublicLayoutProps): React.ReactElement {
  return (
    <div>
      {isHeader && <Header />}
      {children}
      {isFooter && <Footer />}
    </div>
  );
}
