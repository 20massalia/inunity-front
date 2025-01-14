import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import PortfolioDto from "@/entities/profile/model/PortfolioDto";

export default function usePostPortfolio(userId: number) {
  return useMutation({
    mutationFn: async (portfolio: Omit<PortfolioDto, "portfolioId">) => {
      return fetchExtended(`/v1/users/${userId}/profile/portfolio`, {
        method: "POST",
        body: portfolio,
      });
    },
  });
}
