import fetchExtended from "@/lib/fetchExtended";
import Page from "@/shared/types/Page";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ResponseComment from "../model/ResponseComment";

const QueryKey = ["comments", "written"];

export default function useWrittenComments() {
  return useQuery({
    queryKey: QueryKey,
    queryFn: async ({}) => {
      return await fetchExtended<ResponseComment[]>(`/v1/users/comments`);
    },
  });
}
