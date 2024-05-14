"use client"

import { createContext, useContext, useState } from "react";

const PublicContext = createContext();

export const usePublicContext = () => {
  return useContext(PublicContext);
};

export default function ReactPublicContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState();

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
