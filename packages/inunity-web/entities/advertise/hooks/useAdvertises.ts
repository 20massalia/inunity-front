// useAdvertises.ts
import { useQuery } from "@tanstack/react-query";
import AdvertisesQueries from "./AdvertisesQueries";
import Page from "@/shared/types/Page";
import AdvertiseDto from "../model/AdvertiseDto";

export default function useAdvertises() {
  const queryOptions = AdvertisesQueries.advertisesQuery();
  return useQuery<Page<AdvertiseDto>>(queryOptions);
}
