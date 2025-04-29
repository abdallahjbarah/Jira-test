'use client';

import React from 'react';
import ErrorBoundary from '@components/layout/ErrorBoundary';

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}

export default function ErrorBoundaryProvider({
  children,
}: ErrorBoundaryProviderProps): React.ReactElement {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
