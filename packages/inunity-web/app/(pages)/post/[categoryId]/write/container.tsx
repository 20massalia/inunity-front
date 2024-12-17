"use client";

import { OutputData } from "@editorjs/editorjs";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Link from "next/link";
const Editor = dynamic(() => import("@/shared/ui/Editor"), { ssr: false });

import { useState } from "react";
import { CheckBox, Typography } from "ui";
import AppBar from "@/widgets/AppBar";
import { useNativeRouter } from "@/hooks/useNativeRouter";

export default function PostWriteContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const [data, setData] = useState<OutputData>();
  const router = useNativeRouter();
  const [isAnonymous, setIsAnonymous] = useState(true);
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
            <FontAwesomeIcon icon={faChevronLeft} fontSize={24} onClick={router.back} />
        }
        rightIcon={
          <Typography variant="HeadingSmallBold" className="text-nowrap">
            작성
          </Typography>
        }
      />
      <div className="flex-1 p-5 overflow-scroll">
        <div className="flex flex-row justify-end">
          <CheckBox checked={isAnonymous} setChecked={setIsAnonymous} />&nbsp;익명
        </div>
        <Editor onChange={setData} data={data} holder="post-editor" />
      </div>
    </>
  );
}
