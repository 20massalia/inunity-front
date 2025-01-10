"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Input, Typography } from "ui";

export default function MySkills() {
  const [skillName, setSkillName] = useState("React");
  const [skillLevel, setSkillLevel] = useState("중");

  const router = useNativeRouter();

  return (
    <div className="flex-col items-center overflow-hidden">
      <AppBar
        center={
          <Typography variant="HeadingNormalBold">사용 기술 관리</Typography>
        }
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
        rightIcon={
          <div className="w-fit text-sm font-medium whitespace-nowrap">
            완료
          </div>
        }
      />

      <div className="self-stretch flex flex-col items-start gap-6 px-5 py-4">
        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">기술 이름</Typography>
          <Input
            value={skillName}
            setValue={setSkillName}
            placeholder="기술 이름을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">기술 수준</Typography>
          <div className="flex gap-4">{/* 기술 수준 입력 */}</div>
        </div>
      </div>
    </div>
  );
}
