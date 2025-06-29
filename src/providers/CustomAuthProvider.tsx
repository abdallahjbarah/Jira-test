'use client';

import React, { useState } from 'react';
import Loader from '@components/layout/Loader';

interface CustomAuthProviderProps {
  children: React.ReactNode;
}

const CustomAuthProvider = ({
  children,
}: CustomAuthProviderProps): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);

  return <>{loading ? <Loader style='' /> : children}</>;
};

export default CustomAuthProvider;
