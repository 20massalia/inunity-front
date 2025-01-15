import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import SkillDto from "@/entities/profile/model/SkillDto";

export default function useEditSkill(userId: number) {
  return useMutation({
    mutationFn: async (skill: SkillDto) => {
      return fetchExtended(`/v1/users/${userId}/profile/skill`, {
        method: "PUT",
        body: skill,
      });
    },
  });
}
