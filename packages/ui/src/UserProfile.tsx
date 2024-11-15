import {
  faEllipsis,
  faEllipsisVertical,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Typography } from "./Typography";

export interface UserProfileProps {
  /** 사용자 프로필 이미지 */
  profileImage: string;
  /** 사용자 이름 */
  name: string;
  /** 사용자 소개 */
  introduction: string;
  /** 드롭다운 메뉴 아이템 */
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
  /** Unique identifier for each UserProfile */
  id: string;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

/** 글, 댓글에서 사용자 프로필 컴포넌트 */
export const UserProfile = ({
  profileImage,
  name,
  introduction,
  actions,
  id,
  isMenuOpen,
  onToggleMenu,
}: UserProfileProps) => {
  return (
    <div className="pb-4 bg-white flex justify-between items-center gap-2 flex-row w-full">
      <div className="flex gap-2">
        <div className=" flex justify-center items-center rounded-full w-12 aspect-square">
          <img src="https://github.com/squidjiny.png" className="rounded-full"/>
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          
          <Typography variant="HeadingNormalBold">
            {name}
          </Typography>
          <div className="justify-start items-center gap-1 inline-flex">
            <Typography className="text-body">
              {introduction}
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-6 h-6 relative">
        <FontAwesomeIcon icon={faEllipsisVertical} fontSize={24} color={"#7E7E7E"} onClick={onToggleMenu} />
      </div>
    </div>
  );
};
