import { useState } from 'react';
import PropTypes from 'prop-types';
import OpenEyeSvg from '../svg/OpenEye';
import CloseEyeSvg from '../svg/CloseEye';

const SHAPE_STYLES = {
  1: 'bg-secondary_5 text-custom-3xl text-primary_2 border border-solid border-secondary_3 rounded-[53px]',
  2: 'bg-primary_4 text-4 text-primary_2 border border-solid border-secondary_3 rounded-custom-16 ps-6 pt-[2rem]',
};

export default function PasswordInput({
  className = '',
  onChange,
  onBlur,
  placeholder,
  isRequired = false,
  name,
  id,
  value,
  withFocus = true,
  defaultValue = '',
  isDisable = false,
  pattern,
  shape,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const disabledClass = isDisable ? 'bg-secondary_4' : 'bg-secondary_5';
  const focusClass = withFocus
    ? 'focus:outline-primary_1 transition-all duration-200'
    : 'outline-none';
  const shapeClass = SHAPE_STYLES[shape] || 1;

  return (
    <div className='relative'>
      {shape === 2 && (
        <p className='absolute left-6 top-[0.7rem] select-none'>
          {placeholder}
        </p>
      )}
      <input
        pattern={pattern}
        disabled={isDisable}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        className={`${shapeClass} ${disabledClass} ${focusClass} ${shapeClass} ${className}`}
        type={isOpen ? 'text' : 'password'}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={isRequired}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer'
        type='button'
      >
        {isOpen ? <OpenEyeSvg /> : <CloseEyeSvg />}
      </button>
    </div>
  );
}

const stylePropTypes = PropTypes.shape({
  width: PropTypes.string,
  height: PropTypes.string,
});

PasswordInput.propTypes = {
  style: stylePropTypes,
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};
