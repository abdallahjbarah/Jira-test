'use client';

import React from 'react';
import { LocaleValues } from '@utils/constants';
import { useTranslation } from '@/contexts/TranslationContext';
import { LanguageSwitcherProps } from './types';
import { languageSwitcherStyles as styles } from './styles';
import LanguageIcon from '../ui/svg/LanguageIcon';

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const { locale, changeLocale } = useTranslation();

  const handleLocaleChange = () => {
    changeLocale(
      locale === LocaleValues.EN ? LocaleValues.AR : LocaleValues.EN,
    );
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={handleLocaleChange}
    >
      <LanguageIcon />
    </div>
  );
}
