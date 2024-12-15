import usePosts from "@/entities/post/hooks/usePosts";

export default function usePostSearchViewModel({
  categoryId,
  keyword,
  tags,
}: {
  categoryId: string;
  keyword: string;
  tags: string[];
}) {
  const posts = usePosts();
  return { posts };
}
