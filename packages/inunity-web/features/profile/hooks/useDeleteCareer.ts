import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";

export default function useDeleteCareer(userId: string) {
  return useMutation({
    mutationFn: async (careerId: number) => {
      return fetchExtended(`/v1/users/${userId}/profile/career/${careerId}`, {
        method: "DELETE",
      });
    },
  });
}
