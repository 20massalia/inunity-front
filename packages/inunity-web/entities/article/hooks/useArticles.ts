import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";
import { generateMockArticleThumbnails } from "../model/ArticleMock";
import ArticleQueries from "./ArticleQueries";

export default function useArticles() {
  const queryOptions = ArticleQueries.infiniteArticleQuery({categoryId: 0});
  const articles = useInfiniteQuery({...queryOptions,});
  return articles
}
