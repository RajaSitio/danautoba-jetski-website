
'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, Info } from 'lucide-react';
import type { PackageInfo } from '@/data/packages';

interface PackageDetailClientContentProps {
  packageInfo: PackageInfo;
}

export function PackageDetailClientContent({ packageInfo }: PackageDetailClientContentProps) {
  const { t } = useTranslation();

  const packageTitle = useMemo(() => t(packageInfo.titleKey), [packageInfo.titleKey, t]);

  const handleBookNow = () => {
    const whatsAppNumber = '62895611016833';
    const message = t('whatsapp_booking_greeting', { packageName: packageTitle });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`, '_blank');
  };
  
  const staticPackagePrice = t(packageInfo.priceKey);
  const staticPackageDuration = t(packageInfo.durationKey);
  const staticPackageDescription = t(packageInfo.descriptionKey);

  return (
    <div className="relative">
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-24 md:pb-0">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/#packages">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('package_detail_go_back_button')}
              </Link>
            </Button>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={packageInfo.imageSrc}
                alt={t(packageInfo.imageAltKey, { packageName: packageTitle })}
                fill
                className="object-cover"
                priority
                data-ai-hint={packageInfo.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {packageTitle}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-lg text-white/90 font-medium">
                  <span>{staticPackageDuration}</span>
                  <span>/</span>
                  <span className="font-semibold text-primary">{staticPackagePrice}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold text-primary">
                    {t('package_detail_description_title')}
                  </h2>
                   <div className="text-base text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert max-w-none prose-p:my-4"
                     dangerouslySetInnerHTML={{ __html: staticPackageDescription }}
                   />
                </div>

                <aside className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('package_detail_included_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {packageInfo.includedItemsKeys.map((itemKey) => (
                          <li key={itemKey} className="flex items-start text-sm text-muted-foreground">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t(itemKey)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {packageInfo.additionalNotesKeys && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('package_detail_notes_title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                            {packageInfo.additionalNotesKeys.map((noteKey) => (
                            <li key={noteKey} className="flex items-start text-sm text-muted-foreground">
                                <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span>{t(noteKey)}</span>
                            </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Button 
                    size="lg" 
                    className="w-full btn-gold hidden md:inline-flex"
                    onClick={handleBookNow}>
                    {t('package_detail_book_now_button_whatsapp')}
                  </Button>
                </aside>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-20 p-4 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.1)]">
        <Button 
          size="lg" 
          className="w-full btn-gold" 
          onClick={handleBookNow}>
          {t('package_detail_book_now_button_whatsapp')}
        </Button>
      </div>
    </div>
  );
}
