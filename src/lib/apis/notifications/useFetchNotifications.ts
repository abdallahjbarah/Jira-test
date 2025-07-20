import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Notification } from '@/lib/types';

export interface FetchNotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

const fetchNotifications = async (
  userId: string,
  filter?: {
    page: number;
    limit: number;
  }
): Promise<FetchNotificationsResponse> => {
  const response = await api
    .url(`/notification/list/${userId}`)
    .query(filter || {})
    .get()
    .json();
  return response as FetchNotificationsResponse;
};

export const useFetchNotifications = (
  userId: string,
  filter?: {
    page: number;
    limit: number;
  },
  queryOptions?: UseQueryOptions<FetchNotificationsResponse, Error>
) =>
  useQuery({
    queryKey: ['notifications', userId, filter],
    queryFn: () => fetchNotifications(userId, filter),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });

export const useFetchInfiniteNotifications = (
  userId: string,
  filter?: {
    limit: number;
  },
  queryOptions?: UseInfiniteQueryOptions<any, Error>
) =>
  useInfiniteQuery({
    queryKey: ['notifications', userId, filter],
    queryFn: async ({ pageParam = 1 }) =>
      fetchNotifications(userId, {
        page: Number(pageParam),
        limit: filter?.limit || 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const limit = filter?.limit || 10;
      return lastPage.notifications.length >= limit
        ? pages.length + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    enabled: !!userId,
    ...queryOptions,
  });
