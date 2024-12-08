"use client";

import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input, Chip, PostListItem, useMenu, ScrollView } from "ui";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import usePost from "@/entities/post/hooks/usePost";

export default function PostSearchContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useNativeRouter();

  const [searchValue, setSearchValue] = useState("");
  const tags = ["전공", "취업", "창업", "학과", "학교", "응애"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const posts = usePost();

  const { openMenuId, setOpenMenuId } = useMenu();
  return (
    <div className="h-full flex flex-col">
      {/* SearchBar Area Start */}
      <div className="flex flex-col items-start gap-4 p-5 bg-white">
        <FontAwesomeIcon icon={faChevronLeft} onClick={router.back} />
        <Input
          value={searchValue}
          setValue={setSearchValue}
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
      {/* Post List Area Start */}
      <ScrollView className="bg-gray-50 gap-3 pt-3">
        {posts.data?.map((post) => (
          <PostListItem
            name={post.author}
            department={post.authorOrg}
            isMenuOpened={openMenuId == `post_${post.postId}`}
            setMenuOpened={function (opened: boolean): void {
              setOpenMenuId(opened ? `post_${post.postId}` : null);
            }}
            key={post.postId}
            {...post}
          />
        ))}
      </ScrollView>
    </div>
  );
}
