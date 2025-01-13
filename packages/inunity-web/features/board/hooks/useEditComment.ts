import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import ResponseArticle from "@/entities/article/model/ResponseAritcle";
import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentPayload } from "message-type/message-type";

export default function useEditComment() {
  const { messageManager } = useMessageManager();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CommentPayload & { articleId: number }) => {
      try {
        await fetchExtended(`v1/articles/comment`, {
          method: "PUT",
          body: {
            isAnonymous: payload.isAnonymous,
            content: payload.text,
            commentId: payload.commentId
          },
        });
      } catch (e) {
        queryClient.invalidateQueries();
        throw e;
      }
    },
    onMutate: async (payload: CommentPayload & { articleId: number }) => {
      messageManager?.log(
        "[useEditComment] submitting: ",
        JSON.stringify(payload)
      );
      const query = queryClient.getQueryData<ResponseArticle>(
        ArticleQueries.getInvalidationKeys(payload.articleId).details
      );

      const optimisticComments = query?.comments.map((comment) =>
        comment.commentId === payload.commentId
          ? {
              ...comment,
              content: payload.text,
              commentId: payload.commentId,
              isAnonymous: payload.isAnonymous,
              nickname: payload.isAnonymous ? "익명" : comment.nickname,
            }
          : comment
      );
      await queryClient.setQueryData(
        ArticleQueries.getInvalidationKeys(payload.articleId).details,
        { ...query, comments: optimisticComments }
      );
    }
  });
}
