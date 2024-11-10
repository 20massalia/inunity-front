"use client";
import { useMessageManager } from "@/components/MessageContext";
import styles from "./Detail.module.css";
import {
  CommentPayload,
  PostDetailPageEventType,
} from "message-type/message-type";
import { useEffect } from "react";
import { Typography, UserProfile } from "ui";

export function usePostDetailViewModel() {
  const submitComment = (payload: CommentPayload) => {
    return true;
  };
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
  return {
    submitComment,
    post,
  };
}

export const Viewer = () => {
  return (
    <Typography className="text-black" variant="body">
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
  const { submitComment, post } = usePostDetailViewModel();

  useEffect(() => {
    if (!pageEvent) return;
    if (pageEvent?.event === PostDetailPageEventType.SubmitComment) {
      submitComment(pageEvent.value);
    }
  }, [pageEvent, submitComment]);
  return (
      <div className="flex flex-col bg-white text-black">
        <div className="flex flex-col gap-3 px-5">
          <UserProfile
            profileImage={""}
            name={post.name}
            introduction={post.department}
            id={post.name}
            isMenuOpen={false}
            onToggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Viewer />
        </div>
        <div className={styles.commentArea}>
          <div className={styles.commentTitle}>
            <div className={styles.departmentName}>댓글</div>
            <div className={styles.commentCount}>2</div>
          </div>
          <div className={styles.commentList}>
            <div className={styles.commentItem}>
              <div className={styles.commentProfile}>
                <div className={styles.commenterInfoWrapper}>
                  <div className={styles.commenterNameWrapper}>
                    <div className={styles.departmentName}>익명1</div>
                  </div>
                </div>
              </div>
              <div className={styles.commentTextWrapper}>
                <div className={styles.postText}>드랍하고 싶어요 ㅠㅠ</div>
                <div className={styles.commentTimestamp}>
                  2024. 06. 10. 09:00
                </div>
              </div>
            </div>
            <div className={styles.divider}>
              <div className={styles.divider1} />
            </div>
            <div className={styles.commentItem}>
              <div className={styles.commentProfile}>
                <div className={styles.commenterInfoWrapper}>
                  <div className={styles.commenterNameWrapper}>
                    <div className={styles.departmentName}>미룬이</div>
                    <div
                      className={styles.commenterDepartment}
                    >{`컴퓨터공학부 `}</div>
                  </div>
                </div>
              </div>
              <div className={styles.commentTextWrapper}>
                <div className={styles.postText}>
                  포기 할 과목을 못잡았어요 ㅠㅠ
                </div>
                <div className={styles.commentTimestamp}>
                  2024. 06. 10. 09:00
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.spacer1} />
      </div>
  );
}
