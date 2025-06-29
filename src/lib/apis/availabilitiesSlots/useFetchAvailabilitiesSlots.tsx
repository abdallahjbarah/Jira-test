import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index';
import { AvailabilitySlot } from '@/lib/types';

interface AvailabilitiesSlotsResponse {
  data: AvailabilitySlot[];
}

interface FetchAvailabilitySlotsParams {
  siteId: string;
  startDateTime?: number;
  endDateTime?: number;
}

const fetchAvailabilitySlots = async ({
  siteId,
  startDateTime,
  endDateTime,
}: FetchAvailabilitySlotsParams): Promise<AvailabilitiesSlotsResponse> => {
  const url = `/sites/${siteId}/availabilities?startDateTime=${startDateTime ? `${startDateTime}` : ''}&endDateTime=${endDateTime ? `${endDateTime}` : ''}`;
  const response = await api.url(url).get().json<AvailabilitySlot[]>();
  return { data: response };
};

export const useFetchAvailabilitySlots = (
  params: FetchAvailabilitySlotsParams,
  queryOptions?: Omit<
    UseQueryOptions<
      AvailabilitiesSlotsResponse,
      Error,
      AvailabilitiesSlotsResponse,
      readonly [
        'availabilitySlots',
        string,
        number | undefined,
        number | undefined,
      ]
    >,
    'queryKey' | 'queryFn' | 'enabled'
  >,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: [
      'availabilitySlots',
      params.siteId,
      params.startDateTime,
      params.endDateTime,
    ] as const,
    queryFn: () => fetchAvailabilitySlots(params),
    enabled: !!params.siteId,
  });
};
