import React from 'react';
import LandingPage from '@containers/web/LandingPage';
import PublicLayout from '@layouts/PublicLayout';

export default function Home(): React.ReactElement {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  );
}
