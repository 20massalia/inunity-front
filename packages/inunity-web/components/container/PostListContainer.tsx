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
import { PostListItem, ScrollView, Typography, useMenu } from "ui";
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
              <PostListItem
                name={item.author}
                department={item.authorOrg}
                content={item.content}
                date={item.date}
                likes={item.likes}
                bookmarks={item.bookmarks}
                postId={item.postId}
                toggleLike={function (postId: string): void {
                  toggleLike.mutate(postId);
                }}
                toggleBookmark={function (postId: string): void {
                  toggleBookmark.mutate(postId);
                }}
                isLiked={item.isLiked}
                isBookmarked={item.isBookmarked}
                title={item.title}
                isMenuOpened={openMenuId == `post_${item.postId}`}
                setMenuOpened={(opened) => {
                  setOpenMenuId(opened ? `post_${item.postId}` : null);
                }}
              />
            </div>
          ))}
      </ScrollView>
    </>
  );
}
