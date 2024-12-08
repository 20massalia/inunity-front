"use client";

import { usePlatform } from "@/hooks/usePlatform";
import {
  faChevronLeft,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { MessageEventType } from "message-type/message-type";
import { Card, ScrollView, Typography, useMenu } from "ui";
import { useMessageManager } from "../MessageContext";
import AppBar from "../AppBar";
import usePostListViewModel from "../viewModel/PostListViewModel";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import PostCard from "@/widgets/post/PostCard";

export default function PostListContainer({categoryId}: {categoryId: string}) {
  const router = useRouter();

  const messageManager = useMessageManager();
  const { posts } = usePostListViewModel();

  const { isWebView, os } = usePlatform();

  return (
    <>
      <AppBar
        center={
          <>
            <Typography className="text-xs font-bold">컴퓨터공학부</Typography>
            <Typography variant="HeadingNormalBold">공지사항</Typography>
          </>
        }
        leftIcon={<FontAwesomeIcon icon={faChevronLeft} fontSize={24} onClick={router.back} />}
        rightIcon={
          <>
            <FontAwesomeIcon icon={faEdit} fontSize={24} onClick={() => router.push(`/post/${categoryId}/write`)}/>
            <FontAwesomeIcon icon={faSearch} fontSize={24} onClick={() => router.push(`/post/${categoryId}/search`)} />
          </>
        }
      />
      
      <div className="flex flex-col bg-gray-50 gap-3  overflow-scroll">
        {!isLoading &&
          data?.map((item) => (
            <div
              key={item.content}
              className=" "
              onClick={() => {
                if (isWebView)
                  messageManager?.messageManager?.sendMessage(
                    MessageEventType.Navigation,
                    { path: `/post/1/1` }
                  );
                else router.push("/post/1/1");
              }}
            >
              <PostCard {...item} />
            </div>
          ))}
      </div>
    </>
  );
}
