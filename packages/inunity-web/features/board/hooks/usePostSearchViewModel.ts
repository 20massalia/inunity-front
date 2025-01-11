import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import useArticles from "@/entities/article/hooks/useArticles";
import ArticleDto from "@/entities/article/model/ArticleDto";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function useArticleSearchViewModel({
  categoryId,
  keyword,
  tags,
}: {
  categoryId:number;
  keyword: string;
  tags: string[];
}) {
  const queryOptions = ArticleQueries.infiniteArticleQuery({categoryId, keyword, tags,});
  const articles = useInfiniteQuery({...queryOptions,});
  return { articles };
}
