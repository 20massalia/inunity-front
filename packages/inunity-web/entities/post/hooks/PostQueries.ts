import {
  InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";
import PostDto from "../model/PostDto";

export enum SortType {
  Date = "date",
  Like = "like",
  View = "view",
}

export enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}

export interface PostFilter {
  categoryId?: string;
  keyword?: string;
  tags?: string[];
  sort?: [SortType, SortDirection];
}

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
  content: T[]; // 현재 페이지의 데이터 리스트
  pageable: Pageable; // 페이징 정보
  totalPages: number; // 총 페이지 수
  totalElements: number; // 총 데이터 수
  last: boolean; // 마지막 페이지 여부
  size: number; // 한 페이지당 데이터 수
  number: number; // 현재 페이지 번호 (0부터 시작)
  sort: Sort; // 정렬 정보
  first: boolean; // 첫 페이지 여부
  numberOfElements: number; // 현재 페이지에 있는 데이터 수
  empty: boolean; // 현재 페이지가 비어있는지 여부
}

const dummyData = {
  title: "this is title",
  author: "author",
  avatarUrl: "https://github.com/KimWash.png",
  authorOrg: "CS",
  content: "this is test post",
  date: "2023-08-15",
  likes: 12,
  bookmarks: 5,
  postId: "2",
  isLiked: false,
  isBookmarked: false,
};

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

export default class PostQueries {
  static readonly Keys = {
    root: ["post"] as const,
    byId: (id: string) => ["post", id],
    infinite: (
      categoryId?: string,
      keyword?: string,
      tags?: string[],
      sort: [SortType, SortDirection] = [
        SortType.Date,
        SortDirection.Descending,
      ]
    ) => ["posts", categoryId, keyword, tags, sort],
  };

  static singlePostQuery(id: string) {
    const queryKey = this.Keys.byId(id);
    return queryOptions<PostDto>({
      queryKey,
      queryFn: async ({ queryKey: [_, id] }) => {
        return dummyData;
      },
    });
  }

  static infinitePostQuery(filter?: PostFilter) {
    const { categoryId, keyword, tags, sort } = filter ?? {};
    const queryKey = this.Keys.infinite(categoryId, keyword, tags, sort);

    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam, queryKey }) => {
        const [_, categoryId, keyword, tags, sort] = queryKey;
        console.log('fetching next page...', pageParam)
        const page = (await (
          await fetch("http://localhost:8082/notices/v1/university?page=" + pageParam )
        ).json()) as Page<{
          id: number;
          title: string;
          departmentName: string;
          contentSummary: string;
          likes: number;
          bookmarks: number;
          isLiked: boolean;
          isBookmarked: boolean;
          date: Date;
        }>;
        const realpage = {
          ...page,
          content: page.content.map(
            (content) =>
              ({
                ...content,
                postId: content.id.toString(),
                date: new Date(content.date).toDateString(),
                author: content.departmentName,
                authorOrg: "",
                content: content.contentSummary,
              } as PostDto)
          ),
        };
        console.log(realpage);
        return realpage
        // return createPage([dummyData]);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage, pages) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }
}
