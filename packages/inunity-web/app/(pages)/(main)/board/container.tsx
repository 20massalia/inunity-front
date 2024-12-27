"use client";

import {
  faSearch,
  faClipboard,
  faClipboardList,
  faComments,
  faBriefcase,
  faHandHoldingHeart,
  faExclamationTriangle,
  faTrophy,
  faBook,
  faLaptopCode,
  faMicrochip,
  faSignal,
  IconName,
  fas,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library} from "@fortawesome/fontawesome-svg-core";
library.add(fas)
import React, { useState } from "react";
import { Divider, Input, SimpleListItem, Typography } from "ui";
import { useNativeRouter } from "@/hooks/useNativeRouter";


export default function BoardListContainer() {
  const [searchValue, setSearchValue] = useState("");

  const menus = [
    { id: "freeboard", text: "자유게시판", icon: "clipboard" },
    { id: "recruitmentboard", text: "모집 게시판", icon: "clipboard-list" },
    { id: "qnaboard", text: "질문 게시판", icon: "comments" },
    { id: "jobreviews", text: "취업후기 게시판", icon: "briefcase" },
    { id: "tradeshare", text: "거래/나눔 게시판", icon: "hand-holding-heart" },
    { id: "lostandfound", text: "분실물 게시판", icon: "exclamation-triangle" },
    { id: "contestsevents", text: "대회 및 공모전", icon: "trophy" },
    { id: "itcollege", text: "정보기술대", icon: "book" },
    { id: "computerscience", text: "컴퓨터공학부", icon: "laptop-code" },
    { id: "embeddedsystems", text: "임베디드시스템공학과", icon: "microchip" },
    { id: "infocomm", text: "정보통신공학과", icon: "signal" },
  ];
  const router = useNativeRouter();

  return (
    <div className=" bg-gray-50">
      <div className="self-stretch grow shrink basis-0 bg-gray-50 flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch p-5 py-2 bg-white flex-col justify-start items-start gap-2.5 flex">
          <Typography variant="HeadingXLargeBold">게시판</Typography>
          <Input
            value={searchValue}
            setValue={setSearchValue}
            leftIcon={<FontAwesomeIcon icon={faSearch} />}
            className="self-stretch"
            placeholder="게시판을 검색해보세요.."
          />
        </div>
        <div className="bg-white self-stretch p-5 flex flex-col gap-4">
          {menus.map((menu) => (
            <SimpleListItem
              text={menu.text}
              key={menu.id}
              leftIcon={<FontAwesomeIcon icon={menu.icon as IconName} />}
              onClick={() => {
                router.push(`/article/${menu.id}`)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}