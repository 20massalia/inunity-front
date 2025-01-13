"use client";
import { useQuery } from "@tanstack/react-query";
import ProfileDto from "../model/ProfileDto";
import ProfileQueries from "./ProfileQueries";

export default function useProfile(userId: number) {
  const queryOptions = ProfileQueries.profileQuery(userId);
  return useQuery<ProfileDto>(queryOptions);
}
