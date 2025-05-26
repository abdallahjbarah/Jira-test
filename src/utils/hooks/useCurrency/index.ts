/**
 * Custom to get the current currency from the user if the user is logged in
 * else return the default currency
 */

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
