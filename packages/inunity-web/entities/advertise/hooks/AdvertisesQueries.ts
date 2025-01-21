import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import Page from "@/shared/types/Page";
import AdvertiseDto from "../model/AdvertiseDto";

export default class AdvertisesQueries {
  /**
   * QueryKey를 계층적으로 관리합니다.
   */
  private static readonly QueryKeys = {
    all: ["advertises"] as const,
    lists: () => [...this.QueryKeys.all, "list"] as const,
    list: () => [...this.QueryKeys.lists()] as const,
    details: () => [...this.QueryKeys.all, "detail"] as const,
    detail: (id: number) => [...this.QueryKeys.details(), id] as const,
    infiniteList: () => [...this.QueryKeys.lists(), "infinite"] as const,
  } as const;

  /**
   * 개별 배너 상세 조회 (단일)
   */
  static singleAdvertiseQuery(id: number) {
    return queryOptions<AdvertiseDto>({
      queryKey: this.QueryKeys.detail(id),
      queryFn: async () => {
        return await fetchExtended<AdvertiseDto>(`v1/advertises/${id}`);
      },
    });
  }

  /**
   * 배너 리스트 조회 (무한 스크롤)
   *  - 배너가 많지 않다면 무한 스크롤이 아니라 pageSize=전체 로 한번에 불러오는 경우도 가능
   */
  static infiniteAdvertisesQuery() {
    return infiniteQueryOptions({
      queryKey: this.QueryKeys.infiniteList(),
      queryFn: async ({ pageParam = 0 }) => {
        return await fetchExtended<Page<AdvertiseDto>>(`v1/advertises`, {
          query: {
            page: pageParam,
            size: 10,
          },
        });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }

  /**
   * 배너 리스트 조회 (단일 Query)
   *  - 페이징 없이 한 번에 가져오는 예시.
   */
  static advertisesQuery() {
    return queryOptions<Page<AdvertiseDto>>({
      queryKey: this.QueryKeys.list(),
      queryFn: async () => {
        return await fetchExtended<Page<AdvertiseDto>>(`v1/advertises`);
      },
    });
  }

  /**
   * Query Invalidation 등에 활용할 키 모음
   */
  static getInvalidationKeys(id?: number) {
    return {
      all: this.QueryKeys.all,
      lists: this.QueryKeys.lists(),
      details: id ? this.QueryKeys.detail(id) : this.QueryKeys.details(),
      infiniteList: this.QueryKeys.infiniteList(),
    };
  }
}
