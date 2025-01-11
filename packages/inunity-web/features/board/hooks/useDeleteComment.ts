import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteComment() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (commentId: number) => {
    messageManager?.log('deleting comment: ', commentId)
  }})
}
