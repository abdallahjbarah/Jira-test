'use client';

import React, { createContext, useContext, useState } from 'react';

interface PublicContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ReactPublicContextProviderProps {
  children: React.ReactNode;
}

const PublicContext = createContext<PublicContextType | undefined>(undefined);

export const usePublicContext = (): PublicContextType => {
  const context = useContext(PublicContext);
  if (!context) {
    throw new Error(
      'usePublicContext must be used within a ReactPublicContextProvider',
    );
  }
  return context;
};

export default function ReactPublicContextProvider({
  children,
}: ReactPublicContextProviderProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PublicContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
}
