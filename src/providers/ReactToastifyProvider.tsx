'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';

interface ReactToastifyProviderProps {
  children: React.ReactNode;
}

export default function ReactToastifyProvider({
  children,
}: ReactToastifyProviderProps): React.ReactElement {
  return (
    <>
      {children}
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}
