"use client";

import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import ArticleDto from "@/entities/article/model/ArticleDto";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import { ReactNode } from "react";
import ResponseArticleThumbnail from "../model/ResponseArticleThumbnail";

// 이정도는 해도 되지 않을까?요?
// 상위에서 개수대로 index 를 prop으로 넘겨서 여기서 데이터 꺼내먹는건 너무 오바지 않나?
export default function ArticleCard({ ...item }: ResponseArticleThumbnail & {bottomFeatureSlot?: ReactNode}) {
  

  const router = useNativeRouter();
  return (
    <Card
      author={item.nickname}
      authorDescription={item.department}
      content={item.content}
      fromUpdate={item.updatedAt.toDateString()}
      likeCount={item.likeNum}
      avatarUrl={item.userImageUrl}
      bookmarkCount={0}
      onClick={() => router.push(`/article/1/${item.articleId}`)}
      isLiked={item.isLiked}
      isBookmarked={false}
      variant="list"
      bottomFeatureSlot={item.bottomFeatureSlot}
    />
  );
}
