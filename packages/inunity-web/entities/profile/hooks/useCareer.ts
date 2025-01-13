"use client";
import { useQuery } from "@tanstack/react-query";
import CareerDto from "../model/CareerDto";
import ProfileQueries from "./ProfileQueries";

export default function useCareer(userId: number) {
  const queryOptions = ProfileQueries.careerQuery(userId);
  return useQuery<CareerDto[]>(queryOptions);
}
