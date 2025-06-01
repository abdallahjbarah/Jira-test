import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const BOOKING_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

export const useBookingData = () => {
  const queryClient = useQueryClient();

  // Get the booking data
  const getBookingData = (experienceId: string): any => {
    return queryClient.getQueryData(['bookingData', experienceId]);
  };

  const updateBookingData = (experienceId: string, data: any) => {
    const updatedData = {
      ...getBookingData(experienceId),
      ...data,
    };

    queryClient.setQueryData(['bookingData', experienceId], updatedData);

    // Set specific cache options for booking data to prevent premature garbage collection
    queryClient.setQueryDefaults(['bookingData', experienceId], {
      gcTime: BOOKING_CACHE_TIME,
      staleTime: BOOKING_CACHE_TIME,
    });

    queryClient.invalidateQueries({
      queryKey: ['bookingData', experienceId],
    });
  };

  const setBookingData = (experienceId: string, data: any) => {
    queryClient.setQueryData(['bookingData', experienceId], data);

    // Set specific cache options for booking data to prevent premature garbage collection
    queryClient.setQueryDefaults(['bookingData', experienceId], {
      gcTime: BOOKING_CACHE_TIME,
      staleTime: BOOKING_CACHE_TIME,
    });
  };

  const clearBookingData = (experienceId: string) => {
    queryClient.removeQueries({ queryKey: ['bookingData', experienceId] });
  };

  // // Clear booking data when component unmounts
  // useEffect(() => {
  //   return () => {
  //     queryClient.removeQueries({ queryKey: ['bookingData'] });
  //   };
  // }, [queryClient]);

  return {
    getBookingData,
    updateBookingData,
    setBookingData,
    clearBookingData,
  };
};
