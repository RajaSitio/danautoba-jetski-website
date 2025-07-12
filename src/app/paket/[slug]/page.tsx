
import { notFound } from 'next/navigation';
import { packageData } from '@/data/packages';
import type { Metadata } from 'next';
import { getTranslation } from '@/lib/locales';
import { PackageDetailClientContent } from '@/components/sections/package-detail-client-content';

// Generate static pages for each package
export async function generateStaticParams() {
  return packageData.map((pkg) => ({
    slug: pkg.id,
  }));
}

// Generates metadata for the page based on the slug.
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const pkg = packageData.find((p) => p.id === slug);

  if (!pkg) {
    return {
      title: getTranslation('id', 'package_not_found_title'),
      description: getTranslation('id', 'package_not_found_message'),
    };
  }

  const title = getTranslation('id', pkg.titleKey);
  const description = getTranslation('id', pkg.descriptionKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://danautobajetski.com';

  return {
    title: `${title} | ${getTranslation('id', 'appName')}`,
    description: description,
    alternates: {
      canonical: `${siteUrl}/paket/${pkg.id}`,
    },
    openGraph: {
      title: `${title} | Danau Toba Jetski`,
      description: description,
      url: `${siteUrl}/paket/${pkg.id}`,
      images: [
        {
          url: pkg.imageSrc,
          width: 1200,
          height: 630,
          alt: `Danau Toba Jetski - ${title}`,
        },
      ],
    },
  };
}

// Renders the package detail page.
export default async function PackagePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const pkg = packageData.find((p) => p.id === slug);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailClientContent packageInfo={pkg} />;
}
