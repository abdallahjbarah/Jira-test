import React from 'react';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

interface PrivateLayoutProps {
  children: React.ReactNode;
  isFooter?: boolean;
  isHeader?: boolean;
}

export default function PrivateLayout({
  children,
  isFooter = true,
  isHeader = true,
}: PrivateLayoutProps): React.ReactElement {
  return (
    <div>
      {isHeader && <Header />}
      {children}
      {isFooter && <Footer />}
    </div>
  );
}
