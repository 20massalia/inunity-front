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
import { DetailedCard } from "./DetailedCard";

export type CardVariant = "list" | "detailed";

export interface CardProps<T extends CardVariant> {
  variant?: T;
  // 기존 두 컴포넌트의 모든 프로퍼티를 포함
  author: string;
  fromUpdate: string;
  title?: T extends "detailed" ? string | undefined : undefined;
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
  profileSlot?: ReactNode;
  bottomFeatureSlot?: ReactNode;
  actions?: ReactNode;
}

export function Card<T extends CardVariant>(props: CardProps<T>) {
  const { variant = "detailed", ...cardProps } = props;

  if (variant === "list") {
    return <ListCard {...cardProps} title={undefined} />;
  }

  return <DetailedCard {...cardProps} />;
}
