'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@components/layout/Loader';

interface CustomAuthProviderProps {
  children: React.ReactNode;
}

const CustomAuthProvider = ({
  children,
}: CustomAuthProviderProps): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  // const { userData } = useUser();

  return <>{loading ? <Loader style='' /> : children}</>;
};

export default CustomAuthProvider;
