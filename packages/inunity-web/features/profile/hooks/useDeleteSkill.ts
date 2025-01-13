import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";

export default function useDeleteSkill(userId: number) {
  return useMutation({
    mutationFn: async (skillId: number) => {
      return fetchExtended(`/v1/users/${userId}/profile/skill/${skillId}`, {
        method: "DELETE",
      });
    },
  });
}
