import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useReportArticle() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (articleId: number) => {
    messageManager?.log('reporting article: ', articleId)
  }})
}
