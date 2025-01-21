import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";
import { ResponseNotification } from "@/features/notification/ui/NotificationItem";
import fetchExtended from "@/lib/fetchExtended";
import Page from "@/shared/types/Page";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

const QueryKeys = {
  list: ["notifications"],
} as const;

export const NotificationQueryOptions = infiniteQueryOptions({
  queryKey: QueryKeys.list,
  queryFn: async ({ pageParam }) => {
    return await fetchExtended<Page<ResponseNotification>>(
      `v1/notification`,
      {
        query: { page: pageParam, size: 10 },
      }
    );
  },
  initialPageParam: 0,
  getNextPageParam: (lastPage) =>
    lastPage.last ? undefined : lastPage.number + 1,
  getPreviousPageParam: (firstPage) =>
    firstPage.first ? undefined : firstPage.number,
})


export default function useServerNotification() {
  return useInfiniteQuery(NotificationQueryOptions);
}
