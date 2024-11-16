import {
  faCheck,
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
  isVerified?: boolean;
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
  isVerified,
  onToggleMenu,
}: UserProfileProps) => {
  return (
    <div className="pb-4 bg-white flex justify-between items-center gap-2 flex-row w-full">
      <div className="flex gap-2">
        <div className=" flex justify-center items-center rounded-full w-12 aspect-square">
          <img
            src="https://github.com/squidjiny.png"
            className="rounded-full"
            style={{'WebkitUserSelect': 'none'}}
          />
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <Typography variant="HeadingNormalBold">{name}</Typography>
          <div className="justify-start items-center gap-1 inline-flex">
            <Typography className="text-body">{introduction}</Typography> {isVerified && <FontAwesomeIcon icon={faCheck} className="text-primary"/>}
          </div>
        </div>
      </div>
      {isMenuOpen && actions && actions.length > 0 && (
            <div className="absolute right-0 mt-2 w-48 bg-[rgba(250,250,250,1)] rounded-xl shadow-2xl z-10">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 text-sm border-b [&:not(:last-child)]:border-b-[#EFF3F4] hover:bg-[rgba(226,226,226)] last:rounded-b-xl first:rounded-t-xl`}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                    onToggleMenu();
                  }}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </button>
              ))}
            </div>
          )}

      <div
        className="w-6 h-6 relative"
        onClick={(e) => {
          e.stopPropagation();
          onToggleMenu();
        }}
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          fontSize={24}
          color={"#7E7E7E"}
        />
      </div>
    </div>
  );
};
