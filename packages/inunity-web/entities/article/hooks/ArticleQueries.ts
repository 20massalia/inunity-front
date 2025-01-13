import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import ResponseArticle from "../model/ResponseAritcle";
import Page from "@/shared/types/Page";
import ResponseArticleThumbnail from "../model/ResponseArticleThumbnail";
import fetchExtended from "@/lib/fetchExtended";

export enum SortType {
  Date = "date",
  Like = "like",
  View = "view",
}

export enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}

export interface ArticleFilter {
  categoryId?: number;
  keyword?: string;
  tags?: string[];
  sort?: [SortType, SortDirection];
}

export default class ArticleQueries {
  // Define query key factory with hierarchical structure
  private static readonly QueryKeys = {
    all: ["articles"] as const,
    lists: () => [...this.QueryKeys.all, "list"] as const,
    list: (filter?: ArticleFilter) => {
      const { categoryId, keyword, tags, sort } = filter ?? {};
      return [
        ...this.QueryKeys.lists(),
        { categoryId, keyword, tags, sort },
      ] as const;
    },
    details: () => [...this.QueryKeys.all, "detail"] as const,
    detail: (id: number) => [...this.QueryKeys.details(), id] as const,
    featured: () => [...this.QueryKeys.lists(), "featured"] as const,
  } as const;

  static singleArticleQuery(id: number) {
    return queryOptions<ResponseArticle>({
      queryKey: this.QueryKeys.detail(id),
      queryFn: async () => {
        return await fetchExtended<ResponseArticle>(`v1/articles/${id}`);
      },
    });
  }

  static featuredArticleQuery() {
    return infiniteQueryOptions({
      queryKey: this.QueryKeys.featured(),
      queryFn: async ({ pageParam }) => {
        return await fetchExtended<Page<ResponseArticleThumbnail>>(
          `v1/popular/articles`,
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
    });
  }

  static infiniteArticleQuery(filter?: ArticleFilter) {
    return infiniteQueryOptions({
      queryKey: this.QueryKeys.list(filter),
      queryFn: async ({ pageParam, queryKey: [_, __, filter] }) => {
        const { categoryId } = filter ?? {};
        return await fetchExtended<Page<ResponseArticleThumbnail>>(
          `v1/categories/${categoryId}/articles`,
          {
            query: { page: pageParam.toString(), size: "20" },
            next: { revalidate: 3600 },
          }
        );
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }

  static infiniteArticleSearchQuery(filter?: ArticleFilter) {
    return infiniteQueryOptions({
      queryKey: this.QueryKeys.list(filter),
      queryFn: async ({ pageParam, queryKey: [_, __, filter] }) => {
        const { categoryId, keyword, tags } = filter ?? {};
        return await fetchExtended<Page<ResponseArticleThumbnail>>(
          `v1/categories/${categoryId}/articles`,
          {
            query: {
              page: pageParam.toString(),
              size: "20",
              categoryId: categoryId?.toString(),
              keyword,
            },
            next: { revalidate: 3600 },
          }
        );
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }

  // Utility method to get query keys for invalidation
  static getInvalidationKeys(id?: number) {
    return {
      all: this.QueryKeys.all,
      lists: this.QueryKeys.lists(),
      details: id ? this.QueryKeys.detail(id) : this.QueryKeys.details(),
      featured: this.QueryKeys.featured(),
    };
  }
}
