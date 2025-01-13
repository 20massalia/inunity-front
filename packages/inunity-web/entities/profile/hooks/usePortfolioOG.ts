"use client";

import { useQuery } from "@tanstack/react-query";
import usePortfolio from "./usePortfolio";

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

export default function usePortfolioOG(userId: number) {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    error: portfolioError,
  } = usePortfolio(userId);

  const ogQuery = useQuery<OGData[]>({
    queryKey: ["portfolioOG", userId],
    queryFn: async () => {
      if (!portfolio || portfolio.length === 0) return [];
      const results = await Promise.all(
        portfolio.map((item) =>
          fetch(`/api/og?url=${encodeURIComponent(item.url)}`).then((res) =>
            res.json()
          )
        )
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
