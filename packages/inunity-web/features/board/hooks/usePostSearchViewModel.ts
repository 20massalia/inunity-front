import PostQueries, { createPage } from "@/entities/post/hooks/PostQueries";
import usePosts from "@/entities/post/hooks/usePosts";
import PostDto from "@/entities/post/model/PostDto";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function usePostSearchViewModel({
  categoryId,
  keyword,
  tags,
}: {
  categoryId: string;
  keyword: string;
  tags: string[];
}) {
  const queryOptions = PostQueries.infinitePostQuery({categoryId, keyword, tags,});
  const posts = useInfiniteQuery({...queryOptions,});
  return { posts };
}
