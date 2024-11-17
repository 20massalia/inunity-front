"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input, Chip } from "ui";
import PostListItem, { PostListItemProps } from "ui/src/PostListItem";

export default function Page() {
  const posts: PostListItemProps[] = [];
  const [searchValue, setSearchValue] = useState("");
  const tags = ["전공", "취업", "창업", "학과"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    console.log(selectedTags)
  }, [selectedTags])
  return (
    <div className="flex flex-col">
      {/* SearchBar Area Start */}
      <div className="flex flex-col items-start ">
        <FontAwesomeIcon icon={faChevronLeft} />
        <Input value={searchValue} setValue={setSearchValue} />
        <div className="flex flex-row overflow-x-scroll">
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
                console.log(checked)
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
      <div>
        {posts.map((post) => (
          <PostListItem key={post.name} {...post} />
        ))}
      </div>
    </div>
  );
}
