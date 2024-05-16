import React from 'react';
import PropTypes from 'prop-types';

const SHAPE_STYLES = {
  1: 'no-scrollbar resize-none bg-primary_4 text-custom-24 text-primary_5 border border-solid border-secondary_3 rounded-[16px] removeInputIcon',
};

export default function CustomTextarea({
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
}) {
  const disabledClass = isDisable ? 'bg-secondary_4' : '';
  const focusClass = withFocus
    ? 'focus:outline-primary_1 transition-all duration-200'
    : 'outline-none';
  const shapeClass = SHAPE_STYLES[shape] || 2;

  return (
    <textarea
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

CustomTextarea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withFocus: PropTypes.bool,
  isDisable: PropTypes.bool,
  shape: PropTypes.number,
};
