"use client";

import { useQuery } from "@tanstack/react-query";
import PostListItem from "ui/src/PostListItem";
import useHomeViewModel from "../viewModel/HomeViewModel";
import OutlinedListItem from "ui/src/OutlinedListItem";
import { ScrollView, Typography } from "ui";
import Card from "ui/src/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPerson,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useMessageManager } from "../MessageContext";
import {
  MessageEventType,
  NavigationEvent,
  PostDetailPageEventType,
} from "message-type/message-type";
import { useRouter } from "next/navigation";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "../AppBar";

export default function HomeContainer() {
  // ViewModel 이용
  const { posts, schedules, likePost, bookmarkPost } = useHomeViewModel();
  const { messageManager } = useMessageManager();

  useEffect(() => {
    messageManager?.log("HomeContainer initialized!");
  }, [messageManager]);

  const router = useNativeRouter();

  return (
    <>
      <AppBar
        leftIcon={"title"}
        rightIcon={
          <div className="flex gap-3">
            <FontAwesomeIcon fontSize={24} icon={faSearch} />
            <FontAwesomeIcon
              fontSize={24}
              icon={faBell}
              onClick={() => router.push("/notification")}
            />
            <FontAwesomeIcon fontSize={24} icon={faUser} />
          </div>
        }
      />
      <ScrollView className="self-stretch grow shrink basis-0 bg-[#f8f8f8] flex-col justify-start items-start flex ">
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
          <Card />
        </div>
        <div className="self-stretch  flex-col justify-start items-start flex">
          <Typography variant="HeadingXLargeBold" className="px-4">인기 게시글</Typography>
          {posts.data?.map((post) => (
            <PostListItem
              onClick={() => {
                // messageManager?.sendMessage(MessageEventType.Navigation, {path: '/detail'} as NavigationEvent)
                router.push("/post/1/1");
              }}
              key={post.postId}
              name={post.name}
              department={post.department}
              content={post.content}
              date={post.date}
              likes={post.likes}
              bookmarks={post.bookmarks}
              postId={post.postId}
              toggleLike={function (postId: string): void {
                likePost.mutate(postId);
              }}
              toggleBookmark={function (postId: string): void {
                bookmarkPost.mutate(postId);
              }}
              isLiked={post.isLiked}
              isBookmarked={post.isBookmarked}
            />
          ))}
        </div>
      </ScrollView>
      </>
        );
}
