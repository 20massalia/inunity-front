"use client";

import React, { useContext } from "react";
import { UserProfile } from "./UserProfile";
import { Typography } from "./Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useScrollView } from "./contexts/ScrollContext";
// Colors
const COLORS = {
  background: "bg-white",
  profileBackground: "bg-[#eaddff]",
  name: "text-[#0f1419]",
  department: "text-[#536471]",
  content: "text-[#3b3f43]",
  date: "text-[#536471]",
  border: "border-[#eff3f4]",
  stats: "text-[#0f1419]",
};

export interface ArticleListItemProps {
  title: string;
  avatarUrl?: string;
  name: string;
  department: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number;
  articleId: string;
  toggleLike?: (articleId: string) => void;
  toggleBookmark?: (articleId: string) => void;
  isLiked: boolean;
  isBookmarked: boolean;
  onClick?: () => void;
  isMenuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({
  title,
  name,
  department,
  content,
  date,
  likes,
  bookmarks,
  articleId,
  toggleLike,
  toggleBookmark,
  isLiked,
  isBookmarked,
  onClick,
  avatarUrl,
  isMenuOpened: isMenuOpen,
  setMenuOpened: setIsMenuOpen,
}) => {
  // const isMenuOpen = isMenuOpened
  // const setIsMenuOpen = (value: boolean) =>
  const scrollContext = useScrollView();
  return (
    <div
      onClick={onClick}
      className={` h-auto ${COLORS.background} px-4 py-3 flex-col justify-center items-start inline-flex self-stretch`}
    >
      <UserProfile
        profileImage={avatarUrl}
        name={name}
        introduction={department}
        id={0}
        actions={
          <DropdownMenu
            menuId={`article_${articleId}`}
            scrollContainerRef={scrollContext?.scrollContainerRef}
            actions={[
              {
                label: "수정",
                onClick: () => console.log("Edit Article clicked"),
              },
              {
                label: "Delete Article",
                onClick: () => console.log("Delete Article clicked"),
              },
              {
                label: "Report Article",
                onClick: () => console.log("Report Article clicked"),
              },
            ]}
          />
        }
      />
      <Typography
        variant="ParagraphNormalRegular"
        className={`self-stretch ${COLORS.content} line-clamp-2 overflow-hidden text-wrap text-ellipsis`}
      >
        {content}
      </Typography>
      <div
        className={`self-stretch pt-4 pb-6 justify-end items-start gap-1 inline-flex`}
      >
        <Typography variant="ParagraphNormalRegular" className={COLORS.date}>
          {date}
        </Typography>
      </div>
      <div className={`self-stretch h-px border ${COLORS.border}`}></div>
      <div className={`pl-2 pt-2 justify-start items-start inline-flex gap-2`}>
        <div className={`justify-start items-center flex`}>
          <div
            className={`flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike?.(articleId);
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`w-6 ${
                isLiked ? "text-blue-500" : "text-black"
              } cursor-pointer`}
            />
            <Typography
              variant="ParagraphNormalRegular"
              className={`${COLORS.stats} ${
                isLiked ? "text-blue-500" : "text-black"
              }`}
            >
              {likes}
            </Typography>
          </div>
        </div>
        <div className={`justify-start items-center flex`}>
          <div
            className={`flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark?.(articleId);
            }}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className={`w-6 ${
                isBookmarked ? "text-blue-500" : "text-black"
              } cursor-pointer`}
            />

            <Typography
              variant="ParagraphNormalRegular"
              className={`${COLORS.stats} ${
                isBookmarked ? "text-blue-500" : "text-black"
              }`}
            >
              {bookmarks}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
