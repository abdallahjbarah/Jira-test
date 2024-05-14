import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
export default function PublicLayout({
  children,
  isFooter = true,
  isHeader = true,
}) {
  return (
    <div>
      {isHeader && <Header />}
      {children}
      {isFooter && <Footer />}
    </div>
  );
}
