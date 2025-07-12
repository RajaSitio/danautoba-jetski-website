"use client";

import { Facebook, Instagram, Youtube, Phone } from 'lucide-react';
import { useTranslation } from '@/hooks/use-language';
import Link from 'next/link';
import { useEffect, useState } from 'react'; // Import hooks

// Komponen SVG untuk TikTok
const TikTokIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="none" className="h-6 w-6">
    <title>TikTok</title>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.5.06 1.54.03 3.08.02 4.63-.8.01-1.59.02-2.38.03-1.06.02-2.12.08-3.18.15-1.03.06-2.07.06-3.11.02-.12-1.54-.52-3.05-1.42-4.35C10.69 4.01 9.36 2.98 7.79 2.44c-.48-.16-1.03-.22-1.54-.35C6.22 1.81 6.21 1.53 6.22 1.24c.21-.15.4-.35.58-.5.35-.28.76-.39 1.19-.43.56-.05 1.12-.06 1.69-.06.31-.01.6-.03.91-.03z"/>
  </svg>
);

export function Footer() {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Defer getting the year to the client side to avoid potential hydration mismatches
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
          {/* Bagian Hubungi Kami */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('footer_contact_us_title')}</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground/90">{t('location_tio_beach_name')}</span>, {t('location_tio_beach_address')}
                </p>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start mt-1">
                  <Phone className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  {t('location_tio_beach_phone')}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground/90">{t('location_juma_cottage_name')}</span>, {t('location_juma_cottage_address')}
                </p>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start mt-1">
                  <Phone className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  {t('location_juma_cottage_phone')}
                </p>
              </div>
            </div>
          </div>

          {/* Bagian Ikuti Kami */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('footer_follow_us_title')}</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://web.facebook.com/profile.php?id=61576861521610&locale=id_ID" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/tuktukjetski?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://www.tiktok.com/@tuktukjetskiofficial2" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                <TikTokIcon />
              </Link>
              <Link href="https://www.youtube.com/channel/UC05XMeIK8hpQ_2nQsC-avfg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {t('appName')}. {t('footerRights')}. Dibuat dengan ❤️ di Danau Toba.
          </p>
        </div>
      </div>
    </footer>
  );
}
