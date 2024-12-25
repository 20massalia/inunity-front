import ArticleDto from "@/entities/article/model/ArticleDto";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "ui";

export type ToggleBookmarkProps = {
  article: ArticleDto;
};

export default function ToggleBoomarkIcon({ article }: ToggleBookmarkProps) {
  const { isBookmarked, bookmarks } = article;
  const queryClient = useQueryClient();

  const toggleBookmark = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevArticle = queryClient.getQueryData<ArticleDto[]>(["articles"]);
      queryClient.setQueryData(
        ["articles"],
        prevArticle?.map((article) =>
          article.articleId === id
            ? {
                ...article,
                isBookmarked: !article.isBookmarked,
                bookmarks: article.isBookmarked
                  ? article.bookmarks - 1
                  : article.bookmarks + 1,
              }
            : article
        )
      );
      // Todo: Server
    },
  });

  return (
    <div
      className={`flex items-center gap-2`}
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark.mutate(article.articleId);
      }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        className={`w-6 ${
          isBookmarked ? "text-blue-500" : "text-black"
        } cursor-pointer`}
      />
      {bookmarks && (
        <Typography
          variant="ParagraphNormalRegular"
          className={` ${isBookmarked ? "text-blue-500" : "text-black"}`}
        >
          {bookmarks}
        </Typography>
      )}
    </div>
  );
}
