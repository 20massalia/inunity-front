import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import ResponseArticle from "@/entities/article/model/ResponseAritcle";
import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteComment() {
  const queryClient = useQueryClient();
  const { messageManager } = useMessageManager();
  return useMutation({
    mutationFn: async ({
      articleId,
      commentId,
    }: {
      articleId: number;
      commentId: number;
    }) => {
      await fetchExtended(`v1/comment/${commentId}`, { method: "DELETE" });
    },
    onMutate: async ({
      articleId,
      commentId,
    }: {
      articleId: number;
      commentId: number;
    }) => {
      messageManager?.log("[useDeleteComment] deleting: ");
      const query = queryClient.getQueryData<ResponseArticle>(
        ArticleQueries.getInvalidationKeys(articleId).details
      );

      const optimisticComments = query?.comments.map((comment) =>
        comment.commentId == commentId
          ? {
              commentId,
              userId: null,
              isAnonymous: null,
              department: null,
              nickname: null,
              userImageUrl: null,
              content: "[삭제된 댓글입니다.]",
              isOwner: false,
              createAt: null,
              replyComments: [],
            }
          : comment
      );
      await queryClient.setQueryData(
        ArticleQueries.getInvalidationKeys(articleId).details,
        { ...query, comments: optimisticComments }
      );
    },
  });
}
