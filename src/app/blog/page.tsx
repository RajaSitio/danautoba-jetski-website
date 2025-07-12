import type { Metadata } from 'next';
import { getTranslation } from '@/lib/locales';
import { articleData } from '@/data/articles';
import { BlogClientContent } from '@/components/sections/blog-client-content';

export async function generateMetadata(): Promise<Metadata> {
  const title = getTranslation('id', 'blog_meta_title');
  const description = getTranslation('id', 'blog_meta_description');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/blog`,
      type: 'website',
    },
  };
}

export default function BlogPage() {
  // Sort articles by date, newest first
  const sortedArticles = [...articleData].sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime());

  // Pass the data to the client component for rendering.
  return <BlogClientContent articles={sortedArticles} />;
}
