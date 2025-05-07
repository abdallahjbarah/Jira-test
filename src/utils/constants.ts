import ExperiencesSvg from '@SVGs/shared/experiences-icon.svg';
import StaysSvg from '@SVGs/shared/stays-icon.svg';
import EventsSvg from '@SVGs/shared/events-icon.svg';
import OffersSvg from '@SVGs/shared/diamond.svg';
import ProductsSvg from '@SVGs/shared/bag-icon.svg';

export const DAY_DURATION: number = 86400000;
export const DAY_FORMAT: string = 'DD.MM.YYYY';
export const TIME_FORMAT: string = 'HH:mm';

export const ONE_SECOND_IN_MILLI: number = 1000;
export const ONE_MINUTE_IN_MILLI: number = 1000 * 60;
export const ONE_HOUR_IN_MILLI: number = 1000 * 60 * 60;
export const ONE_DAY_IN_MILLI: number = 1000 * 60 * 60 * 24;

export const MAX_SIZE_IMAGE: number = 10 * 1_048_576;
export const MAX_SIZE_VIDEO: number = 360 * 1_048_576;
export const MAX_SIZE_PDF: number = 5 * 1_048_576;

export const USER_DETAILS: string = 'Bookagri_UserData';
export const TOKEN_NAME: string = 'Bookagri_Token';

// Internationalization settings
export enum LocaleValues {
  EN = 'en',
  AR = 'ar',
}
export const LOCALES = [LocaleValues.EN, LocaleValues.AR] as const;
export const DEFAULT_LOCALE = LocaleValues.EN as const;
export type Locale = (typeof LOCALES)[number];

export const ROLES = {
  SUPER_ADMIN: 1,
  PARTNER: 3,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const DIRECTIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
} as const;

export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type Size = (typeof SIZES)[keyof typeof SIZES];

export const STATUS = {
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const LAYOUT = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  INLINE: 'inline',
} as const;

export type Layout = (typeof LAYOUT)[keyof typeof LAYOUT];

interface CurrencyItem {
  value: string;
  label: string;
  countryCode2: string;
  countryName: string;
}

export const CURRENCIES_LIST: CurrencyItem[] = [
  {
    value: 'USD',
    label: 'USD',
    countryCode2: 'US',
    countryName: 'United States of America',
  },
  {
    value: 'AED',
    label: 'AED',
    countryCode2: 'AE',
    countryName: 'United Arab Emirates',
  },
  {
    value: 'SAR',
    label: 'SAR',
    countryCode2: 'SY',
    countryName: 'Syrian Arab Republic',
  },
  { value: 'QAR', label: 'QAR', countryCode2: 'QA', countryName: 'Qatar' },
  { value: 'EGP', label: 'EGP', countryCode2: 'EG', countryName: 'Egypt' },
  { value: 'JOD', label: 'JOD', countryCode2: 'JO', countryName: 'Jordan' },
];

export const SOCIAL_LOGIN_TYPES = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
} as const;

export type SocialLoginType =
  (typeof SOCIAL_LOGIN_TYPES)[keyof typeof SOCIAL_LOGIN_TYPES];

export const IMAGES_TYPES: string[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
];

export const VIDEO_TYPES: string[] = ['video/mp4'];

export const USERS_ACCEPT_IMAGES_TYPES: string[] = IMAGES_TYPES;
export const USERS_ACCEPT_VIDEO_TYPES: string[] = VIDEO_TYPES;

export const PDF_TYPES: Record<string, string[]> = {
  'application/pdf': [],
};

export const SEO = {
  CONTENT: 'none', // for staging
  // CONTENT: "all", // for production
} as const;

interface LinkData {
  path: string;
  name: {
    en: string;
    ar: string;
  };
}

export const LINKS_DATA: LinkData[] = [
  { path: '/', name: { en: 'Home', ar: 'الرئيسية' } },
  { path: '/#AboutUs', name: { en: 'About Us', ar: 'عننا' } },
  { path: '/news', name: { en: 'News', ar: 'الأخبار' } },
  { path: '/gallery', name: { en: 'Gallery', ar: 'المعرض' } },
  { path: '/#ContactUsForm', name: { en: 'Contact Us', ar: 'تواصل معنا' } },
  { path: '/experiences', name: { en: 'Experiences', ar: 'التجارب' } },
  { path: '/events', name: { en: 'Events', ar: 'الأحداث' } },
  { path: '/stays', name: { en: 'Stays', ar: 'الإقامات' } },
  {
    path: '/offers-Packages',
    name: { en: 'Offers & Packages', ar: 'العروض والباقات' },
  },
  { path: '/products', name: { en: 'Products', ar: 'المنتجات' } },
];

interface SocialMediaLink {
  link: string;
}

export const SOCIAL_MEDIA_DATA: Record<string, SocialMediaLink> = {
  instagram: { link: '#' },
  facebook: { link: '#' },
  tiktok: { link: '#' },
  linkedin: { link: '#' },
  whatsapp: { link: '#' },
};

export const SEO_KEYWORDS = [
  'agritourism',
  'farming experiences',
  'rural tourism',
  'Jordan agriculture',
  'farm tours',
  'Bookagri',
  'eco-tourism',
  'sustainable travel',
  'agricultural tours',
  'organic farming',
  'farm stays',
  'cultural tourism',
  'local farm experiences',
  'hands-on farming',
  'farm-to-table experiences',
  'rural escapes',
  'nature tourism',
  'Jordan farm visits',
  'agricultural heritage',
  'Jordan rural experiences',
  'community tourism',
  'farm adventures',
  'traditional farming',
  'Jordan countryside',
  'eco-friendly tourism',
  'rural community interaction',
];

export const COLLECTION_STATUS = {
  EXPERIENCES: 'experiences',
  STAYS: 'stays',
  EVENTS: 'events',
  OFFERS: 'offers',
  PRODUCTS: 'products',
} as const;

export interface CollectionStatusItem {
  value: string;
  label: {
    en: string;
    ar: string;
  };
  path: string;
  icon: string;
}

export const COLLECTION_STATUS_LIST: CollectionStatusItem[] = [
  {
    value: COLLECTION_STATUS.EXPERIENCES,
    label: { en: 'Experiences', ar: 'التجارب' },
    path: `/${COLLECTION_STATUS.EXPERIENCES}`,
    icon: '/SVGs/shared/experiences-icon.svg',
  },
  {
    value: COLLECTION_STATUS.STAYS,
    label: { en: 'Stays', ar: 'الإقامات' },
    path: `/${COLLECTION_STATUS.STAYS}`,
    icon: '/SVGs/shared/stays-icon.svg',
  },
  {
    value: COLLECTION_STATUS.EVENTS,
    label: { en: 'Events', ar: 'الأحداث' },
    path: `/${COLLECTION_STATUS.EVENTS}`,
    icon: '/SVGs/shared/events-icon.svg',
  },
  {
    value: COLLECTION_STATUS.OFFERS,
    label: { en: 'Offers', ar: 'العروض' },
    path: `/${COLLECTION_STATUS.OFFERS}`,
    icon: '/SVGs/shared/diamond.svg',
  },
  {
    value: COLLECTION_STATUS.PRODUCTS,
    label: { en: 'Products', ar: 'المنتجات' },
    path: `/${COLLECTION_STATUS.PRODUCTS}`,
    icon: '/SVGs/shared/bag-icon.svg',
  },
];

export type CollectionStatus =
  (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];
