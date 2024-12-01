import { useQuery } from "@tanstack/react-query";
import { PostListItemProps } from "ui";

export const fetchList = async () => {
  return [
    {
      title: 'this is title',
      author: "author",
      authorOrg: "CS",
      content: "this is test post",
      date: "2023-08-15",
      likes: 12,
      bookmarks: 5,
      postId: "2",
      isLiked: false,
      isBookmarked: false,
    },
  ];
};

export interface PostListDto {
  title: string;
  avatarUrl?: string;
  author: string;
  authorOrg: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number;
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
} 

export default function usePostListViewModel() {

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetchList().then(async (res) => {
        return res as PostListDto[];
      }),
  });
  
  return {posts}
}