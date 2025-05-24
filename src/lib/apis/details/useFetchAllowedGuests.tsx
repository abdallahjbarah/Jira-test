import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index'; // Assuming api is setup for potential future API calls
import { Site, SiteByIdResponse } from '@/lib/types';

interface AllowedGuestsParams {
  siteId: string;
  adults?: number;
  children?: number;
  infants?: number;
  availabilityIds?: string[];
}

export const fetchAllowedGuests = async ({
  siteId,
  adults,
  children,
  infants,
  availabilityIds,
}: AllowedGuestsParams): Promise<{ data: number }> => {
  const queryParams = new URLSearchParams();
  
  if (adults !== undefined) queryParams.append('adults', adults.toString());
  if (children !== undefined) queryParams.append('children', children.toString());
  if (infants !== undefined) queryParams.append('infants', infants.toString());
  if (availabilityIds?.length) {
    availabilityIds.forEach(id => queryParams.append('availabilityIds[]', id));
  }

  const queryString = queryParams.toString();
  const url = `/sites/allowed-guest/${siteId}${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.url(url).get().json<number>();
  return { data: response };
};

export const useFetchAllowedGuests = (
  params: AllowedGuestsParams,
  queryOptions?: Omit<UseQueryOptions<
    { data: number },
    Error,
    { data: number | undefined },
    readonly ['allowedGuests', string, AllowedGuestsParams]
  >, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
  return useQuery({
    queryKey: ['allowedGuests', params.siteId, params] as const,
    queryFn: () => fetchAllowedGuests(params),
    enabled: !!params.siteId && !!params.availabilityIds,
    ...queryOptions,
  });
};
