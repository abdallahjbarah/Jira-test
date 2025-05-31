//get /api/amenities

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Amenity } from '@/lib/types';

export const fetchAmenities = async (): Promise<Amenity[]> => {
  const response = await api.url('/amenities').get().json();
  return response as Amenity[];
};

export const useFetchAmenities = (
  queryOptions?: UseQueryOptions<Amenity[], Error>,
) => {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: fetchAmenities,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
