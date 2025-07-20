import React, { useState, useEffect, useRef } from 'react';

interface VerifyCodeInputProps {
  length: number;
  onComplete: (code: string) => void;
  placeholder?: string;
}

const VerifyCodeInput = ({
  length,
  onComplete,
  placeholder = '•',
}: VerifyCodeInputProps): React.ReactElement => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const isValidCharacter = (char: string): boolean => /^[0-9]$/.test(char);

  const handleChange = (element: HTMLInputElement, index: number): void => {
    const value = element.value.slice(-1);
    const newOtp = [...otp];

    if (!value) {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      if (!isValidCharacter(value)) return;
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }

    if (newOtp.every(digit => digit)) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.key === 'Backspace' && !otp[index]) {
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
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
          ref={el => {
            if (el) inputRefs.current[index] = el;
          }}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={1}
          value={value}
          placeholder={placeholder}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className='h-[3.813rem] w-full border border-x-0 border-t-0 border-gray-300 text-center text-[2rem] text-primary_2 outline-none'
          autoComplete='off'
        />
      ))}
    </div>
  );
};

export default VerifyCodeInput;
