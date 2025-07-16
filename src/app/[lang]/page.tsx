'use client';

import React from 'react';
import LandingPage from '@/containers/web/LandingPage';
import { Locale } from '@utils/constants';

interface HomePageProps {
  params: {
    lang: Locale;
  };
}

const HomePage: React.FC<HomePageProps> = ({ params }) => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default HomePage;
