import ResponseComment from "./ResponseComment";


type ResponseReplyComment = Omit<ResponseComment, 'commentId'> & {replyCommentId: number}
export default ResponseReplyComment