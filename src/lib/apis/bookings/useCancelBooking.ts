import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { WretchError } from 'wretch';

interface CancelBookingPayload {
  bookingID: string;
  cancelReasonID?: string | null;
  cancelReasonOther?: string;
}

const cancelBooking = async (
  data: CancelBookingPayload,
): Promise<CancelBookingPayload> => {
  const { bookingID, ...rest } = data;

  const response = await api.url(`/booking/${bookingID}/cancel-booking`).patch({
    ...rest,
  });
  return response.json();
};

export const useCancelBooking = (
  options?: UseMutationOptions<
    CancelBookingPayload,
    WretchError,
    CancelBookingPayload
  >,
) => {
  return useMutation({
    mutationFn: (data: CancelBookingPayload) => cancelBooking(data),
    ...options,
  });
};
