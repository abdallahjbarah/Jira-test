'use client';

import React, { useState } from 'react';
import Collapsible from '@/components/ui/Collapsible';
import Checkbox from '@/components/ui/Checkbox';
import RadioButton from '@/components/ui/RadioButton';
import { FilterOption } from '@/utils/constants';
import { useTranslation } from '@/contexts/TranslationContext';

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  type?: 'checkbox' | 'radio';
  defaultOpen?: boolean;
  className?: string;
  maxVisibleOptions?: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options = [],
  selectedValues = [],
  onChange,
  type = 'checkbox',
  defaultOpen = true,
  className = '',
  maxVisibleOptions = 4,
}) => {
  const { locale, t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (value: string) => {
    if (type === 'radio') {
      // For radio buttons, just select the one value
      onChange([value]);
    } else {
      // For checkboxes, toggle the value in the array
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    }
  };

  if (options.length === 0) {
    return null;
  }

  const visibleOptions = showAll
    ? options
    : options.slice(0, maxVisibleOptions);
  const hasMoreOptions = options.length > maxVisibleOptions;

  return (
    <Collapsible
      title={title}
      defaultOpen={defaultOpen}
      className={className}
      titleClassName='text-text_2 !font-custom-700'
    >
      <div className='space-y-3'>
        {visibleOptions.map((option) =>
          type === 'radio' ? (
            <RadioButton
              key={option.value}
              id={`filter-${option.value}`}
              name={`filter-${title}`}
              label={option.label[locale]}
              description={option.description?.[locale]}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
          ) : (
            <Checkbox
              key={option.value}
              id={`filter-${option.value}`}
              label={option.label[locale]}
              description={option.description?.[locale]}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              checkBoxPosition='right'
              checkBoxClassName='ml-auto'
            />
          ),
        )}

        {hasMoreOptions && (
          <button
            type='button'
            onClick={() => setShowAll(!showAll)}
            className='text-xs text-secondary_6 hover:text-primary-dark transition-colors duration-200 font-medium mt-2'
          >
            {showAll
              ? t('filters.showLess')
              : `${t('filters.showMore')} (${options.length - maxVisibleOptions})`}
          </button>
        )}
      </div>
    </Collapsible>
  );
};

export default FilterSection;
