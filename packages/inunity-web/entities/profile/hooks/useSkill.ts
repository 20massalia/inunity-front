"use client";
import { useQuery } from "@tanstack/react-query";
import SkillDto from "../model/SkillDto";
import ProfileQueries from "./ProfileQueries";

export default function useSkill(userId: number) {
  const queryOptions = ProfileQueries.skillQuery(userId);
  return useQuery<SkillDto[]>(queryOptions);
}
