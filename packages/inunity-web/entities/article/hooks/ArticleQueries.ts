import {
  InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";
import Page from "@/shared/types/Page";
import { generateMockArticle, generateMockArticleThumbnails } from "../model/ArticleMock";
import ResponseArticle from "../model/ResponseAritcle";
import { createPage } from "@/shared/utils/createPage";

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
  categoryId?: string;
  keyword?: string;
  tags?: string[];
  sort?: [SortType, SortDirection];
}






export default class ArticleQueries {
  static readonly Keys = {
    root: ["article"] as const,
    byId: (id: string) => ["article", id],
    infinite: (
      categoryId?: string,
      keyword?: string,
      tags?: string[],
      sort: [SortType, SortDirection] = [
        SortType.Date,
        SortDirection.Descending,
      ]
    ) => ["articles", categoryId, keyword, tags, sort],
    featured: ['featuredArticle',]
  };

  static singleArticleQuery(id: string) {
    const queryKey = this.Keys.byId(id);
    return queryOptions<ResponseArticle>({
      queryKey,
      queryFn: async ({ queryKey: [_, id] }) => {
        return generateMockArticle();
      },
    });
  }

  static featuredArticleQuery(length: number) {
    const queryKey = this.Keys.featured;
    return queryOptions({
      queryKey,
      queryFn: async () => {
        return generateMockArticleThumbnails(length)
      }
    })
  }

  static infiniteArticleQuery(filter?: ArticleFilter) {
    const { categoryId, keyword, tags, sort } = filter ?? {};
    const queryKey = this.Keys.infinite(categoryId, keyword, tags, sort);

    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam, queryKey }) => {
        const [_, categoryId, keyword, tags, sort] = queryKey;
        console.log('fetching next page...', pageParam)
        return createPage(generateMockArticleThumbnails(20));
        // const page = (await (
        //   await fetch("http://localhost:8082/notices/v1/university?page=" + pageParam )
        // ).json()) as Page<{
        //   id: number;
        //   title: string;
        //   departmentName: string;
        //   contentSummary: string;
        //   likes: number;
        //   bookmarks: number;
        //   isLiked: boolean;
        //   isBookmarked: boolean;
        //   date: Date;
        // }>;
        // const pageConverted = {
        //   ...page,
        //   content: page.content.map(
        //     (content) =>
        //       ({
        //         ...content,
        //         articleId: content.id.toString(),
        //         date: new Date(content.date).toDateString(),
        //         author: content.departmentName,
        //         authorOrg: "",
        //         content: content.contentSummary,
        //       } as ArticleDto)
        //   ),
        // };
        // return pageConverted;
        // // return createPage([dummyData]);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPage.last ? undefined : lastPage.number + 1,
      getPreviousPageParam: (firstPage, pages) =>
        firstPage.first ? undefined : firstPage.number,
    });
  }
}
