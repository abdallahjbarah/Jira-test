import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  fullWidth?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      registration,
      className = '',
      fullWidth = true,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue || '');

    // Check if the input has a value (for floating label)
    const hasValue = inputValue !== undefined && inputValue !== '';

    return (
      <div className={`${fullWidth ? 'w-full' : ''} relative`}>
        <div
          className={`
          relative border-[1px] border-solid rounded-lg h-[48px]
          ${error ? 'border-red-500' : 'border-[#EEEEEE]'}
          ${isFocused ? 'border-[#47C409]' : ''}
          transition-all duration-200
          hover:border-[#47C409]
          [&:has(input:focus)]:border-[#47C409]
          [&:has(input:hover)]:border-[#47C409]
        `}
        >
          {label && (
            <label
              className={`
                absolute pointer-events-none z-10
                transition-all duration-200 px-1
                ${isFocused || hasValue
                  ? 'text-xs -top-2 left-3 bg-white text-[#47C409]'
                  : 'text-sm top-3 left-4 text-[#555555]'
                }
              `}
            >
              {label}
            </label>
          )}
          <input
            {...registration}
            {...props}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              props.onChange && props.onChange(e);
            }}
            className={`
              w-full h-[48px] px-4 rounded-lg
              focus:outline-none
              text-base
              bg-transparent
              border-0
              appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-search-decoration]:appearance-none
              [&::-webkit-search-cancel-button]:appearance-none
              [&::-webkit-search-results-button]:appearance-none
              [&::-webkit-search-results-decoration]:appearance-none
              ${className}
            `}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus && props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur && props.onBlur(e);
            }}
          />
        </div>
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
