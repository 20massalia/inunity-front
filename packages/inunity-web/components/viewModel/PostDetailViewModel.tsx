import { useMutation } from "@tanstack/react-query";
import {
  CommentPayload,
  
} from "message-type/message-type";
import { useMessageManager } from "../MessageContext";

export default function usePostDetailViewModel() {


  const post = {
    name: "김정아",
    department: "컴퓨터공학부",
    userId: 'squidjiny',
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
  
  const {messageManager} = useMessageManager();

  const deletePost = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('deleting post: ', postId)
  }})
  const reportPost = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('reporting post: ', postId)
  }})
  const blockUser = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('blocking user: ', postId)
  }})
  const editComment = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('editing comment: ', postId)
  }})
  const deleteComment = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('deleting comment: ', postId)
  }})
  const reportComment = useMutation({mutationFn: async (postId: string) => {
    messageManager?.log('reporting comment: ', postId)
  }})

  const submitComment = (payload: CommentPayload) => {
    messageManager?.log('댓글 내용: ', payload.text, " | 익명 여부: ", payload.isAnonymous)
  };

  return {
    submitComment,
    post,
    comments,
    deletePost,
    reportPost,
    blockUser,
    editComment,
    deleteComment,
    reportComment,

  };
}