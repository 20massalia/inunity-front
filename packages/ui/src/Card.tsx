import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEllipsisVertical,
  faHeart,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { ListCard } from "./ListCard";

export type CardVariant = 'list' | 'detailed';

export interface CardProps<T extends CardVariant = 'list'> {
  variant?: T;
  // 기존 두 컴포넌트의 모든 프로퍼티를 포함
  author: string;
  fromUpdate: string;
  title?: T extends 'detailed' ? string|undefined : undefined;
  content: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  thumbnailUrl?: string;
  avatarUrl?: string;
  // PostListCard에서 추가된 프로퍼티들
  authorDescription?: string;
  likeCount?: number;
  bookmarkCount?: number;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  onClick?: () => void;
  className?: string;
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
    <div className="w-[300px] p-3 bg-white rounded border border-black/10 flex-col justify-start items-start inline-flex">
      <img className="h-32 relative" src={props.thumbnailUrl ?? "https://via.placeholder.com/276x128"} />
      <div className="self-stretch  pt-4 bg-white flex-col justify-start items-start gap-2 flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <img
            className="w-5 h-5 relative rounded-[360px]"
            src={props.avatarUrl ?? "/avatar.png"}
          />
          <div className="text-black/50 text-base font-bold ">
            {props.author}
          </div>
          <div className="text-black/50 text-[15px] font-extrabold  leading-tight">
            ·
          </div>
          <div className="text-black/50 text-base font-bold ">
            {props.fromUpdate}
          </div>
        </div>
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          <div className="grow shrink basis-0 text-black text-lg font-bold ">
            {props.title}
          </div>
        </div>
        <div className="self-stretch text-black/50 text-sm font-medium ">
          {props.content}
        </div>
        <div className="self-stretch pt-2 justify-end items-start inline-flex gap-4">
          <FontAwesomeIcon
            icon={faBookmark}
            className={props.isBookmarked ? `text-primary` : "text-placeholder"}
            fontSize={18}
            onClick={props.onToggleBookmark}
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
