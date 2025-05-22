import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useBookingData = () => {
  const queryClient = useQueryClient();

  // Get the booking data
  const getBookingData = () => {
    return queryClient.getQueryData(['bookingData']);
  };

  // Clear booking data when component unmounts
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['bookingData'] });
    };
  }, [queryClient]);

  return {
    bookingData: getBookingData(),
  };
}; 