import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";
import { CommentPayload } from "message-type/message-type";

export default function useSubmitComment() {
  return useMutation({
    mutationFn: async (payload: CommentPayload & { articleId: number }) => {
      await fetchExtended(`v1/articles/${payload.articleId}/comment`, {
        method: "POST",
        body: {
          isAnonymous: payload.isAnonymous,
          content: payload.text
        },
      });
    },
  });
}
