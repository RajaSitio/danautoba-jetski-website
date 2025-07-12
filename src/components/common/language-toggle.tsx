
"use client";

import { useLanguage, useTranslation } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/locales';
import { Skeleton } from '@/components/ui/skeleton';

const IndonesianFlagIcon = () => (
  <svg viewBox="0 0 30 20" width="24" height="16" xmlns="http://www.w3.org/2000/svg" className="inline-block self-center" aria-hidden="true">
    <rect width="30" height="10" fill="#CE1126"/> {/* Merah */}
    <rect y="10" width="30" height="10" fill="#FFFFFF"/> {/* Putih */}
  </svg>
);

const USFlagIcon = () => (
  <svg viewBox="0 0 28 20" width="24" height="18" xmlns="http://www.w3.org/2000/svg" className="inline-block self-center" aria-hidden="true">
    {/* Garis-garis */}
    <rect width="28" height="20" fill="#FFFFFF"/>
    <rect width="28" height="2.85" y="0" fill="#B22234"/> {/* Merah */}
    <rect width="28" height="2.85" y="5.7" fill="#B22234"/>
    <rect width="28" height="2.85" y="11.4" fill="#B22234"/>
    <rect width="28" height="2.85" y="17.1" fill="#B22234"/>
    {/* Kanton (biru) */}
    <rect width="12" height="10" fill="#3C3B6E"/> {/* Biru */}
    {/* Bintang sederhana (satu titik putih) */}
    <circle cx="6" cy="5" r="1.5" fill="#FFFFFF"/> {/* Putih */}
  </svg>
);


export function LanguageToggle() {
  const { setLanguage, language: currentLanguage, isReady } = useLanguage();
  const { t } = useTranslation();

  // If the context is not ready yet (on server or initial client render), show a placeholder.
  // This prevents a hydration mismatch.
  if (!isReady) {
    return <Skeleton className="h-10 w-[70px] rounded-md" />;
  }

  const toggleLanguage = () => {
    const newLanguage: Locale = currentLanguage === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
  };

  // Ketika bahasa saat ini adalah Indonesia, tampilkan tombol untuk beralih ke Inggris
  // Ketika bahasa saat ini adalah Inggris, tampilkan tombol untuk beralih ke Indonesia
  const displayCode = currentLanguage === 'id' ? 'EN' : 'ID';

  const ariaLabelKey = currentLanguage === 'id' ? 'toggleToEnglish' : 'toggleToIndonesian';
  const ariaLabelText = t(ariaLabelKey);

  return (
    <Button
      variant="ghost"
      size="default" // Menggunakan ukuran default untuk ruang yang cukup
      onClick={toggleLanguage}
      aria-label={ariaLabelText}
      className="flex items-center gap-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-2" // Sesuaikan padding dan gap jika perlu
    >
      {currentLanguage === 'id' ? <USFlagIcon /> : <IndonesianFlagIcon />}
      <span className="text-xs font-medium self-center">{displayCode}</span>
    </Button>
  );
}
