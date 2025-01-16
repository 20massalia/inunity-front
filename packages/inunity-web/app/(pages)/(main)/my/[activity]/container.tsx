"use client";

import {
  ArticleListItemProps,
  ScrollView,
  SwipeableTabs,
  Typography,
} from "ui";
import NotificationItem from "@/features/notification/ui/NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import useArticles from "@/entities/article/hooks/useArticles";
import ArticleCard from "@/entities/article/ui/ArticleCard";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import { useState } from "react";
import useWrittenArticles from "@/entities/article/hooks/useWrittenArticles";
import useWrittenComments from "@/entities/comment/hooks/useWrittenComments";

const activities = ["article", "comment"];
export default function ActivityListContainer({
  activity,
}: {
  activity: "article" | "comment";
}) {
  const router = useNativeRouter();
  const articles = useWrittenArticles();
  const comments = useWrittenComments();

  const tabIndex = activities.findIndex((v) => v == activity);

  return (
    <>
      <AppBar
        center={<Typography variant="HeadingNormalBold">내 활동</Typography>}
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
      />
      <SwipeableTabs
        activeTab={tabIndex}
        setActiveTab={(tab) => {
          router.replace(
            activities[typeof tab === "function" ? tab(tabIndex) : tab]
          );
        }}
        tabs={[
          {
            id: 0,
            title: "작성글",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                <ScrollView>
                  {articles.data?.pages
                    .flatMap((page) => page.content)
                    .map((article) => (
                      <ArticleCard
                        {...article}
                        key={article.articleId}
                        bottomFeatureSlot={
                          <>
                            <ToggleLikeIcon article={article} />
                            <ToggleBoomarkIcon article={article} />
                          </>
                        }
                      />
                    ))}
                </ScrollView>
              </div>
            ),
          },
          {
            id: 1,
            title: "댓글단 글",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                <ScrollView>
                  {comments.data?.map((comment) => (
                    <ArticleCard
                      key={comment.commentId}
                      title={""}
                      userId={0}
                      department={""}
                      nickname={""}
                      isAnonymous={false}
                      articleId={0}
                      content={comment.content}
                      createAt={comment.createAt!}
                      updatedAt={comment.createAt!}
                      commentNum={0}
                      likeNum={0}
                      isLiked={false}
                      userImageUrl={""}
                    />
                  ))}
                </ScrollView>
              </div>
            ),
          },
        ]}
      ></SwipeableTabs>
    </>
  );
}
