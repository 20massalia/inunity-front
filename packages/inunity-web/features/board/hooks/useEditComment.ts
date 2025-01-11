import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";
import { CommentPayload } from "message-type/message-type";

export default function useEditComment() {
  const { messageManager } = useMessageManager();
  return useMutation({
    mutationFn: async (payload: CommentPayload & { articleId: number }) => {
      messageManager?.log('[useEditComment] submitting: ', JSON.stringify(payload))
      await fetchExtended(`v1/articles/${payload.articleId}/comment`, {
        method: "PUT",
        body: {
          isAnonymous: payload.isAnonymous,
          content: payload.text,
        },
      });
    },
  });
}
