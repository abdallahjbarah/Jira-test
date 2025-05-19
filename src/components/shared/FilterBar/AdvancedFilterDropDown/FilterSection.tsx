'use client';

import React from 'react';
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
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  type = 'checkbox',
  defaultOpen = true,
  className = '',
}) => {
  const { locale } = useTranslation();
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

  return (
    <Collapsible
      title={title}
      defaultOpen={defaultOpen}
      className={className}
      titleClassName='text-text_2 !font-custom-700'
    >
      <div className='space-y-3'>
        {options.map((option) =>
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
            />
          ),
        )}
      </div>
    </Collapsible>
  );
};

export default FilterSection;
