"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Input, Typography } from "ui";

export default function MyCareers() {
  const [companyName, setCompanyName] = useState("개굴컴퍼니");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [position, setPosition] = useState("백엔드 개발자");
  const [role, setRole] = useState("데이터베이스 설계 및 API 개발");

  const router = useNativeRouter();

  return (
    <div className="flex-col items-center overflow-hidden">
      <AppBar
        center={<Typography variant="HeadingNormalBold">경력 관리</Typography>}
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
          <Typography variant="HeadingSmallBold">회사명</Typography>
          <Input
            value={companyName}
            setValue={setCompanyName}
            placeholder="회사명을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">업무 기간</Typography>
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
          <Typography variant="HeadingSmallBold">직무</Typography>
          <Input
            value={role}
            setValue={setRole}
            placeholder="직무를 입력하세요"
          />
        </div>
      </div>
    </div>
  );
}
