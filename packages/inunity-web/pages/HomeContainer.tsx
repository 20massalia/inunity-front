"use client";

import { useQuery } from "@tanstack/react-query";
import useHomeViewModel from "../components/viewModel/HomeViewModel";
import OutlinedListItem from "ui/src/OutlinedListItem";
import { Card, ScrollView, Typography, useMenu } from "ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPerson,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useMessageManager } from "../components/MessageContext";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "../components/AppBar";
import PostCard from "@/widgets/post/PostCard";
import NoticeCard from "@/widgets/notice/NoticeCard";

export default function HomeContainer() {
  // ViewModel 이용
  const {
    posts,
    schedules,
    notices,
    likePost,
    notifications,
    toggleBookmarkPost,
    toggleBookmarkNotice,
  } = useHomeViewModel();
  const { messageManager } = useMessageManager();

  useEffect(() => {
    messageManager?.log("HomeContainer initialized!");
  }, [messageManager]);

  const router = useNativeRouter();
  const { openMenuId, setOpenMenuId } = useMenu();

  return (
    <>
      <AppBar
        leftIcon={"title"}
        rightIcon={
          <div className="flex gap-3">
            <FontAwesomeIcon fontSize={24} icon={faSearch} />
            <div className="relative">
              <FontAwesomeIcon
                fontSize={24}
                icon={faBell}
                onClick={() => router.push("/notification")}
              />
              {(notifications.data?.length ?? 0) > 0 && (
                <div className=" absolute -bottom-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-white">
                  {notifications.data?.length}
                </div>
              )}
            </div>
            <FontAwesomeIcon fontSize={24} icon={faUser} />
          </div>
        }
      />
      <ScrollView className="bg-[#f8f8f8]  justify-start items-start flex ">
        <div className="self-stretch p-4 flex flex-col gap-2">
          <div className="self-stretch pt-6 pb-1 bg-[#f8f8f8] justify-between items-end inline-flex">
            <Typography variant="HeadingXLargeBold">학사 일정</Typography>
            <Typography variant="ParagraphNormalBold" className="text-primary">
              모두 보기
            </Typography>
          </div>

          {schedules.data?.map((schedule) => (
            <OutlinedListItem
              key={schedule.name}
              text={schedule.name}
              description={`${schedule.dateStart.toDateString()} - ${schedule.dateEnd?.toDateString()}`}
            />
          ))}
        </div>
        <div className="self-stretch px-4 pt-6 pb-1 bg-[#f8f8f8] justify-between items-end inline-flex">
          <Typography variant="HeadingXLargeBold">학과 공지</Typography>
          <Typography variant="ParagraphNormalBold" className="text-primary">
            모두 보기
          </Typography>
        </div>

        <div className="self-stretch text-pri p-4 justify-start items-start gap-4 inline-flex">
          {notices.data?.map((notice) => (
            <Card
              key={notice.content}
              content={notice.content}
              author={notice.author}
              fromUpdate={notice.date}
              isBookmarked={notice.isBookmarked}
              onToggleBookmark={() => {
                toggleBookmarkNotice.mutate(notice.postId);
              }}
              
            />
          ))}
        </div>
        <div className="self-stretch  flex-col justify-start items-start flex">
          <Typography variant="HeadingXLargeBold" className="px-4">
            인기 게시글
          </Typography>
          {posts.data?.map((post) => (
            <Card
              onClick={() => {
                // messageManager?.sendMessage(MessageEventType.Navigation, {path: '/detail'} as NavigationEvent)
                router.push("/post/1/1");
              }}
              key={post.postId}
              author={post.author}
              avatarUrl={post.avatarUrl}
              authorDescription={post.authorOrg}
              content={post.content}
              fromUpdate={post.date}
              likeCount={post.likes}
              bookmarkCount={post.bookmarks}
              onLikeToggle={function (): void {
                likePost.mutate(post.postId);
              }}
              onToggleBookmark={function (): void {
                toggleBookmarkPost.mutate(post.postId);
              }}
              isLiked={post.isLiked}
              isBookmarked={post.isBookmarked}
              variant="list"
            />
          ))}
        </div>
      </ScrollView>
    </>
  );
}
