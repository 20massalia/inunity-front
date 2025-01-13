import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import PortfolioDto from "@/entities/profile/model/PortfolioDto";

export default function useEditPortfolio(userId: string) {
  return useMutation({
    mutationFn: async (portfolio: PortfolioDto) => {
      return fetchExtended(`/v1/users/${userId}/profile/portfolio`, {
        method: "PUT",
        body: portfolio,
      });
    },
  });
}
