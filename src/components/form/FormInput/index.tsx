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
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasValue =
      (value !== undefined && value !== '') ||
      (defaultValue !== undefined && defaultValue !== '') ||
      props.placeholder !== undefined;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} relative`}>
        <div
          className={`
          relative border border-solid rounded-lg
          ${error ? 'border-red-500' : 'border-secondary_3'}
          ${isFocused ? 'border-primary_1' : ''}
          transition-all duration-200
        `}
        >
          {label && (
            <label
              className={`
                absolute pointer-events-none
                transition-all duration-200 px-1
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
          )}
          <input
            {...registration}
            {...props}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={`
              w-full px-4 pt-5 pb-2 rounded-lg
              focus:outline-none
              text-base
              bg-transparent
              ${className}
            `}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus && props.onFocus(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              props.onBlur && props.onBlur(e);
            }}
          />
        </div>
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
