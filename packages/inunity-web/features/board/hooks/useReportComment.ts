import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useReportComment() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (commentId: number) => {
    messageManager?.log('reporting comment: ', commentId)
  }})
}
