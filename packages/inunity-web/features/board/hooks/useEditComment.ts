import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useEditComment() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (articleId: string) => {
    messageManager?.log('editing comment: ', articleId)
  }})
}
