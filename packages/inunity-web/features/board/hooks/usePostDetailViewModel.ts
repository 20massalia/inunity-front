import useArticle from "@/entities/article/hooks/useArticle";
import useDeleteComment from "./useDeleteComment";
import useEditComment from "./useEditComment";
import useReportComment from "./useReportComment";
import useSubmitComment from "./useSubmitComment";
import useDeleteArticle from "./useDeleteArticle";

export default function useArticleDetailViewModel({ articleId }: { articleId: string }) {
  const article = useArticle();

  const submitComment = useSubmitComment();
  const reportArticle = useReportComment();
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
