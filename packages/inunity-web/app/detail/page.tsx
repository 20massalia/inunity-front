"use client";
import { useMessageManager } from "@/components/MessageContext";
import styles from "./Detail.module.css";

import {
  CommentPayload,
  PostDetailPageEventType,
} from "message-type/message-type";
import { useEffect } from "react";
import { Typography, useMenu, UserProfile } from "ui";

export function usePostDetailViewModel() {
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

export const Viewer = () => {
  return (
    <Typography className="text-black">
      2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에
      신청하시기 바랍니다.
      <br />
      가. 시행기간: 2024. 9. 23.(월) 09:00 ~ 9. 25.(수) 17:00
      <br />
      나. 대상: 2024학년도 2학기 17학점 이상 수강신청자 중 수강능력 부족, 적성
      부적합 등 부득이한 사유로 수강을 포기하려는 자<br />
      다. 포기가능 과목 수: 1과목(3학점 이내, 포기 후 수강학점이 15학점
      이상이어야 함)
      <br />
      라. 신청방법
      <br />
    </Typography>
  );
};

export default function Detail() {
  const { messageManager, pageEvent } = useMessageManager();
  const { submitComment, post, comments } = usePostDetailViewModel();
  const {openMenuId, setOpenMenuId} = useMenu();

  useEffect(() => {
    if (!pageEvent) return;
    if (pageEvent?.event === PostDetailPageEventType.SubmitComment) {
      submitComment(pageEvent.value);
    }
  }, [pageEvent, submitComment]);
  return (
    <div className="flex flex-col bg-white text-black">
      <div className="flex flex-col gap-3 p-5">
        <UserProfile
          profileImage={""}
          name={post.name}
          introduction={post.department}
          id={post.name}
          isMenuOpen={openMenuId == `post_${post.name}`}
          onToggleMenu={() => setOpenMenuId(`post_${post.name}`)}
          actions={[
            {label: '수정', onClick: () => {}},
            {label: '삭제', onClick: () => {}},
            {label: '신고', onClick: () => {}},
            {label: '차단', onClick: () => {}},
          ]}
        />
        <Viewer />
      </div>
      <div className={styles.commentArea}>
        <div className={styles.commentTitle}>
          <Typography variant="HeadingLargeBold">댓글&nbsp;</Typography>
          <Typography variant="HeadingNormalBold">2</Typography>
        </div>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <>
              <div className={styles.commentItem} key={comment.content}>
                <UserProfile
                  profileImage={""}
                  name={comment.name}
                  introduction={comment.department}
                  id={comment.name}
                  isMenuOpen={openMenuId == `comments_${comment.name}`}
                  onToggleMenu={() => setOpenMenuId(`comments_${comment.name}`)}
                  actions={[
                    {label: '수정', onClick: () => {}},
                    {label: '삭제', onClick: () => {}},
                    {label: '신고', onClick: () => {}},
                    {label: '차단', onClick: () => {}},
                  ]}
                />
                <Typography>{comment.content}</Typography>
                <Typography
                  variant="LabelNormalRegular"
                  className="inline text-end"
                >
                  {comment.date}
                </Typography>
              </div>
              <div className={styles.divider}>
                <div className={styles.divider1} />
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles.spacer1} />
    </div>
  );
}
