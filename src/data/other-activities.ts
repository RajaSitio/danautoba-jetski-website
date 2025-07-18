
import type { TranslationKey } from '@/lib/locales';

export interface OtherActivityInfo {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  priceKey: TranslationKey;
  durationKey: TranslationKey;
  priceInfoKey: TranslationKey;
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
    priceInfoKey: 'activity_price_info_tio_beach_scooter',
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
    priceInfoKey: 'activity_price_info_tio_beach_banana',
    imageSrc: 'https://archive.org/download/tur-batu-gantung/banana-boat.jpg',
    imageAltKey: 'alt_activity_banana_boat',
    dataAiHint: 'banana boat fun',
  },
  {
    id: 'speedboat-rental',
    titleKey: 'activity_speedboat_rental_title',
    descriptionKey: 'activity_speedboat_rental_desc_updated',
    priceKey: 'activity_speedboat_rental_price_updated',
    durationKey: 'activity_speedboat_rental_duration_updated',
    priceInfoKey: 'activity_price_info_tio_beach_speedboat',
    imageSrc: 'https://archive.org/download/tur-batu-gantung/sewa-speedboat.jpg',
    imageAltKey: 'alt_activity_speedboat_rental',
    dataAiHint: 'speedboat lake',
  },
  {
    id: 'speedboat-tour-batu-gantung',
    titleKey: 'activity_speedboat_tour_batu_gantung_title',
    descriptionKey: 'activity_speedboat_tour_batu_gantung_desc',
    priceKey: 'activity_speedboat_tour_batu_gantung_price',
    durationKey: 'activity_speedboat_tour_batu_gantung_duration',
    priceInfoKey: 'activity_price_info_tio_beach_tour',
    imageSrc: 'https://archive.org/download/tur-batu-gantung/tur-batu-gantung.jpg',
    imageAltKey: 'alt_activity_speedboat_tour_batu_gantung',
    dataAiHint: 'speedboat lake tour',
  },
];
