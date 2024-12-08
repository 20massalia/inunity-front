import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchList, PostListDto } from "./PostListViewModel";

export default function usePostSearchViewModel() {
  const [searchValue, setSearchValue] = useState("");
  const tags = ["전공", "취업", "창업", "학과", "학교", "응애"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetchList().then(async (res) => {
        return res as PostListDto[];
      }),
  });
  

  return {
    tags, searchValue,setSearchValue, selectedTags, setSelectedTags, posts
  }
}