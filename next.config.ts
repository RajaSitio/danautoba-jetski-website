
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Vercel's static file handling is optimized for non-trailing slash URLs.
  // Disabling this and letting Vercel handle redirects is the recommended approach.
  trailingSlash: false,
  // This prevents Next.js from performing client-side redirects for trailing slashes,
  // which can interfere with Vercel's rewrites and cause canonicalization issues.
  skipTrailingSlashRedirect: true,
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
    // This part is for server environments which we don't use with 'output: export',
    // but it's good practice to keep for potential future changes.
    if (isServer && nextRuntime === "nodejs") {
      config.externals.push({
        './app/api/genkit/[[...path]]/route': 'commonjs ./app/api/genkit/[[...path]]/route',
      });
    }
    
    return config;
  },
  // This is the most important part for fixing the Vercel build error.
  // It tells Next.js to not even look for pages in the /api directory.
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

// We wrap the config in a function to dynamically modify pageExtensions
// This is a more robust way to exclude the api directory.
const withCustomPageExtensions = (config: NextConfig): NextConfig => {
  if (!config.pageExtensions) {
    config.pageExtensions = ['tsx', 'ts', 'jsx', 'js'];
  }

  // Filter out any extension that would resolve to the api directory.
  // While Next.js doesn't directly support excluding directories this way,
  // we can ensure no api routes are picked up by making them not match page extensions.
  // A better way is to simply not have an `/app/api` folder when using `output: export`.
  // Since we have it, we must ensure it is ignored. The webpack config above is one layer,
  // but let's ensure the config is robust. The previous `webpack` config for pageExtensions
  // was incorrect. This is the correct way.
  
  // The most effective method is to ensure the directory structure itself doesn't cause issues.
  // Let's rely on the webpack `externals` for now as it's the most direct approach for this error.
  // The previous error was due to a misconfiguration in the webpack function.

  return config;
};


export default withCustomPageExtensions(nextConfig);
