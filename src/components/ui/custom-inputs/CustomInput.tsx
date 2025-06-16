import React, { ChangeEvent } from 'react';

const SHAPE_STYLES: Record<number, string> = {
  1: 'bg-primary_4 text-custom-24 text-primary_5 border border-solid border-secondary_3 rounded-[16px] removeInputIcon',
};

interface CustomInputProps {
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isRequired?: boolean;
  name: string;
  id: string;
  value: string | number;
  type?: string;
  withFocus?: boolean;
  isDisable?: boolean;
  pattern: string;
  shape: number;
}

export default function CustomInput({
  className = '',
  onChange,
  onBlur,
  placeholder,
  isRequired = false,
  name,
  id,
  value,
  type = 'text',
  withFocus = true,
  isDisable = false,
  pattern,
  shape,
}: CustomInputProps): React.ReactElement {
  const disabledClass = isDisable ? 'bg-secondary_4' : '';
  const focusClass = withFocus
    ? 'focus:outline-primary_1 transition-all duration-200'
    : 'outline-none';
  const shapeClass = SHAPE_STYLES[shape] || '';

  return (
    <input
      pattern={pattern}
      disabled={isDisable}
      id={id}
      name={name}
      value={value}
      className={`${shapeClass} ${disabledClass} ${focusClass} ${shapeClass} ${className}`}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={isRequired}
    />
  );
}
