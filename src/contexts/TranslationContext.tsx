'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Locale, DEFAULT_LOCALE } from '@utils/constants';
import { getDictionary } from '@utils/dictionaries';

interface TranslationContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (newLocale: Locale) => void;
  dictionary: Record<string, string>;
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
  const [dictionary, setDictionary] = useState<Record<string, string>>({});

  // Load dictionary when locale changes
  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };

    loadDictionary();
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    return dictionary[key] || key;
  };

  // Function to change locale
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

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
