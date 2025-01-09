import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteArticle() {
  const { messageManager } = useMessageManager();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (articleId: number) => {
      messageManager?.log("deleting article: ", articleId);
      await fetchExtended(`v1/articles/${articleId}`, {
        method: "DELETE",
        next: { revalidate: 0 },
      });
      await queryClient.invalidateQueries({queryKey: ArticleQueries.getInvalidationKeys().all});
    },
  });
}
