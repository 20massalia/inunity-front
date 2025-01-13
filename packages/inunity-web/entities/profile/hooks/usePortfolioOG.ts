import { useQuery } from "@tanstack/react-query";
import usePortfolio from "./usePortfolio";
import { getOGData, OGData } from "@/lib/ogFetcher";
import PortfolioDto from "../model/PortfolioDto";
import ProfileQueries from "./ProfileQueries";

export default function usePortfolioOG(userId: number) {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    error: portfolioError,
  } = usePortfolio(userId);

  const ogQuery = useQuery<OGData[]>({
    queryKey: ProfileQueries.QueryKeys.portfolioOG(userId),
    queryFn: async () => {
      if (!portfolio || portfolio.length === 0) return [];
      const results = await Promise.all(
        portfolio.map((item: PortfolioDto) => getOGData(item.url))
      );
      return results;
    },
    enabled: !!portfolio && !isPortfolioLoading && !portfolioError,
  });

  return {
    portfolio,
    ogData: ogQuery.data || [],
    isPortfolioLoading: isPortfolioLoading || ogQuery.isLoading,
    error: portfolioError || ogQuery.error,
  };
}
