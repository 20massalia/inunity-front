import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import ResponseArticle from "@/entities/article/model/ResponseAritcle";
import ResponseComment from "@/entities/comment/model/ResponseComment";
import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentPayload } from "message-type/message-type";

export default function useSubmitComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CommentPayload & { articleId: number }) => {
      const query = queryClient.getQueryData<ResponseArticle>(
        ArticleQueries.getInvalidationKeys(payload.articleId).details
      );

      const optimisticComments = [
        ...(query?.comments ?? []),
        {
          content: payload.text,
          isAnonymous: payload.isAnonymous,
          nickname: payload.isAnonymous ? "익명" : "// Todo: 사용자 닉네임",
          department: "// Todo: 사용자 소속",
          isOwner: true,
          createAt: new Date(),
        } as ResponseComment,
      ];

      await queryClient.setQueryData(
        ArticleQueries.getInvalidationKeys(payload.articleId).details,
        { ...query, comments: optimisticComments }
      );
      try {
        await fetchExtended(`v1/articles/${payload.articleId}/comment`, {
          method: "POST",
          body: {
            isAnonymous: payload.isAnonymous,
            content: payload.text,
          },
        });
      } catch (e) {
        queryClient.invalidateQueries();
        throw e;
      }
    },
  });
}
