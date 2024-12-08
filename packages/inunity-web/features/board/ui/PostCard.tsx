"use client";

import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import PostDto from "@/entities/post/model/PostDto";

// 이정도는 해도 되지 않을까?요?
// 상위에서 개수대로 index 를 prop으로 넘겨서 여기서 데이터 꺼내먹는건 너무 오바지 않나?
export default function PostCard({ ...item }: PostDto) {
  
  const queryClient = useQueryClient();
  const toggleLike = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostDto[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      // Todo: Server
      // ㅅ서버에서 변경 시도 . 실패/성공 둘다ㅣ 데이터 다시 가져옴
      // queryClient.invalidateQueries();
    },
  });

  const toggleBookmark = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostDto[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isBookmarked: !post.isBookmarked,
                bookmarks: post.isBookmarked
                  ? post.bookmarks - 1
                  : post.bookmarks + 1,
              }
            : post
        )
      );
      // Todo: Server
    },
  });
  const router = useNativeRouter();
  
  return (
    <Card
      author={item.author}
      authorDescription={item.authorOrg}
      content={item.content}
      fromUpdate={item.date}
      likeCount={item.likes}
      bookmarkCount={item.bookmarks}
      onLikeToggle={function (): void {
        toggleLike.mutate(item.postId);
      }}
      onToggleBookmark={function (): void {
        toggleBookmark.mutate(item.postId);
      }}
      onClick={() => router.push(`/post/1/${item.postId}`)}
      isLiked={item.isLiked}
      isBookmarked={item.isBookmarked}
      variant="list"
    />
  );
}
