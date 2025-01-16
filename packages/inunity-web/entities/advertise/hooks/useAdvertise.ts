import { useQuery } from "@tanstack/react-query";
import AdvertisesQueries from "./AdvertisesQueries";

/**
 * 특정 배너 상세 정보를 가져오는 훅
 * @param id 배너 ID
 */
export default function useAdvertise(id: number) {
  const queryOptions = AdvertisesQueries.singleAdvertiseQuery(id);
  return useQuery(queryOptions);
}
