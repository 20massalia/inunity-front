"use client";

import { OutputData } from "@editorjs/editorjs";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/shared/ui/Editor"), { ssr: false });

import { useState } from "react";
import { CheckBox, Input, Typography } from "ui";
import AppBar from "@/widgets/AppBar";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import useSubmitArticle from "@/features/board/hooks/useSubmitArticle";
import useEditArticle from "@/features/board/hooks/useEditArticle";
import useArticle from "@/entities/article/hooks/useArticle";
import safeJsonParse from "message-type/safeParseJson";

export default function ArticleEditContainer({
  articleId,
}: {
  articleId: number;
}) {
  const article = useArticle(articleId);
  const [title, setTitle] = useState(article.data?.title ?? '');
  const [data, setData] = useState<OutputData>(
    safeJsonParse<OutputData>(article.data?.content ?? "{}") ??
      ({} as OutputData)
  );
  const router = useNativeRouter();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const editArticle = useEditArticle();

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
          <div
            onClick={() => {
              editArticle.mutate({
                articleId,
                title,
                content: JSON.stringify(data),
                isAnonymous,
              });
            }}
          >
            <Typography variant="HeadingSmallBold" className="text-nowrap">
              작성
            </Typography>
          </div>
        }
      />
      <div className="flex-1 p-5 overflow-scroll">
        <div className="flex flex-row justify-end">
          <CheckBox checked={isAnonymous} setChecked={setIsAnonymous} />
          &nbsp;익명
        </div>
        {/* <Input value={title} setValue={setTitle} className="w-full" placeholder="글 제목을 입력해주세요." /> */}
        <Editor onChange={setData} data={data} holder="article-editor" />
      </div>
    </>
  );
}
