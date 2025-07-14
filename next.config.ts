
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'archive.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.icon-icons.com',
      },
    ],
  },
  // The genkit API route is not supported in 'output: export' mode.
  // We exclude it from the page build process to prevent errors.
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "nodejs") {
      config.externals.push({
        './app/api/genkit/[[...path]]/route': 'commonjs ./app/api/genkit/[[...path]]/route',
      });
    }
    return config;
  },
};

export default nextConfig;
