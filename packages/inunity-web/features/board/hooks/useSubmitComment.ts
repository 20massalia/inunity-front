import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";
import { CommentPayload } from "message-type/message-type";

export default function useSubmitComment() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (payload: CommentPayload) => {
    messageManager?.log('submitting comment: ', payload.text)
  }})
}
