import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import FormInput from '@/components/form/FormInput';
import EyeToggle from '@/components/ui/EyeToggle';

interface PasswordInputProps {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  registration,
  value,
  onChange,
  onBlur,
  name,
  id,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative'>
      <FormInput
        {...registration}
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        label={label}
        error={error}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`pr-10 ${className}`}
        {...props}
      />
      <div className='absolute right-3 top-1/2 transform -translate-y-1/2 z-10'>
        <EyeToggle isOpen={showPassword} onClick={togglePasswordVisibility} />
      </div>
    </div>
  );
};

export default PasswordInput;
