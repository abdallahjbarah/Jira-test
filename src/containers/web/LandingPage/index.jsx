import About from '@components/web/landing-page/About';
import Contact from '@components/web/landing-page/Contact';
import Hero from '@components/web/landing-page/Hero';
import Statistics from '@components/web/landing-page/Statistics';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Statistics />
      <About />
      <Contact />
    </>
  );
}
