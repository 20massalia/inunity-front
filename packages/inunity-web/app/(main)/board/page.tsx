"use client";
import {
    faBook,
    faBriefcase,
  faChevronRight,
  faClipboard,
  faClipboardList,
  faComments,
  faExclamationTriangle,
  faHandHoldingHeart,
  faLaptopCode,
  faMicrochip,
  faSearch,
  faSignal,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Divider, Input, Typography } from "ui";

export type SimpleListItemType = "button" | "toggle" | "text";
export type SimpleListItemProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  type?: SimpleListItemType;
};
export function SimpleListItem({
  rightIcon,
  leftIcon,
  text,
  onClick,
  type = "button",
}: SimpleListItemProps) {
  return (
    <div className="justify-between items-center flex flex-row flex-1">
      <div className="flex flex-row gap-3">
        <div className="w-5 h-5 relative">{leftIcon}</div>
        <Typography variant="ParagraphLargeBold">{text}</Typography>
      </div>
      <div>
        {type == "button" ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          rightIcon
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className=" bg-gray-50">
      <div className="self-stretch grow shrink basis-0 bg-gray-50 flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-5 py-2.5 bg-white flex-col justify-start items-start gap-2.5 flex">
          <Typography variant="HeadingXLargeBold">게시판</Typography>
          <Input
            value={searchValue}
            setValue={setSearchValue}
            leftIcon={<FontAwesomeIcon icon={faSearch} />}
            className="self-stretch"
            placeholder="게시판을 검색해보세요.."
          />
        </div>
        <div className="bg-white self-stretch p-5 flex flex-col gap-6">
          <SimpleListItem
            text="자유게시판"
            leftIcon={<FontAwesomeIcon icon={faClipboard} />}
          />
          <SimpleListItem
            text="모집 게시판"
            leftIcon={<FontAwesomeIcon icon={faClipboardList} />}
          />
          <SimpleListItem
            text="질문 게시판"
            leftIcon={<FontAwesomeIcon icon={faComments} />}
          />
          <SimpleListItem
            text="취업후기 게시판"
            leftIcon={<FontAwesomeIcon icon={faBriefcase} />}
          />
          <SimpleListItem
            text="거래/나눔 게시판"
            leftIcon={<FontAwesomeIcon icon={faHandHoldingHeart} />}
          />
          <SimpleListItem
            text="분실물 게시판"
            leftIcon={<FontAwesomeIcon icon={faExclamationTriangle} />}
          />
          <SimpleListItem
            text="대회 및 공모전"
            leftIcon={<FontAwesomeIcon icon={faTrophy} />}
          />
          <Divider/>
          <SimpleListItem
            text="정보기술대"
            leftIcon={<FontAwesomeIcon icon={faBook} />}
          />
          <SimpleListItem
            text="컴퓨터공학부"
            leftIcon={<FontAwesomeIcon icon={faLaptopCode} />}
          />
          <SimpleListItem
            text="임베디드시스템공학과"
            leftIcon={<FontAwesomeIcon icon={faMicrochip} />}
          />
          <SimpleListItem
            text="정보통신공학과"
            leftIcon={<FontAwesomeIcon icon={faSignal} />}
          />
        </div>
      </div>
    </div>
  );
}
