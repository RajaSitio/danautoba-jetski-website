
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { articleData } from '@/data/articles';
import { getTranslation } from '@/lib/locales';
import { ArticleClientContent } from '@/components/sections/article-client-content';

// Generate static pages for each article
export async function generateStaticParams() {
  return articleData.map((article) => ({
    slug: article.id,
  }));
}

// Generate metadata for each article page
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const article = articleData.find((a) => a.id === slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const title = getTranslation('id', article.titleKey);
  const description = getTranslation('id', article.summaryKey);
  const siteUrl = 'https://danautobajetski.com';

  return {
    title: `${title} | Danau Toba Jetski Blog`,
    description: description,
    alternates: {
      canonical: `${siteUrl}/blog/${article.id}`,
    },
    openGraph: {
      title: `${title} | Danau Toba Jetski Blog`,
      description: description,
      url: `${siteUrl}/blog/${article.id}`,
      type: 'article',
      publishedTime: new Date(article.publishedOn).toISOString(),
      images: [
        {
          url: article.imageSrc,
          width: 1200,
          height: 630,
          alt: getTranslation('id', article.imageAltKey),
        },
      ],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [article.imageSrc],
    },
  };
}

// The page component itself
export default async function ArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const article = articleData.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }
  
  return <ArticleClientContent article={article} />;
}
