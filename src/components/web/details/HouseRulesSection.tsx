import React from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';

interface HouseRulesSectionProps {
  rules?: string;
}

const HouseRulesSection: React.FC<HouseRulesSectionProps> = ({ rules }) => {
  const { t } = useTranslation();
  const formatRules = (rulesText: string) => {
    if (!rulesText) return '';

    // Handle existing HTML tags and wrap text ending with colon
    return rulesText.replace(
      /(<[^>]*>)?([^<]*:)(<\/[^>]*>)?/g,
      (match, openTag, text, closeTag) => {
        const styledText = `<br><span class="font-custom-700" style="color: #000000 !important; font-weight: 700;">${text}</span>`;
        return `${openTag || ''}${styledText}${closeTag || ''}`;
      }
    );
  };

  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        {t('houseRules.houseRules')}
      </p>
      <div
        // className='font-custom-400 text-custom-16 laptopM:text-custom-20 text-text_2'
        dangerouslySetInnerHTML={{ __html: formatRules(rules || '') }}
      />
    </div>
  );
};

export default HouseRulesSection;
