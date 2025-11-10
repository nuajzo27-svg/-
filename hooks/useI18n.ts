import React, { createContext, useState, useContext, useEffect } from 'react';
import ar from '../locales/ar';
import en from '../locales/en';

type Language = 'ar' | 'en';
type Translations = typeof ar;

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
  dir: 'rtl' | 'ltr';
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('app-language');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const translations: { [key in Language]: Translations } = { ar, en };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Fallback to key if translation is missing
        return key;
      }
    }
    
    if (typeof value === 'string' && params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue));
      });
    }

    return typeof value === 'string' ? value : key;
  };

  return React.createElement(I18nContext.Provider, {
    value: { language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }
  }, children);
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};