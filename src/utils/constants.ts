import InstagramSvg from '@components/svg/footer/InstagramSvg';
import FacebookSvg from '@components/svg/footer/FacebookSvg';
import TiktokSvg from '@components/svg/footer/TiktokSvg';
import LinkedinSvg from '@components/svg/footer/LinkedinSvg';
import WhatsappSvg from '@components/svg/footer/WhatsappSvg';

// -----------------------------------------------------------------------------------------------------------//
// ⋆༺𓆩☠︎︎𓆪༻⋆ Do not change the order of the arrays. I repeat, do not change the order of the arrays ⋆༺𓆩☠︎︎𓆪༻⋆ //
// -----------------------------------------------------------------------------------------------------------//

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
  name: string;
}

export const LINKS_DATA: LinkData[] = [
  { path: '/', name: 'Home' },
  { path: '/#AboutUs', name: 'About Us' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/news', name: 'News' },
  { path: '/#ContactUsForm', name: 'Contact Us' },
  { path: '/experiences', name: 'Experiences' },
  { path: '/events', name: 'Events' },
  { path: '/stays', name: 'Stays' },
  { path: '/offers-Packages', name: 'Offers & Packages' },
  { path: '/products', name: 'Products' },
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
