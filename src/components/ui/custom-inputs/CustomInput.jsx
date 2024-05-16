import React from 'react';
import PropTypes from 'prop-types';

const SHAPE_STYLES = {
  1: 'bg-primary_4 text-custom-24 text-primary_5 border border-solid border-secondary_3 rounded-[16px] removeInputIcon',
};

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
  defaultValue = '',
  isDisable = false,
  pattern,
  shape,
}) {
  const disabledClass = isDisable ? 'bg-secondary_4' : "";
  const focusClass = withFocus
    ? 'focus:outline-primary_1 transition-all duration-200'
    : 'outline-none';
  const shapeClass = SHAPE_STYLES[shape] || 2;
  return (
      <input
        pattern={pattern}
        disabled={isDisable}
        id={id}
        name={name}
        defaultValue={defaultValue}
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

CustomInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  withFocus: PropTypes.bool,
  isDisable: PropTypes.bool,
  pattern: PropTypes.string,
  shape: PropTypes.number,
};
