import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import CareerDto from "@/entities/profile/model/CareerDto";

export default function usePostCareer(userId: number) {
  return useMutation({
    mutationFn: async (career: Omit<CareerDto, "careerId">) => {
      return fetchExtended(`/v1/users/${userId}/profile/career`, {
        method: "POST",
        body: career,
      });
    },
  });
}
