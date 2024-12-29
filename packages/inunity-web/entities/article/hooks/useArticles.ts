import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";
import { generateMockArticleThumbnails } from "../model/ArticleMock";
import ArticleQueries from "./ArticleQueries";

export default function useArticles() {
  const queryOptions = ArticleQueries.infiniteArticleQuery();
  const articles = useInfiniteQuery({...queryOptions,});
  return articles
}
