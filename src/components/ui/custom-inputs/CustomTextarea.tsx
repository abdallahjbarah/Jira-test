import React, { ChangeEvent, forwardRef } from 'react';

const SHAPE_STYLES: Record<number, string> = {
  1: 'no-scrollbar resize-none bg-primary_4 text-custom-24 text-primary_5 border border-solid border-secondary_3 rounded-[16px] removeInputIcon',
};

interface CustomTextareaProps {
  className?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  isRequired?: boolean;
  name: string;
  id: string;
  value?: string | number;
  withFocus?: boolean;
  isDisable?: boolean;
  shape: number;
}

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      className = '',
      onChange,
      onBlur,
      placeholder,
      isRequired = false,
      name,
      id,
      value,
      withFocus = true,
      isDisable = false,
      shape,
    },
    ref
  ): React.ReactElement => {
    const disabledClass = isDisable ? 'bg-secondary_4' : '';
    const focusClass = withFocus
      ? 'focus:outline-primary_1 transition-all duration-200'
      : 'outline-none';
    const shapeClass = SHAPE_STYLES[shape] || '';

    return (
      <textarea
        ref={ref}
        required={isRequired}
        disabled={isDisable}
        id={id}
        name={name}
        className={`${shapeClass} ${disabledClass} ${focusClass} ${shapeClass} ${className}`}
        placeholder={placeholder}
        defaultValue={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    );
  }
);

CustomTextarea.displayName = 'CustomTextarea';

export default CustomTextarea;
