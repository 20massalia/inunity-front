import { useMutation } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import CareerDto from "@/entities/profile/model/CareerDto";

export default function useEditCareer(userId: number) {
  return useMutation({
    mutationFn: async (career: CareerDto) => {
      return fetchExtended(`/v1/users/${userId}/profile/career`, {
        method: "PUT",
        body: career,
      });
    },
  });
}
