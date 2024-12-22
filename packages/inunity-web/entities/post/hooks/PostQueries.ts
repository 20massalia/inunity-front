import {
  InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";
import PostDto from "../model/PostDto";
import Page from "@/shared/types/Page";

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
        const pageConverted = {
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
        return pageConverted;
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
