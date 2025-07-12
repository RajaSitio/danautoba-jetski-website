
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import type { Locale } from '@/lib/locales';

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  isReady: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>('id');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('tobajet_lang') as Locale | null;
    if (storedLang && (storedLang === 'id' || storedLang === 'en')) {
      setLanguageState(storedLang);
    }
    setIsReady(true);
  }, []);

  const setLanguage = (lang: Locale) => {
    localStorage.setItem('tobajet_lang', lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
};
