import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, registration, className = '', ...props }, ref) => {
    return (
      <div className='w-full'>
        <label className='block text-custom-14 mobileM:M:text-custom-14 laptopM:text-custom-14 font-medium text-gray-700'>
          {label}
        </label>
        <input
          {...registration}
          {...props}
          ref={ref}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-custom-12 mobileM:text-custom-12 laptopM:text-custom-16 ${className}`}
        />
        {error && (
          <p className='mt-1 text-custom-12 mobileM:text-custom-12 laptopM:text-custom-14 text-red-600'>
            {error}
          </p>
        )}
      </div>
    );
  }
);
