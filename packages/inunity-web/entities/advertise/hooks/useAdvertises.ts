import { useQuery } from "@tanstack/react-query";
import AdvertisesQueries from "./AdvertisesQueries";

/**
 * advertises(배너) 목록을 한 번에 전부 가져오는 훅
 */
export default function useAdvertises() {
  const queryOptions = AdvertisesQueries.advertisesQuery();
  return useQuery(queryOptions);
}
