
import type { TranslationKey } from '@/lib/locales';

export interface Testimonial {
  id: string;
  name: string;
  roleKey: string;
  quoteKey: string;
  rating: number;
  avatarSrc: string;
  dataAiHint: string;
}

export const testimonialData: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Andi & Sarah',
    roleKey: 'testimonial_1_role',
    quoteKey: 'testimonial_1_quote',
    rating: 5,
    avatarSrc: 'https://archive.org/download/testiandisarah/testiandisarah.jpg',
    dataAiHint: 'happy couple',
  },
  {
    id: 'testimonial-2',
    name: 'Budi Hartono',
    roleKey: 'testimonial_2_role',
    quoteKey: 'testimonial_2_quote',
    rating: 5,
    avatarSrc: 'https://archive.org/download/testiandisarah/testibudi.jpg',
    dataAiHint: 'male adventurer',
  },
  {
    id: 'testimonial-3',
    name: 'Keluarga Wijaya',
    roleKey: 'testimonial_3_role',
    quoteKey: 'testimonial_3_quote',
    rating: 5,
    avatarSrc: 'https://archive.org/download/testiandisarah/testiwijaya.jpg',
    dataAiHint: 'happy family',
  },
  {
    id: 'testimonial-4',
    name: 'Rina & Geng',
    roleKey: 'testimonial_4_role',
    quoteKey: 'testimonial_4_quote',
    rating: 5,
    avatarSrc: 'https://archive.org/download/testiandisarah/testimedan.jpg',
    dataAiHint: 'group friends',
  },
];

    