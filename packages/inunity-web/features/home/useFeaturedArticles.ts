'use client';

import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFeaturedArticles( ) {
  const queryOptions = ArticleQueries.featuredArticleQuery();
  return useInfiniteQuery(queryOptions);
}