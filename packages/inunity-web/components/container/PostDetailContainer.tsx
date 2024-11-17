"use client";
import { useMessageManager } from "@/components/MessageContext";
import { useEffect } from "react";
import { Typography, useMenu, UserProfile } from "ui";
import { PostDetailPageEventType } from "message-type/message-type";
import usePostDetailViewModel from "@/components/viewModel/PostDetailViewModel";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AppBar from "../AppBar";
import { useRouter } from "next/navigation";

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

export default function PostDetailContainer({categoryId, postId} : {categoryId: string; postId: string}) {
  const { messageManager, pageEvent } = useMessageManager();
  const { submitComment, post, comments } = usePostDetailViewModel();
  const { openMenuId, setOpenMenuId } = useMenu();

  useEffect(() => {
    if (!pageEvent) return;
    if (pageEvent?.event === PostDetailPageEventType.SubmitComment) {
      submitComment(pageEvent.value);
    }
  }, [pageEvent, submitComment]);
  const router = useRouter()
  return (
    <>
      <AppBar
        title={
          <>
            <Typography className="text-xs font-bold">컴퓨터공학부</Typography>
            <Typography variant="HeadingNormalBold">공지사항</Typography>
          </>
        }
        leftIcon={
            <FontAwesomeIcon icon={faChevronLeft} fontSize={24} onClick={router.back} />
        }
        rightIcon={
          <>
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-2xl" />
          </>
        }
      />
      <div className="flex flex-col bg-gray-50 h-full text-black gap-2">
        <div className="flex flex-col gap-3 p-5 bg-white">
          <UserProfile
            profileImage={""}
            name={post.name}
            introduction={post.department}
            id={post.name}
            isMenuOpen={openMenuId == `post_${post.name}`}
            onToggleMenu={() => setOpenMenuId(`post_${post.name}`)}
            actions={[
              { label: "수정", onClick: () => {} },
              { label: "삭제", onClick: () => {} },
              { label: "신고", onClick: () => {} },
              { label: "차단", onClick: () => {} },
            ]}
          />
          <Viewer />
        </div>
        <div className="bg-white self-stretch flex flex-col items-start justify-start p-5 gap-3">
          <div className="flex flex-row items-center justify-center gap-1">
            <Typography variant="HeadingLargeBold">댓글&nbsp;</Typography>
            <Typography variant="HeadingNormalBold">2</Typography>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            {comments.map((comment) => (
              <>
                <div
                  className="flex flex-col justify-start self-stretch"
                  key={comment.content}
                >
                  <UserProfile
                    profileImage={""}
                    name={comment.name}
                    introduction={comment.department}
                    id={comment.name}
                    isMenuOpen={openMenuId == `comments_${comment.name}`}
                    onToggleMenu={() =>
                      setOpenMenuId(`comments_${comment.name}`)
                    }
                    actions={[
                      { label: "수정", onClick: () => {} },
                      { label: "삭제", onClick: () => {} },
                      { label: "신고", onClick: () => {} },
                      { label: "차단", onClick: () => {} },
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
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
