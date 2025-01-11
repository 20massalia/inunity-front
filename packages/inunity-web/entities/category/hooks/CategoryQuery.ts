import fetchExtended from "@/lib/fetchExtended";
import { queryOptions } from "@tanstack/react-query";
import ResponseCategory from "../model/Category";

export default class CategoryQuery {
  static list() {
    return queryOptions({
      queryKey: ['categories'],
      queryFn: async () => {
        return await fetchExtended<ResponseCategory[]>('v1/categories')
      }
    })
  }
}