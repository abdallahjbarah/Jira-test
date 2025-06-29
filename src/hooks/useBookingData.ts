import { useQueryClient } from '@tanstack/react-query';

const BOOKING_CACHE_TIME = 30 * 60 * 1000;

export const useBookingData = () => {
  const queryClient = useQueryClient();

  const getBookingData = (experienceId: string): any => {
    return queryClient.getQueryData(['bookingData', experienceId]);
  };

  const updateBookingData = (experienceId: string, data: any) => {
    const updatedData = {
      ...getBookingData(experienceId),
      ...data,
    };

    queryClient.setQueryData(['bookingData', experienceId], updatedData);

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

    queryClient.setQueryDefaults(['bookingData', experienceId], {
      gcTime: BOOKING_CACHE_TIME,
      staleTime: BOOKING_CACHE_TIME,
    });
  };

  const clearBookingData = (experienceId: string) => {
    queryClient.removeQueries({ queryKey: ['bookingData', experienceId] });
  };

  return {
    getBookingData,
    updateBookingData,
    setBookingData,
    clearBookingData,
  };
};
