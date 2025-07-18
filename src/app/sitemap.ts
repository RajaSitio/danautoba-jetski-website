
import type { MetadataRoute } from 'next'
import { packageData } from '@/data/packages'
import { articleData } from '@/data/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://danautobajetski.com';

  // Static pages
  const staticRoutes = [
    '/',
    '/blog',
    '/faq',
    '/aktivitas-lain',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  // Dynamic Package Pages
  const packageRoutes = packageData.map((pkg) => ({
    url: `${siteUrl}/paket/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }));

  // Dynamic Article Pages
  const articleRoutes = articleData.map((article) => ({
    url: `${siteUrl}/blog/${article.id}`,
    lastModified: new Date(article.publishedOn),
    changeFrequency: 'yearly' as 'yearly',
    priority: 0.6,
  }));

  return [
      ...staticRoutes, 
      ...packageRoutes, 
      ...articleRoutes
    ];
}
