import { faBookmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CardProps } from "./Card";

export default function DetailedCard(props: CardProps<'detailed'>) {
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
        {props.bottomFeatureSlot}
      </div>
    </div>
  );
}
