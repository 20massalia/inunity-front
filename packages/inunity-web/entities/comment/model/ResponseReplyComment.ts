export default interface ResponseReplyComment {
  //ResponseReplyComment: 댓글의 대댓글 내용

  replyCommentId: number;
  isAnonymous: boolean;
  userId: number;
  department: string;
  nickname: string;
  userImageUrl: string;
  content: string;
  isOwner: boolean;
  createAt: Date;
}
