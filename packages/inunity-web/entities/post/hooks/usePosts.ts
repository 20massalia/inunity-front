import { useQuery } from "@tanstack/react-query";
import PostDto from "../model/PostDto";

export default function usePosts() {
  return useQuery<PostDto[]>({ queryKey: ['posts'], });

}