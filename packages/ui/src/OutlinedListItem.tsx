import React from "react";

export type OutlinedListItemProps = {
    text: string;
    description?: string;
}

export default function OutlinedListItem({text, description}: OutlinedListItemProps) {
    
    return   <div className="self-stretch px-4 justify-start items-center gap-2 inline-flex">
    <div className="grow shrink basis-0 h-[52px] p-4 bg-white rounded-lg border border-black/10 justify-start items-start gap-1 flex">
        <div className="grow shrink basis-0 text-black text-[15px] font-extrabold  leading-tight">{text}</div>
        <div className="text-black/50 text-[15px] font-normal  leading-tight">{description}</div>
    </div>
</div>
  
}