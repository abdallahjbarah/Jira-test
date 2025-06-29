import { Locale, DEFAULT_LOCALE } from './constants';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  home: {
    en: 'Home',
    ar: 'الرئيسية',
  },
  'about-us': {
    en: 'About Us',
    ar: 'من نحن',
  },
  news: {
    en: 'News',
    ar: 'الأخبار',
  },
  gallery: {
    en: 'Gallery',
    ar: 'معرض الصور',
  },
  'contact-us': {
    en: 'Contact Us',
    ar: 'اتصل بنا',
  },
  experiences: {
    en: 'Experiences',
    ar: 'التجارب',
  },
  events: {
    en: 'Events',
    ar: 'الفعاليات',
  },
  stays: {
    en: 'Stays',
    ar: 'الإقامات',
  },
  'offers-packages': {
    en: 'Offers & Packages',
    ar: 'العروض والباقات',
  },
  products: {
    en: 'Products',
    ar: 'المنتجات',
  },
  'page-not-found': {
    en: 'Page not found',
    ar: 'الصفحة غير موجودة',
  },
  'go-back': {
    en: 'Go back',
    ar: 'العودة',
  },
  'take-me-home': {
    en: 'Take me home',
    ar: 'العودة للرئيسية',
  },
};

export function t(key: string, locale: Locale = DEFAULT_LOCALE): string {
  if (!translations[key]) {
    return key;
  }

  return translations[key][locale] || translations[key][DEFAULT_LOCALE] || key;
}

export function createTranslator(locale: Locale) {
  return (key: string) => t(key, locale);
}
