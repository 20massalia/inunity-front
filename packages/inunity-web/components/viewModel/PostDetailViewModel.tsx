import {
  CommentPayload,
  
} from "message-type/message-type";

export default function usePostDetailViewModel() {
  const submitComment = (payload: CommentPayload) => {};

  const post = {
    name: "김정아",
    department: "컴퓨터공학부",
    content: "ㄹㅁㄴㅇㄹ먼ㄹㄴㅁㅇ람ㄴㅇ럼니ㅏㅇ러리ㅏ",
    date: "2023-08-15",
    likes: 12,
    bookmarks: 5,
    postId: "2",
    isLiked: false,
    isBookmarked: false,
  };
  const comments = [
    {
      name: "김정아",
      department: "컴퓨터공학부",
      date: "2023-08-15",
      content: "드랍하고 싶어요 ㅠㅠ",
    },
  ];
  return {
    submitComment,
    post,
    comments,
  };
}