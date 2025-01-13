"use client";
import { useQuery } from "@tanstack/react-query";
import PortfolioDto from "../model/PortfolioDto";
import ProfileQueries from "./ProfileQueries";

export default function usePortfolio(userId: number) {
  const queryOptions = ProfileQueries.portfolioQuery(userId);
  return useQuery<PortfolioDto[]>(queryOptions);
}
