"use client";

import { usePlatform } from "@/hooks/usePlatform";
import {
  faChevronLeft,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageEventType } from "message-type/message-type";
import { Card,  ScrollView, Typography, useMenu } from "ui";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { useMessageManager } from "@/shared/ui/MessageContext";
import AppBar from "@/widgets/AppBar";
import usePost from "@/entities/post/hooks/usePost";
import PostCard from "@/features/board/ui/PostCard";

export default function PostListContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useNativeRouter();

  const messageManager = useMessageManager();
  const posts = usePost();

  const { isWebView, os } = usePlatform();
  const { openMenuId, setOpenMenuId } = useMenu();

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
          <div className="flex gap-2 text-black">
            <FontAwesomeIcon
              icon={faEdit}
              fontSize={24}
              onClick={() => router.push(`/post/${categoryId}/write`)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              fontSize={24}
              onClick={() => router.push(`/post/${categoryId}/search`)}
            />
          </div>
        }
      />

      <ScrollView className="gap-2">
        {!posts.isLoading &&
          posts.data?.map((item) => (
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
              <PostCard {...item}/>
            </div>
          ))}
      </ScrollView>
    </>
  );
}
