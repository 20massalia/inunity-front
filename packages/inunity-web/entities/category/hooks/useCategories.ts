import { useQuery } from "@tanstack/react-query";
import CategoryQuery from "./CategoryQuery";

export default function useCategories() {
  return useQuery(CategoryQuery.list());
}