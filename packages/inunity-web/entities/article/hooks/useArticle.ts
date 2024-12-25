import { useQuery } from "@tanstack/react-query";
import ArticleDto from "../model/ArticleDto";

export default function useArticle() {
  return useQuery<ArticleDto>({ queryKey: ['article'], });

}