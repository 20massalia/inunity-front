import { useInfiniteQuery } from "@tanstack/react-query";
import ArticleQueries from "./ArticleQueries";

export default function useWrittenArticles() {
  return useInfiniteQuery(ArticleQueries.infiniteWrittenArticleQuery());
}