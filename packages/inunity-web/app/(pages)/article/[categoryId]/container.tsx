"use client";

import {
  faChevronLeft,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, ScrollView, Typography, useMenu } from "ui";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import useArticles from "@/entities/article/hooks/useArticles";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import ArticleCard from "@/entities/article/ui/ArticleCard";
import useCategories from "@/entities/category/hooks/useCategories";

export default function ArticleListContainer({
  categoryId,
}: {
  categoryId: number;
}) {
  const router = useNativeRouter();

  const articleQuery = useArticles({categoryId});
  const articles = articleQuery.data?.pages.flatMap(page => page.content);
  const categroies = useCategories();
  const category = categroies.data?.find(category => category.id == categoryId);
  return (
    <>
      <AppBar
        center={
          <div className="flex flex-col">
            <Typography variant="HeadingNormalBold" className="text-center">
              {category?.name}
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
              onClick={() => router.push(`/article/${categoryId}/write`)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              fontSize={24}
              onClick={() => router.push(`/article/${categoryId}/search`)}
            />
          </div>
        }
      />
      <ScrollView className="gap-2 ">
        {!articleQuery.isLoading &&
          articles?.map((item) => (
            <ArticleCard
              key={item.articleId}
              {...item}
              bottomFeatureSlot={
                <>
                  <ToggleLikeIcon article={item} />
                  <ToggleBoomarkIcon article={item} />
                </>
              }
            />
          ))}
      </ScrollView>
    </>
  );
}
