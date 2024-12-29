//ResponseArticle: Article의 본문 내용(눌렀을때 그것)

import ResponseComment from "@/entities/comment/model/ResponseComment";

/*
userId: 유저PK
userImageUrl: 유저 프사
nickname: 유저 닉네임
department: 유저 학과
isAnonymous: 익명여부

articleId: 게시글 PK
title: 게시글 제목
content: 게시글 내용
view: 조회수
isOwner: 지금 이 글을 보고있는 사용자가 이 글의 주인이 맞는지 여부::글 수정 등의 동작을 위해 필요
likeNum: 좋아요 갯수
isLiked: 지금 보고 있는 사용자가 좋아요를 눌럿나요?
createAt: 생성 날짜/시간 2024-12-24T10:20:35.123
updatedAt: 수정 날짜/시간 2024-12-24T10:20:35.123

commentNum: 댓글/대댓글 총 갯수
List<ResponseComment> comments; //이 게시글의 댓글 리스트
*/
export default interface ResponseArticle {
  userId: number;
  department: string;
  nickname: string;
  userImageUrl: string;
  isAnonymous: boolean;
  
  articleId: string;
  title: string;
  content: string;
  view: number;
  isOwner: boolean;
  likeNum: number;
  isLiked: boolean;
  createAt: Date;
  updatedAt: Date;
  
  commentNum: number;
  comments: ResponseComment[];
}
