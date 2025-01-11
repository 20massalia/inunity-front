import fetchExtended from "@/lib/fetchExtended";
import { useMutation } from "@tanstack/react-query";

export interface EditArticleRequest {
  articleId: number;
  title: string;
  content: string;
  isAnonymous: boolean;
}

export default function useEditArticle() {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      isAnonymous,
      articleId,
    }: EditArticleRequest) => {
      console.log('submitting article')
      await fetchExtended(`v1/articles/${articleId}`, {
        body: { title, content, isAnonymous },
        method: 'PUT',
      });
    },
  });
}
