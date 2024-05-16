import React, { useState, useEffect, useRef } from 'react';

const VerifyCodeInput = ({ length, onComplete, placeholder = '•' }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputsRef = useRef(otp.map(() => React.createRef()));

  useEffect(() => {
    inputsRef.current[0].current.focus();
  }, []);

  const isValidCharacter = (char) => /^[0-9]$/.test(char);

  const handleChange = (element, index) => {
    const value = element.value.slice(-1);
    const newOtp = [...otp];

    if (!value) {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1].current.focus();
      }
    } else {
      if (!isValidCharacter(value)) return;
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < length - 1) {
        inputsRef.current[index + 1].current.focus();
      }
    }

    // Check if all inputs are filled
    if (newOtp.every((digit) => digit)) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputsRef.current[index - 1].current.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className='flex justify-between space-x-3'>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={inputsRef.current[index]}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength='1'
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className='h-[3.813rem] w-full border border-x-0 border-t-0 border-gray-300 text-center text-[2rem] text-primary_2 outline-none'
          autoComplete='off'
        />
      ))}
    </div>
  );
};

export default VerifyCodeInput;
