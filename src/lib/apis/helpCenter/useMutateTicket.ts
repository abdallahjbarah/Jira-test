import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Ticket } from '@/lib/types';

interface CreateTicketPayload {
  subject: string;
  message: string;
  attachment: string;
}

const createTicket = async (data: CreateTicketPayload) => {
  const response = await api.url('/help-center').post(data).json();
  return response as Ticket;
};

export const useCreateTicket = (
  options?: UseMutationOptions<Ticket, Error, CreateTicketPayload>
) => {
  return useMutation({
    mutationFn: createTicket,
    ...options,
  });
};
