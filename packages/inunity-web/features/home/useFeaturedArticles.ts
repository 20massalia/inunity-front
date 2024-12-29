'use client';

import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import { useQuery } from "@tanstack/react-query";

export default function useFeaturedArticles(size: number ) {
  const queryOptions = ArticleQueries.featuredArticleQuery(size);
  return useQuery(queryOptions);
}