const path = require('path');

module.exports = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'agribooking.s3.me-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
