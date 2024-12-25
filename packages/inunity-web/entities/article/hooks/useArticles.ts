import { useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";

export default function useArticles() {
  return useQuery<ArticleDto[]>({
    queryKey: ["articles"],
    queryFn: () => [
      {
        title: "this is title",
        author: "author",
        avatarUrl: "https://github.com/KimWash.png",
        authorOrg: "CS",
        content: "this is test article",
        date: "2023-08-15",
        likes: 12,
        bookmarks: 5,
        articleId: "2",
        isLiked: false,
        isBookmarked: false,
      },
    ],
  });
}
