
"use client";

import { useContext, useCallback } from 'react';
import { LanguageContext } from '@/contexts/language-context';
import { getTranslation } from '@/lib/locales';
import type { Locale } from '@/lib/locales';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      return getTranslation(language, key, params);
    },
    [language]
  );

  return { t, currentLanguage: language };
};
