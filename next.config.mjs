import { fileURLToPath } from 'url';
import path from 'path';

// Calculate __dirname based on import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  typescript: {
    // Don't run TypeScript during production builds - should be done in CI
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
