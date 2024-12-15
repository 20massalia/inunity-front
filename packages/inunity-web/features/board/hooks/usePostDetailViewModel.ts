import usePost from "@/entities/post/hooks/usePost";
import useDeleteComment from "./useDeleteComment";
import useDeletePost from "./useDeletePost";
import useEditComment from "./useEditComment";
import useReportComment from "./useReportComment";
import useSubmitComment from "./useSubmitComment";

export default function usePostDetailViewModel({ postId }: { postId: string }) {
  const post = usePost();

  const submitComment = useSubmitComment();
  const reportPost = useReportComment();
  const reportComment = useReportComment();
  const editComment = useEditComment();
  const deletePost = useDeletePost();
  const deleteComment = useDeleteComment();

  return {
    post,
    submitComment,
    reportComment,
    reportPost,
    editComment,
    deleteComment,
    deletePost,
  };
}
