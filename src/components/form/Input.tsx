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
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <input
          {...registration}
          {...props}
          ref={ref}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${className}`}
        />
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  },
);
