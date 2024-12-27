import ArticleDto from "@/entities/article/model/ArticleDto";
import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "ui";

export type ToggleLikeProps = {
  article: ResponseArticleThumbnail;
};

export default function ToggleLikeIcon({ article }: ToggleLikeProps) {
  const queryClient = useQueryClient();
  const { likeNum: likeCount, isLiked: liked } = article;
  const toggleLike = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevArticle = queryClient.getQueryData<ResponseArticleThumbnail[]>(["articles"]);
      queryClient.setQueryData(
        ["articles"],
        prevArticle?.map((article) =>
          article.articleId === id
            ? {
                ...article,
                isLiked: !article.isLiked,
                likeNum: article.isLiked ? article.likeNum - 1 : article.likeNum + 1,
              }
            : article
        )
      );
      // Todo: Server
      // ㅅ서버에서 변경 시도 . 실패/성공 둘다ㅣ 데이터 다시 가져옴
      // queryClient.invalidateQueries();
    },
  });

  return (
    <div
      className={`flex items-center gap-2`}
      onClick={(e) => {
        e.stopPropagation();
        toggleLike.mutate(article.articleId);
      }}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={`w-6 ${
          liked ? "text-blue-500" : "text-black"
        } cursor-pointer`}
      />
      {likeCount && (
        <Typography
          variant="ParagraphNormalRegular"
          className={` ${liked ? "text-blue-500" : "text-black"}`}
        >
          {likeCount}
        </Typography>
      )}
    </div>
  );
}
