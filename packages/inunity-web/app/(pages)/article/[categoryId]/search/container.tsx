"use client";

import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import { debounce } from "lodash";
import {
  QueryClientProvider,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import { Input } from "ui/src/Input";
import ArticleCard from "@/entities/article/ui/ArticleCard";
import { Chip, ScrollView } from "ui";

export default function ArticleSearchContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useNativeRouter();

  const [searchValue, setSearchValue] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const tags = ["전공", "취업", "창업", "학과", "학교", "응애"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const { articles: articleQuery } = useArticleSearchViewModel({
  //   categoryId,
  //   keyword: debouncedKeyword,
  //   tags: selectedTags,
  // });

  const queryOptions = ArticleQueries.infiniteArticleQuery({
    categoryId,
    keyword: debouncedKeyword,
    tags,
  });
  const articleQuery = useInfiniteQuery({ ...queryOptions });

  const articles = articleQuery.data?.pages?.flatMap((page) => page.content);

  const queryClient = useQueryClient();

  const search = useCallback(
    (term: string) => {
      console.log("searching", term);
      setDebouncedKeyword(term);
      queryClient.invalidateQueries();
    },
    [queryClient]
  );
  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      console.log(term);
      if (term.trim()) {
        search(term);
      } else {
        queryClient.setQueriesData({ queryKey: ["articles"] }, () => []);
      }
    }, 300), // 300ms delay
    [search]
  );

  const onReachBottom = useCallback(() => {
    console.log("loading next page!");
    if (!articleQuery.isFetching) articleQuery.fetchNextPage();
  }, [articleQuery]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* SearchBar Area Start */}
      <div className="flex flex-col items-start gap-4 p-5 bg-white">
        <FontAwesomeIcon
          icon={faChevronLeft}
          fontSize={24}
          onClick={router.back}
        />
        <Input
          value={searchValue}
          setValue={(v) => {
            setSearchValue(v);
            debouncedSearch(v);
          }}
          className="self-stretch"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          placeholder="검색어를 입력해주세요."
        />
        <div
          className="flex flex-row overflow-x-scroll gap-2 self-stretch text-nowrap pr-4"
          style={{
            mask: `
       linear-gradient(to right, 
      rgba(0,0,0, 1) 0,   rgba(0,0,0, 1) 90%, 
      rgba(0,0,0, 0) 100%, rgba(0,0,0, 0) 0
  ) 100% 100% / 100% 100% repeat-x
   `,
          }}
        >
          <Chip
            checked={selectedTags.length == tags.length}
            setChecked={(checked) => {
              // unselect all
              if (!checked) setSelectedTags([]);
              // select all
              else setSelectedTags(tags);
            }}
          >
            전체
          </Chip>
          {tags.map((tag) => (
            <Chip
              key={tag}
              checked={selectedTags.some((selectedTag) => selectedTag == tag)}
              setChecked={(checked) => {
                // unselect item
                if (!checked)
                  setSelectedTags((prev) =>
                    prev.filter((selectedTag) => selectedTag !== tag)
                  );
                // select item
                else setSelectedTags((prev) => [...prev, tag]);
              }}
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      {/* Article List Area Start */}
      <ScrollView
        className=" gap-3 pt-3"
        spinner={<ClipLoader />}
        onReachBottom={onReachBottom} // 최하단으로 스크롤됐을 때 이벤트. isLoading: false일 때 fetchNextPage() 호출해주기.
        onRefresh={() => {
          articleQuery.refetch();
        }}
      >
        {articleQuery.isRefetching && (
          <div className="flex flex-row justify-center">{<ClipLoader />}</div>
        )}
        {articles?.map((article) => (
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
        {articleQuery.isFetchingNextPage && (
          <div className="self-stretch flex justify-center flex-row">
            <ClipLoader size={50} />
          </div>
        )}
      </ScrollView>
    </div>
  );
}
