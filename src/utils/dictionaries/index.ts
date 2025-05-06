import { Locale } from '../constants';
import en from './en';
import ar from './ar';

// Dictionary mapping by locale
const dictionaries = {
  en,
  ar,
};

/**
 * Get a dictionary for a specific locale
 *
 * @param locale - The target locale
 * @returns Dictionary containing translations for the specified locale
 */
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] || dictionaries.en;
};
