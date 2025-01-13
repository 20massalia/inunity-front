import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import ProfileDto from "@/entities/profile/model/ProfileDto";

export default function useEditProfile(userId: string) {
  return useMutation({
    mutationFn: async (profile: ProfileDto) => {
      return fetchExtended(`/v1/users/${userId}/profile`, {
        method: "PUT",
        body: profile,
      });
    },
  });
}
