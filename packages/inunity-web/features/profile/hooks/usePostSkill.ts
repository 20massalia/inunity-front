import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import SkillDto from "@/entities/profile/model/SkillDto";

export default function usePostSkill(userId: number) {
  return useMutation({
    mutationFn: async (skill: Omit<SkillDto, "skillId">) => {
      return fetchExtended(`/v1/users/${userId}/profile/skill`, {
        method: "POST",
        body: skill,
      });
    },
  });
}
