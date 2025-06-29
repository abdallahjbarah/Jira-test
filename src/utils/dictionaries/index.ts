import { Locale } from '../constants';
import en from './en';
import ar from './ar';

const dictionaries = {
  en,
  ar,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] || dictionaries.en;
};
