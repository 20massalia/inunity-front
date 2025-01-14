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
import { useQueryClient } from "@tanstack/react-query";

export default function MyCareer({ careerId }: { careerId: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [position, setPosition] = useState("");

  const router = useNativeRouter();
  const queryClient = useQueryClient();
  const { data: careers, isLoading } = useCareer(userId || 0);
  const { mutate: editCareer } = useEditCareer(userId || 0);

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

  useEffect(() => {
    if (!isLoading && careers) {
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
  }, [careers, careerId, isLoading]);

  const handleUpdate = () => {
    editCareer(
      {
        careerId,
        companyName,
        startDate,
        endDate,
        position,
      },
      {
        onSuccess: () => {
          console.log("수정 성공");

          queryClient.invalidateQueries({ queryKey: ["careers", userId] });
          queryClient.invalidateQueries({ queryKey: ["profile", userId] });
          router.back();
        },
        onError: (err) => {
          console.error("수정 실패:", err);
        },
      }
    );
  };

  return (
    <div className="flex-col items-center overflow-hidden">
      <AppBar
        center={<Typography variant="HeadingNormalBold">경력 관리</Typography>}
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
        rightIcon={
          <div
            className="w-fit text-sm font-medium whitespace-nowrap cursor-pointer"
            onClick={handleUpdate}
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
