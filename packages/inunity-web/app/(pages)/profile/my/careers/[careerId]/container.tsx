"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Input, Typography } from "ui";
import fetchExtended from "@/lib/fetchExtended";
import useCareer from "@/entities/profile/hooks/useCareer";
import useEditCareer from "@/features/profile/hooks/useEditCareer";
import usePostCareer from "@/features/profile/hooks/usePostCareer";
import { useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "@/shared/ui/LoadingOverlay";

interface MyCareerProps {
  // careerId가 없으면 생성 모드
  // 있으면 수정 모드로 간주
  careerId?: number;
}

export default function MyCareer({ careerId }: MyCareerProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useNativeRouter();
  const queryClient = useQueryClient();

  // 수정 모드인지 생성 모드인지 구분
  const isEditMode = !!careerId;

  const { mutate: editCareer } = useEditCareer(userId || 0);
  const { mutate: postCareer } = usePostCareer(userId || 0);
  const { data: careers, isLoading } = useCareer(isEditMode ? userId || 0 : 0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetchExtended<{ id: number }>(
          "/v1/users/information",
          {
            method: "GET",
            credentials: "include",
          }
        );
        setUserId(response.id);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // 수정 모드라면, 기존 경력 정보를 로컬 state에 세팅
  useEffect(() => {
    if (isEditMode && !isLoading && careers) {
      const career = careers.find((c) => c.careerId === Number(careerId));
      if (career) {
        setCompanyName(career.companyName || "");
        setStartDate(career.startDate || "");
        setEndDate(career.endDate || "");
        setPosition(career.position || "");
      } else {
        console.warn(`No career found for careerId: ${careerId}`);
      }
    }
  }, [careers, careerId, isLoading, isEditMode]);

  const handleSubmit = () => {
    if (!userId) {
      alert("유저 정보를 불러오지 못했습니다.");
      return;
    }

    setLoading(true);

    if (isEditMode) {
      // === 수정 모드 ===
      editCareer(
        {
          careerId: careerId!,
          companyName,
          startDate,
          endDate,
          position,
        },
        {
          onSuccess: () => {
            setLoading(false);
            console.log("수정 성공");
            queryClient.invalidateQueries({ queryKey: ["careers", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            router.back();
          },
          onError: (err) => {
            setLoading(false);
            console.error("수정 실패:", err);
          },
        }
      );
    } else {
      // === 생성 모드 ===
      postCareer(
        {
          companyName,
          startDate,
          endDate,
          position,
        },
        {
          onSuccess: () => {
            setLoading(false);
            console.log("생성 성공");
            queryClient.invalidateQueries({ queryKey: ["careers", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            router.back();
          },
          onError: (err) => {
            setLoading(false);
            console.error("생성 실패:", err);
          },
        }
      );
    }
  };

  return (
    <div className="flex-col items-center overflow-hidden">
      <LoadingOverlay isLoading={loading} />
      <AppBar
        center={
          <Typography variant="HeadingNormalBold">
            {isEditMode ? "경력 수정" : "경력 생성"}
          </Typography>
        }
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
        rightIcon={
          <div
            className="w-fit text-sm font-medium whitespace-nowrap cursor-pointer"
            onClick={handleSubmit}
          >
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
          <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
