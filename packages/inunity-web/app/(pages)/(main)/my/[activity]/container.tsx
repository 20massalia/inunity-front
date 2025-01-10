"use client";

import { ArticleListItemProps, ScrollView, SwipeableTabs, Typography } from "ui";
import NotificationItem from "@/features/notification/ui/NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import useNotification from "@/features/notification/hooks/useNotification";
import useArticles from "@/entities/article/hooks/useArticles";
import ArticleCard from "@/entities/article/ui/ArticleCard";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import { useState } from "react";

export default function ActivityListContainer({
  activity,
}: {
  activity: "article" | "comment";
}) {
  const router = useNativeRouter();
  const articleQuery = useArticles();
  const [activeTab, setActiveTab] = useState(activity == 'article' ? 0 : 1);
  return (
    <>
      <AppBar
        center={<Typography variant="HeadingNormalBold">내 활동</Typography>}
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
      />
      <SwipeableTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
        tabs={[
          {
            id: 0,
            title: "작성글",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                <ScrollView>

                {articleQuery.data?.pages
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
            title: "시스템",
            content: <div className="p-5 gap-3 flex flex-col"></div>,
          },
        ]}
      ></SwipeableTabs>
    </>
  );
}
