"use client";

import { OutputData } from "@editorjs/editorjs";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/shared/ui/Editor"), { ssr: false });

import { useEffect, useState } from "react";
import { CheckBox, Input, Typography } from "ui";
import AppBar from "@/widgets/AppBar";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import useSubmitArticle from "@/features/board/hooks/useSubmitArticle";
import { useMessageManager } from "@/shared/ui/MessageContext";
import LoadingOverlay from "@/shared/ui/LoadingOverlay";
import useCategories from "@/entities/category/hooks/useCategories";

export default function ArticleWriteContainer({
  categoryId,
}: {
  categoryId: number;
}) {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<OutputData>();
  const router = useNativeRouter();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const submitArticle = useSubmitArticle();
  const { messageManager } = useMessageManager();
  useEffect(() => {
    if (submitArticle.isSuccess) {
      alert("글을 작성했어요! 🎉");
      const articleId = submitArticle.data;
      router.replace(`/article/${categoryId}/${articleId}`);
    } else if (submitArticle.isError) {
      messageManager?.log(submitArticle.error);
      alert("글 작성에 실패했어요.. 🥲");
    }
  }, [submitArticle.isSuccess, submitArticle.isError]);
  const categories = useCategories();
  const currentCategory = categories.data?.find(
    (category) => category.id == categoryId
  );

  return (
    <>
      <AppBar
        center={
          <div className="flex flex-col">
            <Typography className="text-xs font-bold">
              {currentCategory?.name}
            </Typography>
            {currentCategory?.isNotice && (
              <Typography variant="HeadingNormalBold">공지사항</Typography>
            )}
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
              if (data?.blocks.length == 0) confirm("글을 작성해주세요.");
              if (confirm("글을 작성할까요?"))
                submitArticle.mutate({
                  categoryId,
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
      <LoadingOverlay isLoading={submitArticle.isPending} />
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
