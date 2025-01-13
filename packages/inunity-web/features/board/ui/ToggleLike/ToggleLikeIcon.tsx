"use client";

import ArticleDto from "@/entities/article/model/ArticleDto";
import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";
import fetchExtended from "@/lib/fetchExtended";
import Page from "@/shared/types/Page";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Typography } from "ui";

export type ToggleLikeProps = {
  article: ResponseArticleThumbnail;
};

// Todo: Infinite data에 대해 됨. 모든 리스트를 인피니티로 변경 필요.
export default function ToggleLikeIcon({ article }: ToggleLikeProps) {
  const queryClient = useQueryClient();
  const { likeNum: likeCount, isLiked: liked } = article;
  const toggleLike = useMutation({
    mutationFn: async (id: number) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevDatas = queryClient.getQueriesData<
        InfiniteData<Page<ResponseArticleThumbnail>>
      >({ queryKey: ["articles", "list"] });

      prevDatas.forEach(([queryKey, data]) => {
        if (data) {
          const updatedData = {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              content: page.content.map((article) =>
                article.articleId === id
                  ? {
                      ...article,
                      isLiked: !article.isLiked,
                      likeNum: article.isLiked
                        ? article.likeNum - 1
                        : article.likeNum + 1,
                    }
                  : article
              ),
            })),
          };
          console.log(updatedData);

          queryClient.setQueryData(queryKey, updatedData);
        }
      });

      try {
        // 서버 요청 시도
        await fetchExtended(`v1/articles/${id}/like`, { method: "POST" });
      } catch (error) {
        // 서버 요청 실패 시 캐시를 무효화하고 데이터를 다시 가져옴
        queryClient.invalidateQueries({ queryKey: ["articles", "list"] });
      }
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
