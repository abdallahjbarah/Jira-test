'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@components/layout/Loader';
// import useUser from '@hooks/useUser';

interface CustomAuthProviderProps {
  children: React.ReactNode;
}

const CustomAuthProvider = ({
  children,
}: CustomAuthProviderProps): React.ReactElement => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const { userData } = useUser();

  return <>{loading ? <Loader style='' /> : children}</>;
};

export default CustomAuthProvider;
