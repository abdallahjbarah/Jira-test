'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Locale, DEFAULT_LOCALE } from '@utils/constants';
import { getDictionary } from '@utils/dictionaries';

interface TranslationContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (newLocale: Locale) => void;
  dictionary: Record<string, any>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ lang: Locale }>();
  const locale = params?.lang || DEFAULT_LOCALE;
  const router = useRouter();
  const [dictionary, setDictionary] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };

    loadDictionary();
  }, [locale]);

  const t = (key: string): string => {
    const nestedKey = key.split('.');
    if (nestedKey.length > 1) {
      try {
        const result = nestedKey.reduce(
          (acc: any, curr) => acc && acc[curr],
          dictionary,
        );
        return result || key;
      } catch (error) {
        return key;
      }
    }
    return dictionary[key] || key;
  };

  const changeLocale = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    router.push(newPath);
  };

  const value = {
    locale,
    t,
    changeLocale,
    dictionary,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
