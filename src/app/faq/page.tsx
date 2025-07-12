
import type { Metadata } from 'next';
import { FaqClientContent } from '@/components/sections/faq-client-content';
import { faqItems } from '@/data/faqs';
import { getTranslation } from '@/lib/locales'; // For metadata

export async function generateMetadata(): Promise<Metadata> {
  const title = getTranslation('id', 'faq_meta_title');
  const description = getTranslation('id', 'faq_meta_description');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

  return {
    title: title,
    description: description,
    keywords: [
        "faq danau toba jetski", 
        "pertanyaan umum jetski danau toba", 
        "info sewa jetski danau toba",
        "kebijakan jetski danau toba",
        "tips jetski danau toba",
        "tips aman naik jetski di danau toba"
    ],
    alternates: {
      canonical: `${siteUrl}/faq`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/faq`,
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`, 
          width: 1200,
          height: 630,
          alt: 'FAQ Danau Toba Jetski',
        },
      ],
    },
    twitter: {
      title: title,
      description: description,
      images: [`${siteUrl}/images/twitter-image.jpg`], 
    },
  };
}

export default function FAQPage() {
  return <FaqClientContent faqItems={faqItems} />;
}
