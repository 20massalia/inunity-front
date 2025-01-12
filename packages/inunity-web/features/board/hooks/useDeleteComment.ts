import fetchExtended from "@/lib/fetchExtended";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteComment() {
  return useMutation({
    mutationFn: async (commentId: number) => {
      await fetchExtended(`v1/comment/${commentId}`, { method: "DELETE" });
    },
  });
}
