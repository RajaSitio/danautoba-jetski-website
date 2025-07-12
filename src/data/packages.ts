
import type { TranslationKey } from '@/lib/locales';

export interface PackageInfo {
  id: string;
  titleKey: string;
  shortTitleKey?: string; // Added for shorter menu titles
  summaryKey: TranslationKey; // New key for plain text summary
  descriptionKey: string;
  priceKey: string;
  durationKey: string;
  imageSrc: string; // This will be the initial placeholder
  imageAltKey: string;
  dataAiHint: string; // Keywords for AI image generation prompt
  includedItemsKeys: string[];
  additionalNotesKeys?: string[];
}

export const packageData: PackageInfo[] = [
  {
    id: 'seadoo-30-min',
    titleKey: 'package_seadoo_30_min_title',
    summaryKey: 'package_seadoo_30_min_summary',
    descriptionKey: 'package_seadoo_30_min_desc',
    priceKey: 'package_seadoo_30_min_price',
    durationKey: 'duration_30_min',
    imageSrc: 'https://archive.org/download/paket-situmurun_202506/Paket-30-Menit.jpg',
    imageAltKey: 'alt_package_thumbnail_default',
    dataAiHint: 'thrilling jetski short ride action Lake Toba', // Adjusted for better image prompt
    includedItemsKeys: [
      'include_pro_documentation_1_session_iphone16',
      'include_1_driver_tandem_max',
      'include_driver_training',
      'include_life_vest',
      'include_safety_briefing',
      'include_hotel_beach_pickup',
    ],
    additionalNotesKeys: ['note_drone_documentation_fee'],
  },
  {
    id: 'seadoo-1-hr',
    titleKey: 'package_seadoo_1_hr_title',
    summaryKey: 'package_seadoo_1_hr_summary',
    descriptionKey: 'package_seadoo_1_hr_desc',
    priceKey: 'package_seadoo_1_hr_price',
    durationKey: 'duration_1_hr',
    imageSrc: 'https://archive.org/download/paket-situmurun_202506/paket-1-jam.jpg',
    imageAltKey: 'alt_package_thumbnail_default',
    dataAiHint: 'jetski lake exploration adventure Lake Toba', // Adjusted
    includedItemsKeys: [
      'include_pro_documentation_2_sessions_iphone16',
      'include_2_driver_swaps_tandem',
      'include_driver_training',
      'include_life_vest',
      'include_safety_briefing',
      'include_hotel_beach_pickup',
    ],
    additionalNotesKeys: ['note_drone_documentation_fee'],
  },
  {
    id: 'seadoo-1-hr-batu-gantung',
    titleKey: 'package_seadoo_1_hr_batu_gantung_title',
    shortTitleKey: 'package_batu_gantung_short_title',
    summaryKey: 'package_seadoo_1_hr_batu_gantung_summary',
    descriptionKey: 'package_seadoo_1_hr_batu_gantung_desc',
    priceKey: 'package_seadoo_1_hr_batu_gantung_price',
    durationKey: 'duration_1_hr',
    imageSrc: 'https://archive.org/download/paket-situmurun_202506/paket-4.jpg',
    imageAltKey: 'alt_package_thumbnail_default',
    dataAiHint: 'jetski iconic Batu Gantung rock formation Lake Toba', // Adjusted
    includedItemsKeys: [
      'include_pro_documentation_iphone16',
      'include_driver_training',
      'include_escort_fleet_documentation',
      'include_life_vest',
      'include_safety_briefing',
      'include_hotel_beach_pickup',
    ],
    additionalNotesKeys: ['note_drone_documentation_fee_premium'],
  },
  {
    id: 'seadoo-2-hr-15-min-situmurun',
    titleKey: 'package_seadoo_2_hr_15_min_situmurun_title',
    shortTitleKey: 'package_situmurun_short_title',
    summaryKey: 'package_seadoo_2_hr_15_min_situmurun_summary',
    descriptionKey: 'package_seadoo_2_hr_15_min_situmurun_desc',
    priceKey: 'package_seadoo_2_hr_15_min_situmurun_price',
    durationKey: 'duration_2_hr_15_min',
    imageSrc: 'https://archive.org/download/paket-situmurun_202506/Paket-situmurun.jpg',
    imageAltKey: 'alt_package_thumbnail_default',
    dataAiHint: 'jetski Situmurun waterfall tour scenic Lake Toba', // Adjusted
    includedItemsKeys: [
      'include_pro_documentation_iphone16',
      'include_driver_training',
      'include_escort_fleet_documentation',
      'include_life_vest',
      'include_safety_briefing',
      'include_hotel_beach_pickup',
    ],
    additionalNotesKeys: ['note_drone_documentation_fee_premium'],
  },
];
