"use client";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useEffect, useRef } from "react";
import { ScrollView, Typography, useMenu, UserProfile } from "ui";
import { ArticleDetailPageEventType } from "message-type/message-type";
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
import useSubmitComment from "@/features/board/hooks/useSubmitComment";
import useReportComment from "@/features/board/hooks/useReportComment";
import useEditComment from "@/features/board/hooks/useEditComment";
import useDeleteComment from "@/features/board/hooks/useDeleteComment";
import useArticle from "@/entities/article/hooks/useArticle";
import useArticleDetailViewModel from "@/features/board/hooks/usePostDetailViewModel";
import { editorJsData } from "@/lib/article";
import { generateMockComment, generateMockCommentsWithReplies } from "@/entities/article/model/ArticleMock";

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

export default function ArticleDetailContainer({
  categoryId,
  articleId,
}: {
  categoryId: string;
  articleId: string;
}) {
  const { messageManager, pageEvent } = useMessageManager();

  const {
    article:articleQuery,
    submitComment,
    reportComment,
    reportArticle,
    editComment,
    deleteComment,
    deleteArticle,
  } = useArticleDetailViewModel({ articleId });

  const article = articleQuery.data;

  const comments = generateMockCommentsWithReplies(3);

  useEffect(() => {
    messageManager?.log("Page Event arrived: ", pageEvent?.value);
    if (!pageEvent) return;
    if (pageEvent?.event === ArticleDetailPageEventType.SubmitComment) {
      submitComment.mutate(pageEvent.value);
    }
  }, [messageManager, pageEvent, submitComment]);
  const router = useNativeRouter();
  if (!article) return <div>no data</div>;
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
              menuId={"article_detail_appbar"}
              actions={[
                {
                  label: "수정",
                  onClick: () => {
                    // Todo: 수정 페이지로 변경 요망
                    router.push(`/article/${categoryId}/write`);
                  },
                },
                {
                  label: "삭제",
                  onClick: () => deleteArticle.mutate(article.articleId),
                },
                {
                  label: "신고",
                  onClick: () => reportArticle.mutate(article.articleId),
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
            profileImage={article.userImageUrl}
            name={article.nickname}
            introduction={article.department}
            id={article.userId}
          />
          <Viewer />
        </div>
        <div className="bg-white self-stretch flex flex-col items-start justify-start p-5 gap-3">
          <div className="flex flex-row items-center justify-center gap-1">
            <Typography variant="HeadingLargeBold">댓글&nbsp;</Typography>
            <Typography variant="HeadingNormalBold">{comments.comments.length}</Typography>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            {comments.comments.map((comment) => (
              <>
                <div
                  className="flex flex-col justify-start self-stretch"
                  key={comment.content}
                >
                  <UserProfile
                    profileImage={comment.userImageUrl}
                    name={comment.nickname}
                    introduction={comment.department}
                    id={comment.userId}
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
                    {comment.createAt.toString()}
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
