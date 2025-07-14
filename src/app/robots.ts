
import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

const robotsConfig: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${siteUrl}/sitemap.xml`,
};

export default robotsConfig;
