import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";
import ArticleQueries, { ArticleFilter } from "./ArticleQueries";

export default function useArticles(filter: ArticleFilter) {
  const queryOptions = ArticleQueries.infiniteArticleQuery(filter);
  const articles = useInfiniteQuery({...queryOptions,});
  return articles
}
