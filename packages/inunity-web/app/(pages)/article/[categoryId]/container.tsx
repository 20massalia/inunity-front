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
import { useCallback } from "react";
import { ClipLoader } from "react-spinners";

export default function ArticleListContainer({
  categoryId,
}: {
  categoryId: number;
}) {
  const router = useNativeRouter();

  const articleQuery = useArticles({ categoryId });
  const articles = articleQuery.data?.pages.flatMap((page) => page.content);
  const categroies = useCategories();
  const category = categroies.data?.find(
    (category) => category.id == categoryId
  );
  const onReachBottom = useCallback(() => {
    console.log("loading next page!");
    if (!articleQuery.isFetching) articleQuery.fetchNextPage();
  }, [articleQuery]);

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
      <ScrollView
        className=" gap-3 pt-3"
        onReachBottom={onReachBottom} // 최하단으로 스크롤됐을 때 이벤트. isLoading: false일 때 fetchNextPage() 호출해주기.
        onRefresh={() => {
          articleQuery.refetch();
        }}
      >
        {articleQuery.isRefetching && (
          <div className="flex flex-row justify-center">{<ClipLoader />}</div>
        )}
        {!articleQuery.isLoading &&
          articles?.map((item) => (
            <ArticleCard
              key={item.articleId}
              {...item}
              bottomFeatureSlot={
                <>
                  <ToggleLikeIcon article={item} />
                </>
              }
            />
          ))}
        {articleQuery.isFetchingNextPage && (
          <div className="self-stretch flex justify-center flex-row">
            <ClipLoader size={50} />
          </div>
        )}
      </ScrollView>
    </>
  );
}
