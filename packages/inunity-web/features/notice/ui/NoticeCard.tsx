import { Card } from "ui";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";

export default function NoticeCard({ ...notice }: ResponseArticleThumbnail) {
  return (
    <Card
      key={notice.content}
      content={notice.content}
      author={notice.nickname}
      title={notice.title}
      variant='detailed'
      fromUpdate={notice.updatedAt.toDateString()}
      isBookmarked={false}
    />
  );
}
