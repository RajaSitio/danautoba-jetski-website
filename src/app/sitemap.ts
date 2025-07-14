
import type { MetadataRoute } from 'next';
import { packageData } from '@/data/packages';
import { articleData } from '@/data/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

const sitemapEntries: MetadataRoute.Sitemap = [
  // Static Pages
  {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${siteUrl}/aktivitas-lain`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${siteUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  // Dynamic Package Pages
  ...packageData.map((pkg) => ({
    url: `${siteUrl}/paket/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  })),
  // Dynamic Article Pages
  ...articleData.map((article) => ({
    url: `${siteUrl}/blog/${article.id}`,
    lastModified: new Date(article.publishedOn),
    changeFrequency: 'yearly',
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
    return sitemapEntries;
}
