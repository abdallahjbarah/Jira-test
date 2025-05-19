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
export const LOCALES = ['en', 'ar'] as const;
export const DEFAULT_LOCALE = 'en' as const;
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
  ALL: 'all',
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
  icon?: string;
  isSoon?: boolean;
}

export const COLLECTION_STATUS_LIST: CollectionStatusItem[] = [
  {
    value: COLLECTION_STATUS.ALL,
    label: { en: 'All', ar: 'الكل' },
    path: `/${COLLECTION_STATUS.ALL}`,
  },
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
    label: { en: 'Offers & Packages', ar: 'العروض والباقات' },
    path: `/${COLLECTION_STATUS.OFFERS}`,
    icon: '/SVGs/shared/diamond.svg',
  },
  {
    value: COLLECTION_STATUS.PRODUCTS,
    label: { en: 'Products', ar: 'المنتجات' },
    path: `/${COLLECTION_STATUS.PRODUCTS}`,
    icon: '/SVGs/shared/bag-icon.svg',
    isSoon: true,
  },
];

export type CollectionStatus =
  (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];

export interface FilterOption {
  value: string;
  label: {
    en: string;
    ar: string;
  };
  icon?: string;
  description?: {
    en: string;
    ar: string;
  };
}

// Experience Types
export const EXPERIENCE_TYPES = {
  ART_AND_CULTURE: 'art_and_culture',
  ENTERTAINMENT: 'entertainment',
  FOOD_AND_DRINK: 'food_and_drink',
  SPORTS: 'sports',
} as const;

export const EXPERIENCE_TYPES_LIST: FilterOption[] = [
  {
    value: EXPERIENCE_TYPES.ART_AND_CULTURE,
    label: { en: 'Art and Culture', ar: 'الفن والثقافة' },
  },
  {
    value: EXPERIENCE_TYPES.ENTERTAINMENT,
    label: { en: 'Entertainment', ar: 'الترفيه' },
  },
  {
    value: EXPERIENCE_TYPES.FOOD_AND_DRINK,
    label: { en: 'Food and Drink', ar: 'الطعام والشراب' },
  },
  {
    value: EXPERIENCE_TYPES.SPORTS,
    label: { en: 'Sports', ar: 'الرياضة' },
  },
];

// Time of Day
export const TIME_OF_DAY = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
} as const;

export const TIME_OF_DAY_LIST: FilterOption[] = [
  {
    value: TIME_OF_DAY.MORNING,
    label: { en: 'Morning', ar: 'صباحاً' },
    description: {
      en: 'Starts before 12 pm',
      ar: 'يبدأ قبل الساعة 12 ظهراً',
    },
  },
  {
    value: TIME_OF_DAY.AFTERNOON,
    label: { en: 'Afternoon', ar: 'بعد الظهر' },
    description: {
      en: 'Starts after 12 pm',
      ar: 'يبدأ بعد الساعة 12 ظهراً',
    },
  },
  {
    value: TIME_OF_DAY.EVENING,
    label: { en: 'Evening', ar: 'مساءً' },
    description: {
      en: 'Starts after 5 pm',
      ar: 'يبدأ بعد الساعة 5 مساءً',
    },
  },
];

// Duration
export const DURATION_TYPES = {
  SHORT: 'short',
  MODERATE: 'moderate',
  EXTENDED: 'extended',
  FULL_DAY: 'full_day',
} as const;

export const DURATION_TYPES_LIST: FilterOption[] = [
  {
    value: DURATION_TYPES.SHORT,
    label: { en: 'Short', ar: 'قصير' },
  },
  {
    value: DURATION_TYPES.MODERATE,
    label: { en: 'Moderate', ar: 'متوسط' },
  },
  {
    value: DURATION_TYPES.EXTENDED,
    label: { en: 'Extended', ar: 'ممتد' },
  },
  {
    value: DURATION_TYPES.FULL_DAY,
    label: { en: 'Full Day', ar: 'يوم كامل' },
  },
];

// Language Preferences
export const LANGUAGE_PREFERENCES = {
  ENGLISH: 'english',
  ARABIC: 'arabic',
  GERMAN: 'german',
  TURKISH: 'turkish',
  DEAF_LANGUAGE: 'deaf_language',
} as const;

export const LANGUAGE_PREFERENCES_LIST: FilterOption[] = [
  {
    value: LANGUAGE_PREFERENCES.ENGLISH,
    label: { en: 'English', ar: 'الإنجليزية' },
  },
  {
    value: LANGUAGE_PREFERENCES.ARABIC,
    label: { en: 'Arabic', ar: 'العربية' },
  },
  {
    value: LANGUAGE_PREFERENCES.GERMAN,
    label: { en: 'German', ar: 'الألمانية' },
  },
  {
    value: LANGUAGE_PREFERENCES.TURKISH,
    label: { en: 'Turkish', ar: 'التركية' },
  },
  {
    value: LANGUAGE_PREFERENCES.DEAF_LANGUAGE,
    label: { en: 'Deaf Language', ar: 'لغة الإشارة' },
  },
];

// Age Suitability
export const AGE_SUITABILITY = {
  INFANTS: 'infants',
  CHILDREN: 'children',
  ADULTS: 'adults',
} as const;

export const AGE_SUITABILITY_LIST: FilterOption[] = [
  {
    value: AGE_SUITABILITY.INFANTS,
    label: { en: 'Infants (0-3 years)', ar: 'الرضع (0-3 سنوات)' },
  },
  {
    value: AGE_SUITABILITY.CHILDREN,
    label: { en: 'Children (4-11 years)', ar: 'الأطفال (4-11 سنة)' },
  },
  {
    value: AGE_SUITABILITY.ADULTS,
    label: { en: 'Adults (12+ years)', ar: 'البالغين (12+ سنة)' },
  },
];

// Experience Level
export const EXPERIENCE_LEVEL = {
  EASY: 'easy',
  MODERATE: 'moderate',
  DIFFICULT: 'difficult',
} as const;

export const EXPERIENCE_LEVEL_LIST: FilterOption[] = [
  {
    value: EXPERIENCE_LEVEL.EASY,
    label: { en: 'Easy', ar: 'سهل' },
  },
  {
    value: EXPERIENCE_LEVEL.MODERATE,
    label: { en: 'Moderate', ar: 'متوسط' },
  },
  {
    value: EXPERIENCE_LEVEL.DIFFICULT,
    label: { en: 'Difficult', ar: 'صعب' },
  },
];

// Available Amenities
export const AMENITIES = {
  WIFI: 'wifi',
  FREE_PARKING: 'free_parking',
  CAFETERIA: 'cafeteria',
} as const;

export const AMENITIES_LIST: FilterOption[] = [
  {
    value: AMENITIES.WIFI,
    label: { en: 'WiFi', ar: 'واي فاي' },
  },
  {
    value: AMENITIES.FREE_PARKING,
    label: { en: 'Free Parking', ar: 'موقف سيارات مجاني' },
  },
  {
    value: AMENITIES.CAFETERIA,
    label: { en: 'Cafeteria', ar: 'كافتيريا' },
  },
];

// Accessibility Features
export const ACCESSIBILITY_FEATURES = {
  STEP_FREE_GUEST_ENTRANCE: 'step_free_guest_entrance',
  GUEST_ENTRANCE_UNDER_32_INCHES: 'guest_entrance_under_32_inches',
  STEP_FREE_PATH_TO_GUEST_ENTRANCE: 'step_free_path_to_guest_entrance',
} as const;

export const ACCESSIBILITY_FEATURES_LIST: FilterOption[] = [
  {
    value: ACCESSIBILITY_FEATURES.STEP_FREE_GUEST_ENTRANCE,
    label: { en: 'Step-free guest entrance', ar: 'مدخل للضيوف بدون درج' },
  },
  {
    value: ACCESSIBILITY_FEATURES.GUEST_ENTRANCE_UNDER_32_INCHES,
    label: {
      en: 'Guest entrance wider than 32 inches',
      ar: 'مدخل للضيوف أوسع من 32 بوصة',
    },
  },
  {
    value: ACCESSIBILITY_FEATURES.STEP_FREE_PATH_TO_GUEST_ENTRANCE,
    label: {
      en: 'Step-free path to the guest entrance',
      ar: 'مسار بدون درج إلى مدخل الضيوف',
    },
  },
];

// Package Types for Offers & Packages
export const PACKAGE_TYPES = {
  GROUP_PACKAGE: 'group_package',
} as const;

export const PACKAGE_TYPES_LIST: FilterOption[] = [
  {
    value: PACKAGE_TYPES.GROUP_PACKAGE,
    label: { en: 'Group Package', ar: 'باقة جماعية' },
  },
];

// Package Duration for Offers & Packages
export const PACKAGE_DURATION = {
  HALF_DAY: 'half_day',
  FULL_DAY: 'full_day',
} as const;

export const PACKAGE_DURATION_LIST: FilterOption[] = [
  {
    value: PACKAGE_DURATION.HALF_DAY,
    label: { en: 'Half Day', ar: 'نصف يوم' },
  },
  {
    value: PACKAGE_DURATION.FULL_DAY,
    label: { en: 'Full Day', ar: 'يوم كامل' },
  },
];

// Booking Options
export const BOOKING_OPTIONS = {
  ALLOWS_PETS: 'allows_pets',
} as const;

export const BOOKING_OPTIONS_LIST: FilterOption[] = [
  {
    value: BOOKING_OPTIONS.ALLOWS_PETS,
    label: { en: 'Allows Pets', ar: 'يسمح بالأرانب' },
  },
];

// Filter Configurations for each page type
export const EXPERIENCES_FILTERS = {
  EXPERIENCE_TYPE: 'experience_type',
  PRICE_RANGE: 'price_range',
  TIME_OF_DAY: 'time_of_day',
  EXPERIENCE_DURATION: 'experience_duration',
  LANGUAGE_PREFERENCE: 'language_preference',
  AGE_SUITABILITY: 'age_suitability',
  EXPERIENCE_LEVEL: 'experience_level',
  BOOKING_VERIFIED: 'booking_verified',
  AVAILABLE_AMENITIES: 'available_amenities',
  SPECIAL_OFFERS: 'special_offers',
  BOOKING_OPTIONS: 'booking_options',
  ACCESSIBILITY_FEATURES: 'accessibility_features',
} as const;

export const EVENTS_FILTERS = {
  EVENT_TYPE: 'event_type',
  PRICE_RANGE: 'price_range',
  TIME_OF_DAY: 'time_of_day',
  EVENT_DURATION: 'event_duration',
  LANGUAGE_PREFERENCE: 'language_preference',
  AGE_SUITABILITY: 'age_suitability',
  EXPERIENCE_LEVEL: 'experience_level',
  BOOKING_VERIFIED: 'booking_verified',
  AVAILABLE_AMENITIES: 'available_amenities',
  SPECIAL_OFFERS: 'special_offers',
  BOOKING_OPTIONS: 'booking_options',
  ACCESSIBILITY_FEATURES: 'accessibility_features',
} as const;

export const STAYS_FILTERS = {
  EVENT_TYPE: 'event_type',
  INCLUDES_EXPERIENCE: 'includes_experience',
  ROOMS_AND_BEDS: 'rooms_and_beds',
  PRICE_RANGE: 'price_range',
  LANGUAGE_PREFERENCE: 'language_preference',
  BOOKING_VERIFIED: 'booking_verified',
  AVAILABLE_AMENITIES: 'available_amenities',
  SPECIAL_OFFERS: 'special_offers',
  BOOKING_OPTIONS: 'booking_options',
  ACCESSIBILITY_FEATURES: 'accessibility_features',
} as const;

export const OFFERS_PACKAGES_FILTERS = {
  PACKAGE_TYPE: 'package_type',
  PRICE_RANGE: 'price_range',
  TIME_OF_DAY: 'time_of_day',
  PACKAGE_DURATION: 'package_duration',
  LANGUAGE_PREFERENCE: 'language_preference',
  BOOKING_VERIFIED: 'booking_verified',
  AVAILABLE_AMENITIES: 'available_amenities',
  SPECIAL_OFFERS: 'special_offers',
  BOOKING_OPTIONS: 'booking_options',
  ACCESSIBILITY_FEATURES: 'accessibility_features',
} as const;
