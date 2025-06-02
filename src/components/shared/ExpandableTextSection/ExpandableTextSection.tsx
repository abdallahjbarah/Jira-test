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
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowReadMore = content.length > maxLength;
  const displayContent =
    isExpanded || !shouldShowReadMore
      ? content
      : content.substring(0, maxLength) + '...';

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2
        className={`text-3xl font-custom-700 text-text_1 font-gellix-Bold ${titleClassName}`}
      >
        {title}
      </h2>
      <div
        className={`font-custom-400 text-text_1 font-sans text-xl ${contentClassName}`}
      >
        <div dangerouslySetInnerHTML={{ __html: displayContent }} />
        {shouldShowReadMore && (
          <>
            {' '}
            <button
              onClick={toggleExpanded}
              type='button'
              className={`underline font-custom-500 text-text_1 font-sans text-xl hover:opacity-80 transition-opacity ${buttonClassName}`}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandableTextSection;
