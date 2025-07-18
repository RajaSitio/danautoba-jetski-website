
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/use-language';
import type { OtherActivityInfo } from '@/data/other-activities';
import React from 'react';

interface OtherActivityCardProps {
  activityInfo: OtherActivityInfo;
}

export function OtherActivityCard({ activityInfo }: OtherActivityCardProps) {
  const { t } = useTranslation();
  const activityTitle = t(activityInfo.titleKey);

  const handleContactUs = () => {
    const whatsAppNumber = "62895611016833"; // Main contact number
    const message = t('whatsapp_booking_greeting', { packageName: activityTitle });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow duration-300 h-full bg-card group">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <Image
          src={activityInfo.imageSrc}
          alt={t(activityInfo.imageAltKey)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 23vw"
          data-ai-hint={activityInfo.dataAiHint}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-primary line-clamp-2 leading-tight">
           {activityTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="text-lg mb-2">
          <span className="font-bold text-primary">{t(activityInfo.priceKey)}</span>
          <span className="text-muted-foreground text-sm">{t(activityInfo.durationKey)}</span>
        </div>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
            {t(activityInfo.descriptionKey)}
        </CardDescription>
        <p className="text-xs text-muted-foreground mt-2 italic">{t(activityInfo.priceInfoKey)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 mt-auto">
        <Button className="w-full btn-gold" onClick={handleContactUs}>
          {t('contact_for_info')}
        </Button>
      </CardFooter>
    </Card>
  );
}
