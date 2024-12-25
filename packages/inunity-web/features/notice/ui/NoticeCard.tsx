import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoticeDto from "@/entities/notice/model/NoticeDto";
import ArticleDto from "@/entities/article/model/ArticleDto";

export default function NoticeCard({ ...notice }: NoticeDto) {
  const queryClient = useQueryClient();
  const toggleBookmarkNotice = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevArticle = queryClient.getQueryData<ArticleDto[]>([
        "notices",
      ]);
      queryClient.setQueryData(
        ["notices"],
        prevArticle?.map((article) =>
          article.articleId === id
            ? { ...article, isBookmarked: !article.isBookmarked }
            : article
        )
      );
      // Todo: Server
    },
  });

  return (
    <Card
      key={notice.content}
      content={notice.content}
      author={notice.author}
      fromUpdate={notice.date}
      isBookmarked={notice.isBookmarked}
      onToggleBookmark={() => {
        toggleBookmarkNotice.mutate(notice.articleId);
      }}
    />
  );
}
