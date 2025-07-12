
"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-language';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-9 z-50 rounded-full h-8 w-8 shadow-lg transition-opacity duration-300 bg-card hover:bg-accent hover:text-accent-foreground border border-primary text-primary",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label={t('backToTop')}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
