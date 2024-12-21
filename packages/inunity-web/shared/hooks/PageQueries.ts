import {
  InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";

// 정렬 정보를 나타내는 인터페이스
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이징 정보를 나타내는 인터페이스
interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

// JPA Page 객체를 나타내는 인터페이스
export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

/**
 * 리스트만으로 Page 객체를 생성하는 유틸리티 함수
 * @param content - 데이터 리스트
 * @param pageNumber - 현재 페이지 번호 (기본값 0)
 * @param pageSize - 한 페이지당 데이터 수 (기본값 10)
 * @returns Page 객체
 */
export function createPage<T>(
  content: T[],
  pageNumber: number = 0,
  pageSize: number = 10
): Page<T> {
  const totalElements = content.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const startIndex = pageNumber * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalElements);

  return {
    content: content.slice(startIndex, endIndex),
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: startIndex,
      pageSize,
      pageNumber,
      paged: true,
      unpaged: false,
    },
    totalPages,
    totalElements,
    last: pageNumber + 1 === totalPages,
    size: pageSize,
    number: pageNumber,
    sort: { empty: true, sorted: false, unsorted: true },
    first: pageNumber === 0,
    numberOfElements: endIndex - startIndex,
    empty: endIndex - startIndex === 0,
  };
}

export default abstract class PageQueries<T> {
  abstract domain: string;

  get keys() {
    return {
      root: [this.domain] as const,
      byId: (id: string) => [this.domain, id] as const,
      infinite: (params?: Record<string, unknown>) =>
        [this.domain, params] as const,
    };
  }

  protected abstract fetchSingleItem(id: string): Promise<T>;

  protected abstract fetchInfiniteItems(params: {
    page: number;
    [key: string]: unknown;
  }): Promise<Page<T>>;

  singleItemQuery(id: string) {
    const queryKey = this.keys.byId(id);
    return queryOptions<T>({
      queryKey,
      queryFn: async ({ queryKey: [_, id] }) =>
        this.fetchSingleItem(id as string),
    });
  }

  infiniteItemsQuery(params?: Record<string, unknown>) {
    const queryKey = this.keys.infinite(params);

    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam = 0 }) =>
        this.fetchInfiniteItems({ page: pageParam, ...params }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }
}
