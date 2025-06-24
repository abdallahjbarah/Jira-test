'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeFirebase } from '@/lib/firebase/config';

interface FirebaseContextType {
  isInitialized: boolean;
  error: string | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  isInitialized: false,
  error: null,
});

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        await initializeFirebase();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Firebase:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to initialize Firebase',
        );
        setIsInitialized(false);
      }
    };

    initFirebase();
  }, []);

  const value = {
    isInitialized,
    error,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
