export default interface ResponseComment {
  //ResponseComment: 댓글 내용. 보낼때는 List<ResponseComment> comments로 갑니다
  /*
commentId 댓글 PK
isAnonymous: 익명 여부
userId: 유저 PK
department: 유저가 속한 학과
nickname: 유저 닉네임
userImageUrl: 유저 프사 url
content: 댓글내용
isOwner: 현재 이 글을 보고 있는 사용자의 이 댓글에 대한 주인 여부
createAt: 작성 날짜/시간 2024-12-24T10:20:35.123
*/
  commentId: number;
  isAnonymous?: boolean;
  userId?: number;
  department?: string;
  nickname?: string;
  userImageUrl?: string;
  content: string;
  isOwner: boolean;
  createAt?: Date;
  replyComments: Omit<ResponseComment[], 'replyComments'>
}
