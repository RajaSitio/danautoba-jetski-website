export interface Country {
  name: string;
  code: string; // e.g., 'ID'
  phoneCode: string; // e.g., '62'
  flag: string; // emoji
}

export const countries: Country[] = [
  { name: 'Indonesia', code: 'ID', phoneCode: '62', flag: '🇮🇩' },
  { name: 'Malaysia', code: 'MY', phoneCode: '60', flag: '🇲🇾' },
  { name: 'Singapore', code: 'SG', phoneCode: '65', flag: '🇸🇬' },
  { name: 'Australia', code: 'AU', phoneCode: '61', flag: '🇦🇺' },
  { name: 'United States', code: 'US', phoneCode: '1', flag: '🇺🇸' },
  { name: 'Netherlands', code: 'NL', phoneCode: '31', flag: '🇳🇱' },
  { name: 'Germany', code: 'DE', phoneCode: '49', flag: '🇩🇪' },
  { name: 'United Kingdom', code: 'GB', phoneCode: '44', flag: '🇬🇧' },
  { name: 'China', code: 'CN', phoneCode: '86', flag: '🇨🇳' },
  { name: 'India', code: 'IN', phoneCode: '91', flag: '🇮🇳' },
];
