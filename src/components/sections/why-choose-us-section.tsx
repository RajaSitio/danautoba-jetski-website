"use client";

import { useTranslation } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Camera, Zap, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AdvantageItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const advantages: AdvantageItem[] = [
  {
    icon: Zap, // Represents modern, fast equipment
    titleKey: 'advantage_1_title',
    descriptionKey: 'advantage_1_desc',
  },
  {
    icon: UserCheck, // Represents professionalism and trustworthy guides
    titleKey: 'advantage_2_title',
    descriptionKey: 'advantage_2_desc',
  },
  {
    icon: Camera, // Represents professional documentation
    titleKey: 'advantage_3_title',
    descriptionKey: 'advantage_3_desc',
  },
  {
    icon: ShieldCheck, // Represents safety as a core pillar
    titleKey: 'advantage_4_title',
    descriptionKey: 'advantage_4_desc',
  },
];

export function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section id="why-choose-us" className="pt-8 pb-8 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t('why_choose_us_title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('why_choose_us_subtitle')}
          </p>
        </div>

        {advantages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="bg-background/70 border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col h-full">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <advantage.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {t(advantage.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-xs sm:text-sm text-muted-foreground flex-grow">
                  <p>{t(advantage.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground">
            {t('photoGalleryNoItems', {defaultValue: "Information about our advantages will be available soon."})}
          </p>
        )}
      </div>
    </section>
  );
}
