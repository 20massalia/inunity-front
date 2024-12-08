import React from "react";
import { ListCard } from "./ListCard";
import DetailedCard from "./DetailedCard";

export type CardVariant = "list" | "detailed";

export interface CardProps<T extends CardVariant> {
  variant?: T;
  // 기존 두 컴포넌트의 모든 프로퍼티를 포함
  author: string;
  fromUpdate: string;
  title?: string;
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

export function Card<T extends CardVariant = "list">(props: CardProps<T>) {
  const { variant, ...cardProps } = props;

  if (variant === "list") {
    return <ListCard   {...cardProps} />;
  }

  return <DetailedCard {...cardProps} />;
}
