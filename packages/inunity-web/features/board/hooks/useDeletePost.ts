import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
  const {messageManager} = useMessageManager();
  return useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('deleting post: ', postId)
  }});
}
