"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Input, Typography } from "ui";
import fetchExtended from "@/lib/fetchExtended";
import usePortfolio from "@/entities/profile/hooks/usePortfolio";
import useEditPortfolio from "@/features/profile/hooks/useEditPortfolio";
import { useQueryClient } from "@tanstack/react-query";

export default function MyPortfolio({ portfolioId }: { portfolioId: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");

  const router = useNativeRouter();
  const queryClient = useQueryClient();
  const { data: portfolios, isLoading } = usePortfolio(userId || 0);
  const { mutate: editPortfolio } = useEditPortfolio(userId || 0);

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
    if (!isLoading && portfolios) {
      const portfolio = portfolios.find(
        (p) => p.portfolioId === Number(portfolioId)
      );
      if (portfolio) {
        setTitle(portfolio.title || "");
        setStartDate(portfolio.startDate || "");
        setEndDate(portfolio.endDate || "");
        setUrl(portfolio.url || "");
      } else {
        console.warn("Portfolio not found for portfolioId:", portfolioId);
      }
    }
  }, [portfolios, portfolioId, isLoading]);

  const handleUpdate = () => {
    editPortfolio(
      {
        portfolioId,
        title,
        startDate,
        endDate,
        url,
      },
      {
        onSuccess: () => {
          console.log("수정 성공");

          queryClient.invalidateQueries({ queryKey: ["portfolios", userId] });
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
        center={
          <Typography variant="HeadingNormalBold">프로젝트 관리</Typography>
        }
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
        rightIcon={
          <div
            className="w-fit text-sm font-medium whitespace-nowrap"
            onClick={handleUpdate}
          >
            완료
          </div>
        }
      />

      <div className="self-stretch flex flex-col items-start gap-6 px-5 py-4">
        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">프로젝트 이름</Typography>
          <Input
            value={title}
            setValue={setTitle}
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
          <Typography variant="HeadingSmallBold">URL</Typography>
          <div className="flex gap-4">
            <Input
              value={url}
              setValue={setUrl}
              placeholder="URL을 입력하세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
