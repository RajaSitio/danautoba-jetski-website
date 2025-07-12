
import type { TranslationKey } from '@/lib/locales';

export interface OtherActivityInfo {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  priceKey: TranslationKey;
  durationKey: TranslationKey;
  imageSrc: string;
  imageAltKey: TranslationKey;
  dataAiHint: string;
}

export const otherActivityData: OtherActivityInfo[] = [
  {
    id: 'water-scooter',
    titleKey: 'activity_water_scooter_title',
    descriptionKey: 'activity_water_scooter_desc',
    priceKey: 'activity_water_scooter_price',
    durationKey: 'activity_water_scooter_duration',
    imageSrc: 'https://archive.org/download/header_20250629/water-scooter.jpg',
    imageAltKey: 'alt_activity_water_scooter',
    dataAiHint: 'water scooter lake',
  },
  {
    id: 'banana-boat',
    titleKey: 'activity_banana_boat_title',
    descriptionKey: 'activity_banana_boat_desc',
    priceKey: 'activity_banana_boat_price',
    durationKey: 'activity_banana_boat_duration',
    imageSrc: 'https://archive.org/download/header_20250629/banana-boat.jpg',
    imageAltKey: 'alt_activity_banana_boat',
    dataAiHint: 'banana boat fun',
  },
  {
    id: 'speedboat-rental',
    titleKey: 'activity_speedboat_rental_title',
    descriptionKey: 'activity_speedboat_rental_desc',
    priceKey: 'activity_speedboat_rental_price',
    durationKey: 'activity_speedboat_rental_duration',
    imageSrc: 'https://archive.org/download/header_20250629/Speedboat.jpg',
    imageAltKey: 'alt_activity_speedboat_rental',
    dataAiHint: 'speedboat lake',
  },
];
