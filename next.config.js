const path = require('path');

module.exports = {
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'agribooking.s3.me-south-1.amazonaws.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
};
