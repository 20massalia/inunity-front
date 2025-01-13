import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import ProfileDto from "@/entities/profile/model/ProfileDto";

export default function useSaveProfile(userId: string) {
  return useMutation({
    mutationFn: async (profile: ProfileDto) => {
      return fetchExtended(`/v1/users/${userId}/profile`, {
        method: "PUT",
        body: {
          ...profile,
          contracts: profile.contracts.map((contract) => ({
            ...contract,
            contractId: contract.contractId ?? null, // 생성 시 null, 수정 시 ID 포함
          })),
        },
      });
    },
  });
}
