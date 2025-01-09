import { faBookmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CardProps } from "./Card";


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
            {props.author ?? '익명'}
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
          {props.bottomFeatureSlot}
          {/* <FontAwesomeIcon
            icon={faBookmark}
            className={props.isBookmarked ? `text-primary` : "text-placeholder"}
            fontSize={18}
          />
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-placeholder"
            fontSize={18}
          /> */}
      </div>
    </div>
  );

}
