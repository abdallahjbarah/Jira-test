import {
  MAX_SIZE_IMAGE,
  MAX_SIZE_VIDEO,
  USERS_ACCEPT_IMAGES_TYPES,
  USERS_ACCEPT_VIDEO_TYPES,
  USER_DETAILS,
} from './constants';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface PasswordStrengthResult {
  score: number;
  description: string;
  suggestions: string;
}

export const customTimeStampToDate = (
  date: number | string,
  format: string
): string => dayjs(date).format(format);

export const customDateToTimeStamp = (
  dateString: string,
  dateFormat: string
): number => dayjs(dateString, { format: dateFormat }).valueOf();

export const customConvertTime24HoursTo12 = (stringTime24: string): string => {
  try {
    const match = stringTime24
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/);

    if (!match) return stringTime24;

    const hours = match[1];
    const minutes = match[3];
    const ampm = +hours < 12 ? 'AM' : 'PM';
    const adjustedHours = String(+hours % 12 || 12);

    return `${adjustedHours}:${minutes}${ampm}`;
  } catch (error) {
    return '';
  }
};

export const addToObjectDate = (
  objectDate: Date | string | number,
  unit: dayjs.ManipulateType,
  number: number
): Date => {
  const date = dayjs(objectDate);
  const result = date.add(number, unit);
  return result.toDate();
};

export function capitalizeFirstLetterOfEachWord(input?: string): string {
  try {
    return input?.replace(/\b\w/g, match => match.toUpperCase()) || '';
  } catch (error) {
    return '';
  }
}

export function convertTimezoneToOffset(timezoneName: string): string {
  const now = dayjs();
  const offset = now.tz(timezoneName).utcOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;

  const sign = offset >= 0 ? '+' : '-';
  const formattedOffset = `${sign}${offsetHours
    .toString()
    .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  return `GMT${formattedOffset}`;
}

export function timeToMilliseconds(time: string): number {
  const [hours, minutes] = time.split(':');
  const totalMilliseconds =
    (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;
  return totalMilliseconds;
}

export function measurePasswordStrength(
  password: string
): PasswordStrengthResult {
  const commonPatterns: string[] = [
    'password',
    '123456',
    'qwerty',
    'admin',
    'letmein',
    'welcome',
    'password123',
    'iloveyou',
    'football',
    'abc123',
    'monkey',
    '123123',
    'sunshine',
    '1234',
    'superman',
    'batman',
    'shadow',
    'dragon',
    'mustang',
    'trustno1',
    'access',
    'master',
    'killer',
    '123qwe',
    'qwertyuiop',
    'login',
    'solo',
    'passw0rd',
    'starwars',
    'michael',
    'bailey',
    '12345',
    'p@ssw0rd',
    'welcome1',
    '123abc',
    'baseball',
    'thomas',
    'summer',
    'iloveyou1',
    'ashley',
    'buster',
    'harley',
    'rocky',
    'charlie',
    'pepper',
    'george',
    'maggie',
    'jordan',
    '1qaz2wsx',
    'abcdef',
    '000000',
    'qazwsx',
    'password1',
    'trustme',
  ];

  if (password.length < 8) {
    return {
      score: 1,
      description: 'Weak',
      suggestions: 'Weak password. Must contain at least 8 characters.',
    };
  }

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
  const containsSpaces = /\s/.test(password);

  if (containsSpaces) {
    return {
      score: 1,
      description: 'Weak',
      suggestions: 'The password must not contain spaces.',
    };
  }

  const characterTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSymbols];
  const numCharacterTypes = characterTypes.filter(Boolean).length;

  if (numCharacterTypes <= 3) {
    return {
      score: 2,
      description: 'Moderate',
      suggestions:
        'Not a very strong password. Must contain at least 1 letter.',
    };
  }

  return {
    score: 3,
    description: 'Strong',
    suggestions: 'Great! You have a strange password.',
  };
}

export function getRandomNumber(min: number = 1, max: number = 1000): number {
  return Math.random() * (max - min) + min;
}

export function isTimestamp(value: string | number): boolean {
  const timestamp = Date.parse(String(value));
  return !isNaN(timestamp);
}

export const calculateAgeFromTimestamp = (
  timestamp: number | string
): number | string => {
  try {
    const age =
      Number(new Date().getFullYear()) -
      Number(customTimeStampToDate(timestamp, 'YYYY'));
    return age;
  } catch (error) {
    return 'NaN';
  }
};

export const generateQueryString = (
  properties: Record<string, any>
): string => {
  if (!properties) {
    return '';
  }

  const validProperties = Object.entries(properties)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`);

  return validProperties.join('&');
};

export const stopPropagation = (e: React.SyntheticEvent): void => {
  e.stopPropagation();
};

export const convertDecimalTime = (decimalTime: number): string => {
  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime % 1) * 60);

  let result = '';

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    if (result !== '') {
      result += ' ';
    }
    result += `${minutes}m`;
  }

  return result !== '' ? result : '0m';
};

export const removeDuplicateObjects = <T>(arr: T[]): T[] => {
  const seen = new Set<string>();
  return arr.filter(item => {
    const itemStr = JSON.stringify(item);
    if (seen.has(itemStr)) {
      return false;
    }
    seen.add(itemStr);
    return true;
  });
};

export const downloadPDF = (pdfUrl: string): void => {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.target = '_blank';
  link.setAttribute('download', 'download');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  const cleanedObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== '' && value !== null && value !== undefined && value !== 0) {
      cleanedObj[key] = value;
    }
  }
  return cleanedObj;
};

export const checkValidImage = (type: string, size: number): boolean => {
  return USERS_ACCEPT_IMAGES_TYPES.includes(type) && size <= MAX_SIZE_IMAGE;
};

export const checkValidVideo = (type: string, size: number): boolean => {
  return USERS_ACCEPT_VIDEO_TYPES.includes(type) && size <= MAX_SIZE_VIDEO;
};

export const getStoredUserData = (): any => {
  const userData = localStorage.getItem(USER_DETAILS);
  return userData ? JSON.parse(userData) : null;
};

export const saveAccessToken = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};
