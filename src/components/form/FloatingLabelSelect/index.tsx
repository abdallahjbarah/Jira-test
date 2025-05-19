import React, { useState } from 'react';
import Select, { StylesConfig, Props as SelectProps } from 'react-select';

interface FloatingLabelSelectProps extends SelectProps {
  label: string;
  error?: string;
  isFilled?: boolean;
}

const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
  error,
  styles = {} as any,
  isFilled,
  value,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value !== undefined || isFilled;

  const customStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      borderColor: error
        ? 'var(--color-red-500, #ef4444)'
        : state.isFocused
          ? 'var(--primary-color)'
          : 'var(--secondary-color-2, #e2e8f0)',
      borderRadius: '0.5rem',
      boxShadow: 'none',
      padding: '0px 12px',
      // paddingTop: '16px', // Add padding at the top to make room for the label
      transition: 'all 0.2s',
      '&:hover': {
        borderColor: state.isFocused
          ? 'var(--primary-color)'
          : 'var(--secondary-color-2, #e2e8f0)',
      },
      ...(styles.control && typeof styles.control === 'function'
        ? styles.control(provided, state)
        : {}),
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: 'none', // Hide the default placeholder since we're using a label
      ...(styles.placeholder && typeof styles.placeholder === 'function'
        ? styles.placeholder(provided, state)
        : {}),
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '8px 0 2px', // Adjust padding to accommodate the label
      ...(styles.valueContainer && typeof styles.valueContainer === 'function'
        ? styles.valueContainer(provided, state)
        : {}),
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      paddingTop: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? 'var(--primary-color)'
        : 'transparent',
      ':hover': {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--quaternary-color)',
      },
      ':active': {
        backgroundColor: 'var(--primary-color)',
        color: 'white',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      marginTop: '6px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    ...(styles || {}),
  };

  return (
    <div className='relative mb-4'>
      <div className='relative'>
        <label
          className={`
            absolute z-10 pointer-events-none transition-all duration-200 px-1
            ${
              isFocused || hasValue
                ? 'text-xs top-1 left-3 bg-white'
                : 'text-base top-1/2 left-4 -translate-y-1/2 text-gray-500'
            }
            ${isFocused ? 'text-primary_1' : 'text-gray-500'}
          `}
        >
          {label}
        </label>

        <Select
          styles={customStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=''
          value={value}
          {...props}
        />
      </div>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default FloatingLabelSelect;
