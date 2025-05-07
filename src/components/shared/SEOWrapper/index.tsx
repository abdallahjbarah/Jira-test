import { SEO } from '@utils/constants';
import Head from 'next/head';
import React from 'react';

interface SEOWrapperProps {
  title: string;
  image: string;
  description: string;
  keywords?: string[];
}

const SEOWrapper = ({
  title,
  image,
  description,
  keywords = [],
}: SEOWrapperProps): React.ReactElement => {
  return (
    <Head>
      <title>{`Bookagri | ${title}`}</title>
      <meta name='title' content={`Bookagri | ${title || ''}`} />
      <meta name='keywords' content={keywords.join(', ')} />
      <meta name='description' content={description} />
      <meta property='og:image' content={image} />
      <meta name='robots' content={SEO.CONTENT} />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <meta
        name='google-site-verification'
        content='FMv1VEtb3QMU_-SmMIPkq6PB6L5QJ1RfuTjWR3Rv82o'
      />
      <meta name='theme-color' content='#000000' />
      {/* <meta
          name="facebook-domain-verification"
          content=""
        /> */}
      <link rel='apple-touch-icon' href='/favicon.svg' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='icon' href='/favicon.svg' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta property='og:site_name' content='Bookagri' />
    </Head>
  );
};

export default SEOWrapper;
