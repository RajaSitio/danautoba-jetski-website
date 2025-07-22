
"use client";

import { useTranslation } from '@/hooks/use-language';
import { Waves } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function OtherActivitiesSection() {
  const { t } = useTranslation();

  return (
    <section id="other-activities" className="pt-8 pb-12 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl bg-background/50">
          <div className="md:grid md:grid-cols-2 items-center">
            {/* Image Column - akan tampil penuh di atas pada mobile, dan di kiri pada desktop */}
            <div className="relative w-full h-48 md:h-full min-h-[200px] group">
              <Image 
                src="https://ia800900.us.archive.org/10/items/tur-batu-gantung/banana-boat.jpg"
                alt={t('other_activities_promo_image_alt', {defaultValue: "Promotional image for other water activities like banana boat and speedboat"})}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint="watersports lake fun"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Content Column - akan tampil di bawah gambar pada mobile, dan di kanan pada desktop */}
            <div className="p-6 md:p-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 flex items-center justify-center md:justify-start">
                <Waves className="inline-block h-7 w-7 md:h-8 md:w-8 mr-2 mb-1" />
                {t('other_activities_section_title')}
              </h2>
              <p className="text-base text-muted-foreground mb-6">
                {t('other_activities_section_subtitle')}
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg shadow-lg hover:scale-105 transition-transform">
                  <Link href="/aktivitas-lain">{t('view_all_other_activities_button')}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
