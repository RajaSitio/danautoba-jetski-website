"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/use-language';
import type { OtherActivityInfo } from '@/data/other-activities';
import React from 'react';
import { Waves } from 'lucide-react';

interface OtherActivityCardProps {
  activityInfo: OtherActivityInfo;
}

export function OtherActivityCard({ activityInfo }: OtherActivityCardProps) {
  const { t } = useTranslation();
  const activityTitle = t(activityInfo.titleKey);
  const activityDescription = t(activityInfo.descriptionKey);

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
          sizes="(max-width: 768px) 90vw, 30vw"
          data-ai-hint={activityInfo.dataAiHint}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold text-primary line-clamp-1">
           {activityTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div 
            className="text-sm text-foreground/80 mb-2 prose prose-sm dark:prose-invert max-w-none prose-p:my-2"
            dangerouslySetInnerHTML={{ __html: activityDescription }}
        />
        <div className="flex items-center text-xs text-muted-foreground mb-4">
            <Waves className="h-4 w-4 mr-2 text-primary/80" />
            <span>{t('include_hotel_beach_pickup_short')}</span>
        </div>
        <div className="text-lg">
          <span className="font-bold text-primary">{t(activityInfo.priceKey)}</span>
          <span className="text-muted-foreground text-base">{t(activityInfo.durationKey)}</span>
        </div>
         <p className="text-xs text-muted-foreground mt-1">{t(activityInfo.priceInfoKey)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Button className="w-full btn-gold" onClick={handleContactUs}>
          {t('packageBookNow')}
        </Button>
      </CardFooter>
    </Card>
  );
}
