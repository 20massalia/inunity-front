import { useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";
import ArticleQueries from "./ArticleQueries";

export default function useArticle(id: string) {
  const queryOptions = ArticleQueries.singleArticleQuery(id)
  return useQuery(queryOptions);
}