
import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // disallow: ['/private/', '/admin/'], // Contoh jika ada halaman privat
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
