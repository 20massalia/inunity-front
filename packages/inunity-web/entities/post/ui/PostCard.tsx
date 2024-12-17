"use client";

import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import PostDto from "@/entities/post/model/PostDto";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import { ReactNode } from "react";

// 이정도는 해도 되지 않을까?요?
// 상위에서 개수대로 index 를 prop으로 넘겨서 여기서 데이터 꺼내먹는건 너무 오바지 않나?
export default function PostCard({ ...item }: PostDto & {bottomFeatureSlot?: ReactNode}) {
  

  const router = useNativeRouter();
  return (
    <Card
      author={item.author}
      authorDescription={item.authorOrg}
      content={item.content}
      fromUpdate={item.date}
      likeCount={item.likes}
      bookmarkCount={item.bookmarks}
      onClick={() => router.push(`/post/1/${item.postId}`)}
      isLiked={item.isLiked}
      isBookmarked={item.isBookmarked}
      variant="list"
      bottomFeatureSlot={item.bottomFeatureSlot}
    />
  );
}
