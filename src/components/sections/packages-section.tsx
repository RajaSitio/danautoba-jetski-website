
"use client";

import { useTranslation } from '@/hooks/use-language';
import type { PackageInfo } from '@/data/packages';
import { PackageCard } from '@/components/common/package-card';

// The prop type expects the original PackageInfo structure,
// as aiGeneratedImageSrc is no longer populated by the Home page server component.
interface PackagesSectionProps {
  packageDataWithAiImages: PackageInfo[]; // Changed back to PackageInfo
}

export function PackagesSection({ packageDataWithAiImages }: PackagesSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="packages" className="pt-8 pb-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            {t('packagesSectionTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('packagesSectionSubtitle')}
          </p>
        </div>
        
        {packageDataWithAiImages && packageDataWithAiImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {packageDataWithAiImages.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                packageInfo={pkg} 
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">{t('packages_no_items')}</p>
        )}
      </div>
    </section>
  );
}
