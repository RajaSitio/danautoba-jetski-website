
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslation } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import { Info, X } from 'lucide-react';
import { useState } from 'react';

export function PromoFAB() {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleIconClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); 
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleIconClick}
          size="icon"
          className={cn(
            "fixed bottom-20 right-6 z-50",
            "w-14 h-14 rounded-full",
            "bg-transparent hover:bg-transparent p-0",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "origin-top", 
            isAnimating && "animate-gentle-swing"
          )}
          aria-label={t('promo_fab_tooltip_text', {defaultValue: "View Promo Info"})}
        >
          <Image 
            src="https://archive.org/download/special-offer_202506/Special-offer.png" 
            alt={t('promo_fab_tooltip_text', {defaultValue: "View Promo Info"})}
            width={56} 
            height={56} 
            className="rounded-full"
            data-ai-hint="special offer"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="top" 
        className="w-auto max-w-xs sm:max-w-sm mr-2 mb-2 relative data-[state=open]:animate-pop-in"
        align="end"
      >
        <button
          onClick={() => setIsPopoverOpen(false)}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={t('close_button_aria_label', {defaultValue: "Close"})}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start space-x-3 pr-4"> 
          <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {t('promo_popover_title', {defaultValue: "Latest Promo Info"})}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('no_promo_ticker_main_text', {defaultValue: "There are no special promos at the moment. Stay tuned for our next exciting offers!"})}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
