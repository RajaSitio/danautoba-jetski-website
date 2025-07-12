"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-language';
import type { Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

const StarRating = ({ rating, className }: { rating: number, className?: string }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-3.5 w-3.5 text-primary fill-primary" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-primary" />
      ))}
    </div>
  );
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { t } = useTranslation();

  return (
    <Card className="bg-background/70 border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col h-full text-center p-4">
      <CardContent className="p-0 flex flex-col items-center flex-grow">
        <Avatar className="w-12 h-12 mb-3 border-2 border-primary">
          <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-base text-foreground">{testimonial.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{t(testimonial.roleKey)}</p>
        <StarRating rating={testimonial.rating} className="mb-3" />
        <blockquote className="text-muted-foreground text-xs italic border-l-2 border-primary/50 pl-3 text-left flex-grow">
          "{t(testimonial.quoteKey)}"
        </blockquote>
      </CardContent>
    </Card>
  );
}
