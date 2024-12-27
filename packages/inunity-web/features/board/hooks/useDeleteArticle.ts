import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteArticle() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (articleId: string) => {
    messageManager?.log('deleting article: ', articleId)
  }});
}
