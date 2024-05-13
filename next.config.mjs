import { fileURLToPath } from 'url';
import path from 'path';

// Calculate __dirname based on import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "via.placeholder.com",
      ],
    },
    sassOptions: {
      enabled: true,
      extensions: [".scss", ".sass"],
      includePaths: [path.join(__dirname, "styles")],
    },
};

export default nextConfig;
