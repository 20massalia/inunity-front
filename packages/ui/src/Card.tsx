import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEllipsisVertical,
  faHeart,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { ListCard } from "./ListCard";
import { DropDownActionItem } from "./DropdownMenu";

export type CardVariant = 'list' | 'detailed';

export interface CardProps<T extends CardVariant = 'list'> {
  variant?: T;
  // 기존 두 컴포넌트의 모든 프로퍼티를 포함
  author: string;
  fromUpdate: string;
  title?: T extends 'detailed' ? string|undefined : undefined;
  content: string;
  isBookmarked: boolean;
  thumbnailUrl?: string;
  avatarUrl?: string;
  // ArticleListCard에서 추가된 프로퍼티들
  authorDescription?: string;
  likeCount?: number;
  bookmarkCount?: number;
  isLiked?: boolean;
  onClick?: () => void;
  className?: string;
  profileSlot?: ReactNode
  bottomFeatureSlot?: ReactNode
  actions?:ReactNode
}

export function Card(props: CardProps) {
  const { variant = 'detailed', ...cardProps } = props;

  if (variant === 'list') {
    return <ListCard {...cardProps} />;
  }

  return <DetailedCard {...cardProps} />;
}



export function DetailedCard(props: CardProps) {
  return (
    <div className="p-3 bg-white rounded border border-black/10 flex flex-col h-full">
      <img 
        className="h-32 w-full object-cover"
        src={props.thumbnailUrl ?? "https://via.placeholder.com/276x128"} 
        alt=""
      />
      <div className="flex flex-col flex-grow gap-2 pt-4">
        <div className="flex items-center gap-2">
          <img
            className="w-5 h-5 rounded-full"
            src={props.avatarUrl ?? "/avatar.png"}
            alt=""
          />
          <div className="text-black/50 text-base font-bold">
            {props.author}
          </div>
          <div className="text-black/50 text-[15px] font-extrabold leading-tight">
            ·
          </div>
          <div className="text-black/50 text-base font-bold">
            {props.fromUpdate}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="grow shrink basis-0 text-black text-lg font-bold">
            {props.title}
          </div>
        </div>
        <div className="text-black/50 text-sm font-medium w-[70vw] line-clamp-3">
          {props.content}
        </div>
        <div className="flex justify-end items-start gap-4 pt-2 mt-auto">
          <FontAwesomeIcon
            icon={faBookmark}
            className={props.isBookmarked ? `text-primary` : "text-placeholder"}
            fontSize={18}
          />
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-placeholder"
            fontSize={18}
          />
        </div>
      </div>
    </div>
  );

}
