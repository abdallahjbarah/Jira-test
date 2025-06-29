import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { WretchError } from 'wretch';

interface BookingFormData {
  siteId: string;
  availabilityId: string[] | string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  hasGuide: boolean;
  hasTransportation: boolean;
  hasAirport: boolean;
  attachment: string;
  paymentMethod: string;
}

const postBooking = async (data: BookingFormData) => {
  const url = Array.isArray(data.availabilityId) ? '/booking/stay' : '/booking';
  const response = await api.url(url).post(data).json();
  return response;
};

const useMutateBooking = (
  mutateOptions: UseMutationOptions<any, WretchError, BookingFormData, unknown>,
) => {
  return useMutation({
    mutationFn: (data: BookingFormData) => postBooking(data),
    ...mutateOptions,
  });
};

export default useMutateBooking;
