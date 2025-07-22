
import { MetadataRoute } from 'next';
import { packageData } from '@/data/packages';
import { articleData } from '@/data/articles';

const siteUrl = 'https://danautobajetski.com';

export default function sitemap(): MetadataRoute.Sitemap {
  
  // Static routes
  const staticRoutes = [
    '/',
    '/aktivitas-lain',
    '/faq',
    '/blog',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Dynamic routes for packages
  const packageRoutes = packageData.map((pkg) => ({
    url: `${siteUrl}/paket/${pkg.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic routes for articles
  const articleRoutes = articleData.map((article) => ({
    url: `${siteUrl}/blog/${article.id}`,
    lastModified: new Date(article.publishedOn).toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...packageRoutes,
    ...articleRoutes,
  ];
}
