
"use client";

import { useTranslation } from '@/hooks/use-language';
import { testimonialData } from '@/data/testimonials';
import { TestimonialCard } from '@/components/common/testimonial-card';
import { MessageSquareQuote } from 'lucide-react';

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="pt-8 pb-12 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <MessageSquareQuote className="h-7 w-7" />
            {t('testimonials_section_title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials_section_subtitle')}
          </p>
        </div>

        {testimonialData && testimonialData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {testimonialData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground">
            {t('testimonials_no_items')}
          </p>
        )}
      </div>
    </section>
  );
}
