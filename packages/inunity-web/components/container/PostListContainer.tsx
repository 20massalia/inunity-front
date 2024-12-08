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
import { useMessageManager } from "../MessageContext";
import AppBar from "../AppBar";
import usePostListViewModel from "../viewModel/PostListViewModel";
import { useNativeRouter } from "@/hooks/useNativeRouter";

export default function PostListContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useNativeRouter();

  const messageManager = useMessageManager();
  const { posts, toggleLike, toggleBookmark } = usePostListViewModel();

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
              <Card
                author={item.author}
                authorDescription={item.authorOrg}
                content={item.content}
                fromUpdate={item.date}
                likeCount={item.likes}
                bookmarkCount={item.bookmarks}
                onLikeToggle={function (): void {
                  toggleLike.mutate(item.postId);
                }}
                onToggleBookmark={function (): void {
                  toggleBookmark.mutate(item.postId);
                }}
                isLiked={item.isLiked}
                isBookmarked={item.isBookmarked}
              />
            </div>
          ))}
      </ScrollView>
    </>
  );
}
