import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEllipsisVertical, faHeart, faList } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
    return <div className="w-[300px] p-3 bg-white rounded border border-black/10 flex-col justify-start items-start inline-flex">
    <img className="h-32 relative" />
    <div className="self-stretch  pt-4 bg-white flex-col justify-start items-start gap-2 flex">
        <div className="justify-start items-center gap-2 inline-flex">
            <img className="w-5 h-5 relative rounded-[360px]" />
            <div className="text-black/50 text-base font-bold ">학사관리팀</div>
            <div className="text-black/50 text-[15px] font-extrabold  leading-tight">·</div>
            <div className="text-black/50 text-base font-bold ">1일 전</div>
        </div>
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-black text-lg font-bold ">2023학년도 2학기 수강신청 안내</div>
        </div>
        <div className="self-stretch text-black/50 text-sm font-medium ">2023학년도 2학기 수강신청이 시작됩니다...</div>
        <div className="self-stretch pt-2 justify-between items-start inline-flex">
            <div className="justify-start items-center gap-2 flex">
                <FontAwesomeIcon icon={faHeart}/>
                <div className="text-black text-sm font-bold ">12</div>
            </div>
            <div className="justify-start items-start gap-4 flex">
                <FontAwesomeIcon icon={faBookmark}/>
                <FontAwesomeIcon icon={faEllipsisVertical}/>

            </div>
        </div>
    </div>
</div>
}