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
        <div className='text-red-500 text-custom-20 font-custom-500 mt-2'>
          {error}
        </div>
      ) : null}
    </>
  );
}
