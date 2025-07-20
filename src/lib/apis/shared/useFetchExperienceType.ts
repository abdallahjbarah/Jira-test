import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { ExperienceType } from '@/lib/types';

export const fetchExperienceType = async (filter: {
  isStayType: boolean;
}): Promise<ExperienceType[]> => {
  const response = await api.url('/experience-type').query(filter).get().json();
  return response as ExperienceType[];
};

export const useFetchExperienceType = (
  filter: { isStayType: boolean },
  queryOptions?: UseQueryOptions<ExperienceType[], Error>
) => {
  return useQuery({
    queryKey: ['experience-type', filter],
    queryFn: () => fetchExperienceType(filter),
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
