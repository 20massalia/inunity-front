import fetchExtended from "@/lib/fetchExtended";
import { useMutation } from "@tanstack/react-query";

export interface SubmitArticleRequest {
  categoryId: number;
  title: string;
  content: string;
  isAnonymous: boolean;
}

export default function useSubmitArticle() {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      isAnonymous,
      categoryId,
    }: SubmitArticleRequest) => {
      await fetchExtended(`v1/articles/${categoryId}`, {
        body: { title, content, isAnonymous },
        method: 'POST',
      });
    },
  });
}
