"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Input, Typography } from "ui";

export default function MyProjects() {
  const [projectName, setProjectName] = useState("프로젝트 이름");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [position, setPosition] = useState("백엔드 개발자");
  const [github, setGithub] = useState("https://github.com/example");
  const [notion, setNotion] = useState("https://notion.so/example");

  const router = useNativeRouter();

  return (
    <div className="flex-col items-center overflow-hidden">
      <AppBar
        center={
          <Typography variant="HeadingNormalBold">프로젝트 관리</Typography>
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
          <Typography variant="HeadingSmallBold">프로젝트 이름</Typography>
          <Input
            value={projectName}
            setValue={setProjectName}
            placeholder="프로젝트 이름을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">진행 기간</Typography>
          <div className="flex gap-4">
            <Input
              value={startDate}
              setValue={setStartDate}
              placeholder="시작 일자"
              type="date"
            />
            <Input
              value={endDate}
              setValue={setEndDate}
              placeholder="종료 일자"
              type="date"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">포지션</Typography>
          <Input
            value={position}
            setValue={setPosition}
            placeholder="포지션을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">URL</Typography>
          <div className="flex gap-4">
            <Input
              value={github}
              setValue={setGithub}
              placeholder="Github URL을 입력하세요"
            />
            <Input
              value={notion}
              setValue={setNotion}
              placeholder="Notion URL을 입력하세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
