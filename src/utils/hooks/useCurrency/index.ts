import { useEffect, useState } from 'react';
import useUser from '../useUser';

const useCurrency = () => {
  const { userData } = useUser();
  const [currency, setCurrency] = useState(userData?.user?.currency || 'JOD');

  useEffect(() => {
    if (userData?.user?.currency) {
      setCurrency(userData?.user?.currency);
    }
  }, [userData]);

  return { currency };
};

export default useCurrency;
