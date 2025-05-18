import React from 'react';
import AboutUs from '@components/web/landing-page/AboutUs';
import ContactUs from '@components/web/landing-page/ContactUs';
import ContactUsForm from '@components/web/landing-page/ContactUsForm';
import DiscoverBookagri from '@components/web/landing-page/DiscoverBookagri';
import DownloadApp from '@components/web/landing-page/DownloadApp';
import Hero from '@components/web/landing-page/Hero';
import Statistics from '@components/web/landing-page/Statistics';

export default function LandingPage(): React.ReactElement {
  return (
    <main>
      <Hero className='!pb-[400px] laptopS:!pb-[calc(25% - 100vh)]' />
      <Statistics />
      <AboutUs />
      <DiscoverBookagri />
      <DownloadApp />
      <ContactUs />
      <ContactUsForm />
    </main>
  );
}
