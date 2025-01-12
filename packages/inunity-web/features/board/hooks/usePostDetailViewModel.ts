import useArticle from "@/entities/article/hooks/useArticle";
import useDeleteComment from "./useDeleteComment";
import useEditComment from "./useEditComment";
import useReportComment from "./useReportComment";
import useSubmitComment from "./useSubmitComment";
import useDeleteArticle from "./useDeleteArticle";
import useReportArticle from "./useReportArticle";

export default function useArticleDetailViewModel({ articleId }: { articleId: number }) {
  const article = useArticle(articleId);

  const submitComment = useSubmitComment();
  const reportArticle = useReportArticle();
  const reportComment = useReportComment();
  const editComment = useEditComment();
  const deleteArticle = useDeleteArticle();
  const deleteComment = useDeleteComment();

  return {
    article,
    submitComment,
    reportComment,
    reportArticle,
    editComment,
    deleteComment,
    deleteArticle,
  };
}
