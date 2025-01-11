"use client";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  CheckBox,
  Input,
  ScrollView,
  Typography,
  useMenu,
  UserProfile,
} from "ui";
import {
  ArticleDetailPageEventType,
  MessageEventType,
} from "message-type/message-type";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AppBar from "@/widgets/AppBar";
import { useRouter } from "next/navigation";
import BlockParser, { OutputData } from "editor-react-parser";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { DropdownMenu } from "ui/src/DropdownMenu";
import useArticleDetailViewModel from "@/features/board/hooks/usePostDetailViewModel";
import ArticleListDropdownMenu from "@/features/board/ui/ArticleListMenu/ArticleListDropdownMenu";
import { ClipLoader } from "react-spinners";
import { usePlatform } from "@/lib/PlatformProvider";
export const Viewer = ({ content }: { content: OutputData }) => {
  return (
    <div className="overflow-x-scroll">
      <BlockParser data={content} />
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
  categoryId: number;
  articleId: number;
}) {
  const { messageManager, pageEvent } = useMessageManager();

  const {
    article: articleQuery,
    submitComment,
    reportComment,
    reportArticle,
    editComment,
    deleteComment,
    deleteArticle,
  } = useArticleDetailViewModel({ articleId });

  const article = articleQuery.data;
  useEffect(() => {
    messageManager?.log(JSON.stringify(article));
  }, [article]);

  const comments = article?.comments;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!pageEvent) return;
    messageManager?.log("Page Event arrived: ", pageEvent);
    if (pageEvent?.event === ArticleDetailPageEventType.SubmitComment) {
      submitComment.mutate({ ...pageEvent.value, articleId });
    }
  }, [pageEvent]);

  const router = useNativeRouter();
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  if (!article) return <div>no data</div>;
  const {isWebView} = usePlatform()

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
            <ArticleListDropdownMenu article={article} />
            {/* <FontAwesomeIcon icon={faEllipsisVertical} className="text-2xl" onClick={} /> */}
          </>
        }
      />
      <ScrollView
        className="text-black gap-2"
        onRefresh={() => {
          articleQuery.refetch();
        }}
      >
        {articleQuery.isRefetching && (
          <div className="flex flex-row justify-center">{<ClipLoader />}</div>
        )}
        <div className="flex flex-col gap-3 p-5 bg-white ">
          <UserProfile
            profileImage={article.userImageUrl}
            name={article.nickname ?? "익명"}
            introduction={article.department}
            id={article.userId}
          />
          <Viewer content={JSON.parse(article.content)} />
        </div>
        <div className="bg-white self-stretch flex flex-col items-start justify-start p-5 gap-3">
          <div className="flex flex-row items-center justify-center gap-1">
            <Typography variant="HeadingLargeBold">댓글&nbsp;</Typography>
            <Typography variant="HeadingNormalBold">
              {article.commentNum}
            </Typography>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            {comments?.map((comment) => (
              <>
                <div
                  className="flex flex-col justify-start self-stretch"
                  key={comment.content}
                >
                  <UserProfile
                    profileImage={comment.userImageUrl}
                    name={comment.nickname ?? "익명"}
                    introduction={comment.department}
                    id={comment.userId}
                    actions={
                      <DropdownMenu
                        menuId={`comment_${comment.commentId}`}
                        actions={[
                          {
                            label: "수정",
                            onClick: () => {
                              // Todo: focus input tag or native input
                              if (!isWebView) inputRef.current?.focus();
                              else
                                messageManager?.sendMessage(
                                  MessageEventType.Page,
                                  {
                                    event: ArticleDetailPageEventType.StartEditComment,
                                    value: {
                                      text: comment.content,
                                      isAnonymous: comment.isAnonymous,
                                      commentId: comment.commentId,
                                    },
                                  }
                                );
                            },
                          },
                          {
                            label: "삭제",
                            onClick: () => {
                              if (confirm("댓글을 정말로 삭제할까요?"))
                                deleteComment.mutate(comment.commentId);
                            },
                          },
                          {
                            label: "신고",
                            onClick: () => {
                              if (confirm("댓글을 정말로 신고할까요?"))
                                reportComment.mutate(comment.commentId);
                            },
                          },
                        ]}
                      />
                    }
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
      {!isWebView && (
        <div className="flex flex-col p-3">
          <div className="flex flex-row gap-2">
            <CheckBox checked={isAnonymous} setChecked={setIsAnonymous} />
            익명
          </div>
          <div className="flex flex-row gap-4 ">
            <Input
              ref={inputRef}
              value={comment}
              setValue={setComment}
              className="flex-1"
            />
            <Button
              onClick={() =>
                submitComment.mutate({ articleId, text: comment, isAnonymous })
              }
            >
              작성
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
