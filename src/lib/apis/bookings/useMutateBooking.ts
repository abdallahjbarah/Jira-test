/**
 * POST /booking
 * or /booking/stay
 */

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { WretchError } from 'wretch';

// for booking experience
// {
//   "siteId": "string",
//   "availabilityId": "string",
//   "paymentMethod": "string",
//   "guests": {
//     "adults": 0,
//     "children": 0,
//     "infants": 0
//   },
//   "hasGuide": true,
//   "hasTransportation": true,
//   "hasAirport": true,
//   "attachment": "string"
// }

// for booking/stay
// {
//   "availabilityId": [
//     "string"
//   ],
//   "siteId": "string",
//   "guests": {
//     "adults": 0,
//     "children": 0,
//     "infants": 0
//   },
//   "hasGuide": true,
//   "hasTransportation": true,
//   "hasAirport": true,
//   "attachment": "string",
//   "paymentMethod": "string"
// }

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
  // if availabilityId is an array, it's a booking/stay
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
