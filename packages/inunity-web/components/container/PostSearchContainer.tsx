"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input, Chip } from "ui";
import PostListItem, { PostListItemProps } from "ui/src/PostListItem";

export default function PostSearchContainer() {
  const posts: PostListItemProps[] = [
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },
    {
      name: "학과사무실",
      department: "컴퓨터공학부",
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      likes: 0,
      bookmarks: 0,
      postId: "",
      isLiked: false,
      isBookmarked: false,
    },

  ];
  const [searchValue, setSearchValue] = useState("");
  const tags = ["전공", "취업", "창업", "학과", "학교", "응애"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);
  return (
    <div className="h-full flex flex-col">
      {/* SearchBar Area Start */}
      <div className="flex flex-col items-start gap-4 p-5 bg-white">
        <FontAwesomeIcon icon={faChevronLeft} />
        <Input
          value={searchValue}
          setValue={setSearchValue}
          className="self-stretch"
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
      <div className="bg-gray-50 h-full gap-3 pt-3 overflow-y-scroll">
        {posts.map((post) => (
          <PostListItem key={post.name} {...post} />
        ))}
      </div>
    </div>
  );
}
