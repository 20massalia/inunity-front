"use client";

import { usePlatform } from "@/hooks/usePlatform";
import {
  faChevronLeft,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageEventType } from "message-type/message-type";
import { Card, ScrollView, Typography, useMenu } from "ui";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { useMessageManager } from "@/shared/ui/MessageContext";
import AppBar from "@/widgets/AppBar";
import usePost from "@/entities/post/hooks/usePost";
import PostCard from "@/entities/post/ui/PostCard";
import usePosts from "@/entities/post/hooks/usePosts";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";

export default function PostListContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useNativeRouter();

  const posts = usePosts();

  return (
    <>
      <AppBar
        center={
          <div className="flex flex-col">
            <Typography className="text-xs font-bold text-center">
              컴퓨터공학부
            </Typography>
            <Typography variant="HeadingNormalBold" className="text-center">
              공지사항
            </Typography>
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
      <ScrollView className="gap-2 ">
        {!posts.isLoading &&
          posts.data?.map((item) => (
            <PostCard
              key={item.postId}
              {...item}
              bottomFeatureSlot={
                <>
                  <ToggleLikeIcon post={item} />
                  <ToggleBoomarkIcon post={item} />
                </>
              }
            />
          ))}
      </ScrollView>
    </>
  );
}
