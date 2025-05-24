import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index'; // Assuming api is setup for potential future API calls
import { AvailabilityStaySlot } from '@/lib/types';

interface AvailabilitiesStaySlotsResponse {
    data: AvailabilityStaySlot;
}

interface FetchAvailabilityStaySlotsParams {
    siteId: string;
    startDateTime?: number;
    endDateTime?: number;
}

const fetchAvailabilityStaySlots = async ({
    siteId,
    startDateTime,
    endDateTime,
}: FetchAvailabilityStaySlotsParams): Promise<AvailabilitiesStaySlotsResponse> => {
    const url = `/sites/${siteId}/-selected-stay-availabilities?startDateTime=${startDateTime ? `${startDateTime}` : ''}&endDateTime=${endDateTime ? `${endDateTime}` : ''}`;
    const response = await api
        .url(url)
        .get()
        .json<AvailabilityStaySlot>();
    return { data: response };
};

export const useFetchAvailabilityStaySlots = (
    params: FetchAvailabilityStaySlotsParams,
    queryOptions?: Omit<UseQueryOptions<
        AvailabilitiesStaySlotsResponse,
        Error,
        AvailabilitiesStaySlotsResponse,
        readonly ['availabilityStaySlots', string, number | undefined, number | undefined]
    >, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
    return useQuery({
        ...queryOptions,
        queryKey: ['availabilityStaySlots', params.siteId, params.startDateTime, params.endDateTime] as const,
        queryFn: () => fetchAvailabilityStaySlots(params),
        enabled: !!params.siteId,
    });
};
