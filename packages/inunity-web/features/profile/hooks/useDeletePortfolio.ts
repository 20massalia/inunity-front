import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";

export default function useDeletePortfolio(userId: string) {
  return useMutation({
    mutationFn: async (portfolioId: number) => {
      return fetchExtended(
        `/v1/users/${userId}/profile/portfolio/${portfolioId}`,
        {
          method: "DELETE",
        }
      );
    },
  });
}
