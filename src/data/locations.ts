import type { TranslationKey } from '@/lib/locales';

export type LocationDetail = {
  id: string;
  nameKey: string;
  addressKey: string;
  phoneKey: string; // Added phoneKey
  coordinates: {
    lat: number;
    lng: number;
  };
  // Add other properties like mapLink or operatingHoursKey if needed
};

export const locationDetails: LocationDetail[] = [
  {
    id: 'tio-beach',
    nameKey: 'location_tio_beach_name',
    addressKey: 'location_tio_beach_address',
    phoneKey: 'location_tio_beach_phone', // Added phoneKey for Tio Beach
    coordinates: { lat: 2.6600891097392085, lng: 98.85417671101375 },
  },
  {
    id: 'juma-cottage',
    nameKey: 'location_juma_cottage_name',
    addressKey: 'location_juma_cottage_address',
    phoneKey: 'location_juma_cottage_phone', // Added phoneKey for Juma Cottage
    coordinates: { lat: 2.671542, lng: 98.865743 },
  },
  {
    id: 'batu-gantung',
    nameKey: 'location_batu_gantung_name',
    addressKey: 'location_batu_gantung_address',
    phoneKey: 'location_batu_gantung_phone', // Main contact
    coordinates: { lat: 2.6486, lng: 98.8183 },
  },
  {
    id: 'situmurun-waterfall',
    nameKey: 'location_situmurun_waterfall_name',
    addressKey: 'location_situmurun_waterfall_address',
    phoneKey: 'location_situmurun_waterfall_phone', // Main contact
    coordinates: { lat: 2.4568, lng: 98.9242 },
  },
];
