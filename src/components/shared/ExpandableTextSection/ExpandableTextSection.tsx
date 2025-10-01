import { useTranslation } from '@/contexts/TranslationContext';
import React, { useState } from 'react';

export interface ExpandableTextSectionProps {
  title: string;
  content: string;
  maxLength?: number;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  buttonClassName?: string;
}

const ExpandableTextSection: React.FC<ExpandableTextSectionProps> = ({
  title,
  content,
  maxLength = 200,
  className = '',
  titleClassName = '',
  contentClassName = '',
  buttonClassName = '',
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowReadMore = content.length > maxLength;
  const displayContent =
    isExpanded || !shouldShowReadMore
      ? content
      : `${content.substring(0, maxLength)}...`;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2
        className={`text-custom-20 text-text_1 font-bold ${titleClassName} mobileM:text-custom-22 laptopM:text-custom-30`}
      >
        {title}
      </h2>
      <div
        className={`font-custom-400 text-text_1 font-sans text-custom-15 ${contentClassName} mobileM:text-custom-18 laptopM:text-custom-20`}
      >
        <p>
          <span dangerouslySetInnerHTML={{ __html: displayContent }} />
          {shouldShowReadMore && (
            <button
              onClick={toggleExpanded}
              type='button'
              className={`ml-1 font-bold text-black font-sans text-custom-14 hover:opacity-80 transition-opacity ${buttonClassName} mobileM:text-custom-18 laptopM:text-custom-20 underline hover:text-primary_2 transition-colors`}
            >
              {isExpanded ? t('common.readLess') : t('common.readMore')}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ExpandableTextSection;
