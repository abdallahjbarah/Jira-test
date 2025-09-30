import React from 'react';

interface ErrorFormikProps {
  isTouched: boolean;
  isError: boolean;
  error: string;
}

export default function ErrorFormik({
  isTouched,
  isError,
  error,
}: ErrorFormikProps): React.ReactElement {
  return (
    <>
      {isError && isTouched ? (
        <div className='text-red-500 text-custom-14 font-custom-500 mt-2 mobileM:text-custom-20'>
          {error}
        </div>
      ) : null}
    </>
  );
}
