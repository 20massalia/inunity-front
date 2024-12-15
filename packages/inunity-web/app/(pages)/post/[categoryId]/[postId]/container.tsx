"use client";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useEffect, useRef } from "react";
import { ScrollView, Typography, useMenu, UserProfile } from "ui";
import { PostDetailPageEventType } from "message-type/message-type";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AppBar from "@/widgets/AppBar";
import { useRouter } from "next/navigation";
import BlockParser from "editor-react-parser";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { DropdownMenu } from "ui/src/DropdownMenu";
import { editorJsData } from "@/lib/post";
import useSubmitComment from "@/features/board/hooks/useSubmitComment";
import useReportComment from "@/features/board/hooks/useReportComment";
import useEditComment from "@/features/board/hooks/useEditComment";
import useDeletePost from "@/features/board/hooks/useDeletePost";
import useDeleteComment from "@/features/board/hooks/useDeleteComment";
import usePost from "@/entities/post/hooks/usePost";
import usePostDetailViewModel from "@/features/board/hooks/usePostDetailViewModel";

export const Viewer = () => {
  return (
    <div className="overflow-x-scroll">
      <BlockParser data={editorJsData} />
    </div>

    // <Typography className="text-black">
    //   2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에
    //   신청하시기 바랍니다.
    //   <br />
    //   가. 시행기간: 2024. 9. 23.(월) 09:00 ~ 9. 25.(수) 17:00
    //   <br />
    //   나. 대상: 2024학년도 2학기 17학점 이상 수강신청자 중 수강능력 부족, 적성
    //   부적합 등 부득이한 사유로 수강을 포기하려는 자<br />
    //   다. 포기가능 과목 수: 1과목(3학점 이내, 포기 후 수강학점이 15학점
    //   이상이어야 함)
    //   <br />
    //   라. 신청방법
    //   <br />
    // </Typography>
  );
};

export default function PostDetailContainer({
  categoryId,
  postId,
}: {
  categoryId: string;
  postId: string;
}) {
  const { messageManager, pageEvent } = useMessageManager();

  const {
    post:postQuery,
    submitComment,
    reportComment,
    reportPost,
    editComment,
    deleteComment,
    deletePost,
  } = usePostDetailViewModel({ postId });

  const post = postQuery.data;

  const comments = [
    {
      name: "김정아",
      department: "컴퓨터공학부",
      date: "2023-08-15",
      content: "드랍하고 싶어요 ㅠㅠ",
    },
  ];

  useEffect(() => {
    messageManager?.log("Page Event arrived: ", pageEvent?.value);
    if (!pageEvent) return;
    if (pageEvent?.event === PostDetailPageEventType.SubmitComment) {
      submitComment.mutate(pageEvent.value);
    }
  }, [messageManager, pageEvent, submitComment]);
  const router = useNativeRouter();
  if (!post) return <div>no data</div>;
  return (
    <>
      <AppBar
        center={
          <div className="flex flex-col">
            <Typography className="text-xs font-bold">컴퓨터공학부</Typography>
            <Typography variant="HeadingNormalBold">공지사항</Typography>
          </div>
        }
        leftIcon={
          <FontAwesomeIcon
            icon={faChevronLeft}
            fontSize={24}
            onClick={router.back}
          />
        }
        rightIcon={
          <>
            <DropdownMenu
              menuId={"post_detail_appbar"}
              actions={[
                {
                  label: "수정",
                  onClick: () => {
                    // Todo: 수정 페이지로 변경 요망
                    router.push(`/post/${categoryId}/write`);
                  },
                },
                {
                  label: "삭제",
                  onClick: () => deletePost.mutate(post.postId),
                },
                {
                  label: "신고",
                  onClick: () => reportPost.mutate(post.postId),
                },
                { label: "차단", onClick: () => undefined },
              ]}
            />
            {/* <FontAwesomeIcon icon={faEllipsisVertical} className="text-2xl" onClick={} /> */}
          </>
        }
      />
      <ScrollView className="text-black gap-2">
        <div className="flex flex-col gap-3 p-5 bg-white ">
          <UserProfile
            profileImage={"https://github.com/squidjiny.png"}
            name={post.author}
            introduction={post.authorOrg}
            id={post.author}
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
      </ScrollView>
    </>
  );
}
