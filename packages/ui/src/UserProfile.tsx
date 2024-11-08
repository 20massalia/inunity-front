import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


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

// Define theme constants
const COLORS = {
  background: 'bg-white',
  profileBackground: 'bg-[#eaddff]',
  profileIcon: '#6750A4',
  name: 'text-[#0f1419]',
  introduction: 'text-[#536471]',
  verifiedIcon: '#1DA1F2',
  menuIcon: 'text-gray-500',
  menuItem: 'text-gray-700',
  menuItemHover: 'hover:bg-gray-100',
};

const FONTS = {
  name: "font-medium",
  introduction: "font-normal",
};

const SIZES = {
  container: 'h-16',
  profile: 'w-10 h-10',
  gap: 'gap-[11px]',
  name: 'text-base leading-7',
  introduction: 'text-base leading-7',
  icon: 'w-5 h-5',
  menuIcon: 'w-6 h-6',
};

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
    <div className={`w-full ${SIZES.container} flex flex-row pb-4 ${COLORS.background} justify-between items-center ${SIZES.gap}`}>
      <div className="flex items-center">
        <div className={`${SIZES.profile} relative ${COLORS.profileBackground} rounded-[100px] flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={COLORS.profileIcon} style={{width: 48}}>
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className={`${COLORS.name} ${SIZES.name} ${FONTS.name} tracking-tight`}>{name}</div>
          <div className="justify-start items-center gap-1 inline-flex">
            <div className={`${COLORS.introduction} ${SIZES.introduction} ${FONTS.introduction} tracking-tight`}>{introduction}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={COLORS.verifiedIcon} className={SIZES.icon}>
              <path d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="relative" data-menu-id={id}>
          <button className="p-2" onClick={(e)=>{
            e.stopPropagation()
            onToggleMenu()
          }}>
         <FontAwesomeIcon icon={faEllipsisVertical} fontSize={24}/>
          </button>
          {isMenuOpen && actions && actions.length > 0 && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 text-sm ${COLORS.menuItem} ${COLORS.menuItemHover}`}
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
        </div>
      </div>
    </div>
  );
};
