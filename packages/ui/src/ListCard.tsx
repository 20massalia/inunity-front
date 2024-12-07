"use client";

import React, { useContext } from "react";
import { UserProfile } from "./UserProfile";
import { Typography } from "./Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useMenu } from "./contexts/MenuContext";
import { DropDownActionItem } from "./DropdownMenu";
import { CardProps } from "./Card";
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


export const ListCard: React.FC<CardProps> = ({
  avatarUrl,
  author,
  authorDescription,
  content,
  fromUpdate,
  likeCount = 0,
  bookmarkCount = 0,
  isLiked = false,
  isBookmarked = false,
  onLikeToggle,
  onToggleBookmark,
  onClick,
  className = "",

}) => {
    return (
    <div
      onClick={onClick}
      className={` h-auto ${COLORS.background} px-4 py-3 flex-col justify-center items-start inline-flex self-stretch ${className}`}
    >
      <UserProfile
        profileImage={avatarUrl}
        name={author}
        introduction={authorDescription}
        id={'test'}
        actions={[
          {
            label: "수정",
            onClick: () => console.log("Edit Post clicked"),
          },
          {
            label: "Delete Post",
            onClick: () => console.log("Delete Post clicked"),
          },
          {
            label: "Report Post",
            onClick: () => console.log("Report Post clicked"),
          },
        ]}
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
          {fromUpdate}
        </Typography>
      </div>
      <div className={`self-stretch h-px border ${COLORS.border}`}></div>
      <div className={`pl-2 pt-2 justify-start items-start inline-flex gap-2`}>
        <div className={`justify-start items-center flex`}>
          <div
            className={`flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              onLikeToggle?.();
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
              {likeCount}
            </Typography>
          </div>
        </div>
        <div className={`justify-start items-center flex`}>
          <div
            className={`flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
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
              {bookmarkCount}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
