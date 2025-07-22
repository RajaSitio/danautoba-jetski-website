
"use client";

import type { FaqItem } from '@/data/faqs';
import { useTranslation } from '@/hooks/use-language';
import Link from 'next/link'; // Diubah dari useRouter
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, X } from 'lucide-react';

interface FaqClientContentProps {
  faqItems: FaqItem[];
}

export function FaqClientContent({ faqItems }: FaqClientContentProps) {
  const { t } = useTranslation();

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="relative rounded-lg border bg-card text-card-foreground shadow-lg p-6 md:p-8">
          {/* Tombol kembali sekarang menggunakan Link statis */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
            aria-label={t('close_button_aria_label', {defaultValue: 'Close'})}
          >
            <Link href="/">
              <X className="h-5 w-5" />
            </Link>
          </Button>
          
          <div className="text-center mb-8 md:mb-12 pt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              <HelpCircle className="inline-block h-8 w-8 md:h-9 md:w-9 mr-2 mb-1" />
              {t('faq_page_title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('faq_page_subtitle')}
            </p>
          </div>

          {faqItems && faqItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border bg-muted/30 shadow-sm rounded-lg">
                  <AccordionTrigger className="text-base md:text-lg font-medium text-left hover:no-underline px-5 py-4 text-foreground">
                    {t(item.questionKey)}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 pt-1">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {t(item.answerKey)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground">{t('faq_no_items')}</p>
          )}
        </div>
      </div>
    </section>
  );
}
