
import type { MetadataRoute } from 'next';

// This file is now configured for static export.
// It no longer needs to be a dynamic route handler.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
