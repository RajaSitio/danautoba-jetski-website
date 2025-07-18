
import type { Metadata } from 'next';
import { getTranslation } from '@/lib/locales';
import { otherActivityData } from '@/data/other-activities';
import { OtherActivitiesClientContent } from '@/components/sections/other-activities-client-content';

export async function generateMetadata(): Promise<Metadata> {
  const title = getTranslation('id', 'other_activities_meta_title');
  const description = getTranslation('id', 'other_activities_meta_description');
  const siteUrl = 'https://danautobajetski.com';

  return {
    title: title,
    description: description,
    keywords: [
        "sewa banana boat danau toba",
        "sewa skuter air danau toba",
        "sewa speedboat danau toba",
        "watersport danau toba",
        "aktivitas air samosir",
        "harga banana boat danau toba"
    ],
    alternates: {
      canonical: `${siteUrl}/aktivitas-lain`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/aktivitas-lain`,
      type: 'website',
    },
  };
}

export default function OtherActivitiesPage() {
  return <OtherActivitiesClientContent activities={otherActivityData} />;
}
