"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-language';
import { Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OtherActivitiesSection() {
  const { t } = useTranslation();

  return (
    <section id="other-activities" className="pt-8 pb-8 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            <Waves className="inline-block h-7 w-7 md:h-8 md:w-8 mr-2 mb-1" />
            {t('other_activities_section_title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('other_activities_section_subtitle')}
          </p>

          {/* Single promotional image */}
          <div className="mb-8">
            <Link href="/aktivitas-lain" className="block group max-w-lg mx-auto">
              <div className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-primary/30">
                <Image
                  src="https://archive.org/download/header_20250629/Header.jpg"
                  alt={t('other_activities_promo_image_alt')}
                  width={1280}
                  height={720}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 512px"
                  data-ai-hint="watersports collage"
                />
              </div>
            </Link>
          </div>

          <Button asChild size="lg">
            <Link href="/aktivitas-lain">{t('view_all_other_activities_button')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
