import { useQuery } from "@tanstack/react-query";
import PostDto from "../model/PostDto";

export default function usePosts() {
  return useQuery<PostDto[]>({
    queryKey: ["posts"],
    queryFn: () => [
      {
        title: "this is title",
        author: "author",
        avatarUrl: "https://github.com/KimWash.png",
        authorOrg: "CS",
        content: "this is test post",
        date: "2023-08-15",
        likes: 12,
        bookmarks: 5,
        postId: "2",
        isLiked: false,
        isBookmarked: false,
      },
    ],
  });
}
