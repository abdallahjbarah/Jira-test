"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@components/layout/Loader';
// import useUser from '@hooks/useUser';

const CustomAuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const { userData } = useUser();


  return <>{loading ? <Loader /> : children}</>;
};

export default CustomAuthProvider;
