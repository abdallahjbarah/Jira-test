const path = require('path');

module.exports = {
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
};
