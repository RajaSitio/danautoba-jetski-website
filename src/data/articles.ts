
import type { TranslationKey } from '@/lib/locales';

export interface Article {
  id: string; // This will be the slug
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  contentKey: TranslationKey;
  publishedOn: string; // YYYY-MM-DD format
  imageSrc: string;
  imageAltKey: TranslationKey;
  dataAiHint: string;
}

// New, holistic article structure based on user feedback (SEO, Culture, Cuisine)
export const articleData: Article[] = [
  {
    id: 'filosofi-dalihan-natolu-dan-tarian-tortor',
    titleKey: 'blog_article_7_title',
    summaryKey: 'blog_article_7_summary',
    contentKey: 'blog_article_7_content',
    publishedOn: '2024-08-05',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_7_alt',
    dataAiHint: 'batak culture dance',
  },
  {
    id: 'tips-aman-bermain-jetski-di-danau-toba',
    titleKey: 'blog_article_1_title',
    summaryKey: 'blog_article_1_summary',
    contentKey: 'blog_article_1_content',
    publishedOn: '2024-08-01',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_1_alt',
    dataAiHint: 'jetski safety instructions',
  },
  {
    id: 'panduan-wisata-kuliner-dan-budaya-samosir',
    titleKey: 'blog_article_2_title',
    summaryKey: 'blog_article_2_summary',
    contentKey: 'blog_article_2_content',
    publishedOn: '2024-07-28',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_2_alt',
    dataAiHint: 'batak culture food',
  },
  {
    id: 'memilih-tur-jetski-batu-gantung-vs-situmurun',
    titleKey: 'blog_article_3_title',
    summaryKey: 'blog_article_3_summary',
    contentKey: 'blog_article_3_content',
    publishedOn: '2024-07-25',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_3_alt',
    dataAiHint: 'lake waterfall cliff',
  },
  {
    id: 'spot-foto-instagramable-di-danau-toba-dengan-jetski',
    titleKey: 'blog_article_4_title',
    summaryKey: 'blog_article_4_summary',
    contentKey: 'blog_article_4_content',
    publishedOn: '2024-07-22',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_4_alt',
    dataAiHint: 'jetski sunset lake',
  },
    {
    id: 'lebih-dari-sewa-pengalaman-premium-danau-toba-jetski',
    titleKey: 'blog_article_5_title',
    summaryKey: 'blog_article_5_summary',
    contentKey: 'blog_article_5_content',
    publishedOn: '2024-07-18',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_5_alt',
    dataAiHint: 'premium jetski service',
  },
  {
    id: 'liburan-keluarga-di-samosir-ide-aktivitas-jetski-yang-seru',
    titleKey: 'blog_article_6_title',
    summaryKey: 'blog_article_6_summary',
    contentKey: 'blog_article_6_content',
    publishedOn: '2024-07-15',
    imageSrc: 'https://placehold.co/1200x630.png',
    imageAltKey: 'blog_article_6_alt',
    dataAiHint: 'family jetski fun',
  },
];
