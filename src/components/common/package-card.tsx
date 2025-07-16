
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/use-language';
import type { PackageInfo } from '@/data/packages';
import { Clock, Tag } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

interface PackageCardProps {
  packageInfo: PackageInfo;
}

export function PackageCard({ packageInfo }: PackageCardProps) {
  const { t } = useTranslation();
  const packageTitle = t(packageInfo.titleKey);

  const handleBookNow = () => {
    const whatsAppNumber = "62895611016833";
    const message = t('whatsapp_booking_greeting', { packageName: packageTitle });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow duration-300 h-full bg-card group">
      <div className="block w-full h-full group/image bg-muted">
        <div className="relative w-full aspect-[27/9] overflow-hidden">
          <Image
            key={packageInfo.imageSrc} 
            src={packageInfo.imageSrc}
            alt={t(packageInfo.imageAltKey, { packageName: packageTitle })}
            fill
            className="object-cover transition-transform duration-300 group-hover/image:scale-105"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            data-ai-hint={packageInfo.dataAiHint}
          />
        </div>
      </div>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-semibold text-primary line-clamp-2">
           {packageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="mr-1 h-4 w-4 text-primary/80 flex-shrink-0" />
            <span>
              <span className="font-medium">{t('packageDuration')}:</span>{' '}
              <span className="text-foreground font-semibold">{t(packageInfo.durationKey)}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="mr-1 h-4 w-4 text-primary/80 flex-shrink-0" />
            <span className="text-left sm:text-right">
              <span className="font-medium">{t('packagePricePrefix')}:</span>{' '}
              <span className="text-primary font-semibold">{t(packageInfo.priceKey)}</span>
            </span>
          </div>
        </div>
        <CardDescription className="mt-4 text-xs sm:text-sm text-foreground/80 line-clamp-3">
          {t(packageInfo.summaryKey)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-2 flex flex-col items-stretch gap-3 mt-auto">
        <Button asChild variant="secondary" className="w-full text-base" size="lg">
          <Link href={`/paket/${packageInfo.id}`}>{t('packageLearnMore')}</Link>
        </Button>
        <Button className="w-full btn-gold text-base" size="lg" onClick={handleBookNow}>
          {t('packageBookNow')}
        </Button>
      </CardFooter>
    </Card>
  );
}
