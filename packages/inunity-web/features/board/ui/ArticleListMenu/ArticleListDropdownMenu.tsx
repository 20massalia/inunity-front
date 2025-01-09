import ArticleDto from "@/entities/article/model/ArticleDto";
import ResponseArticleThumbnail from "@/entities/article/model/ResponseArticleThumbnail";
import {
  faBookmark,
  faEdit,
  faFlag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "ui";
import useReportArticle from "../../hooks/useReportArticle";
import useDeleteArticle from "../../hooks/useDeleteArticle";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { DropdownMenu } from "ui/src/DropdownMenu";
import { useScrollView } from "ui/src/contexts/ScrollContext";

export type ArticleListDropdownMenuProps = {
  article: ResponseArticleThumbnail;
};

/**
 * 꼭 ScrollView 안에서만 사용하세요!
 * @returns 
 */
export default function ArticleListDropdownMenu({
  article,
}: ArticleListDropdownMenuProps) {
  // const queryClient = useQueryClient();

  const router = useNativeRouter();
  // Todo: Dummy User.
  const user = { userId: 2 };

  const { scrollContainerRef } = useScrollView();

  const editArticle = () => {
    router.push(`/article/edit/${article.articleId}`);
  };
  const deleteArticle = useDeleteArticle();
  const reportArticle = useReportArticle();

  return (
    <DropdownMenu
      actions={[
        ...(article.userId === user.userId
          ? [
              {
                label: "수정",
                icon: <FontAwesomeIcon icon={faEdit} />,
                onClick: editArticle,
              },
              {
                label: "삭제",
                icon: <FontAwesomeIcon icon={faTrash} />,
                onClick: () => {
                  // Todo: 모달 구현
                  if (confirm("정말 삭제하시겠습니까?"))
                    deleteArticle.mutate(article.articleId);
                },
              },
            ]
          : []),
        {
          label: "신고",
          icon: <FontAwesomeIcon icon={faFlag} />,
          onClick: () => {
            if (confirm("정말 이 게시글을 신고하시겠습니까?"))
              reportArticle.mutate(article.articleId);
          },
        },
      ]}
      menuId={`article_${article.articleId}`}
      scrollContainerRef={scrollContainerRef}
    />
  );
}
