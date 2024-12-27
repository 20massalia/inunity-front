import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoticeDto from "@/entities/notice/model/NoticeDto";
import ArticleDto from "@/entities/article/model/ArticleDto";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";

export default function NoticeCard({ ...notice }: ResponseArticleThumbnail) {
  return (
    <Card
      key={notice.content}
      content={notice.content}
      author={notice.nickname}
      fromUpdate={notice.updatedAt.toDateString()}
      isBookmarked={false}
      bottomFeatureSlot={
        <ToggleBoomarkIcon article={notice}/>
      }
    />
  );
}
