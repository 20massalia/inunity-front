"use client";

import React, { useState, useEffect } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";

interface ProfileData {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  companyHistory: {
    companyName: string;
    role: string;
    from: number;
    to: number;
  }[];
}

export default function MyDashboardPage() {
  const router = useNativeRouter();

  // 프로필 데이터 상태
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // API(fetch) 호출 대신 가짜 데이터 반환
  const fakeFetchProfile = async (targetId: string): Promise<ProfileData> => {
    return {
      id: targetId,
      name: targetId === "me" ? "김정아" : `사용자(${targetId})`,
      avatarUrl: "/images/frog-profile.png",
      bio: "문제를 찾고, 해결하는 것을 즐깁니다.",
      companyHistory: [
        { companyName: "네이버", role: "백엔드 개발", from: 2018, to: 2021 },
        {
          companyName: "카카오",
          role: "프론트엔드 개발",
          from: 2015,
          to: 2018,
        },
        {
          companyName: "삼성전자",
          role: "모바일 앱 개발",
          from: 2012,
          to: 2015,
        },
      ],
    };
  };

  // 데이터 로딩
  useEffect(() => {
    const loadProfile = async () => {
      const data = await fakeFetchProfile("me"); // 'me'로 가정
      setProfileData(data);
    };

    loadProfile();
  }, []);

  // 프로필 데이터 로딩 중 처리
  if (!profileData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* 상단 배너 */}
      <div className="bg-blue-900 w-full h-24 relative">
        {/* 프로필 이미지 */}
        <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white">
          <img
            src={profileData.avatarUrl || "/default-avatar.png"}
            alt="profile avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="mt-12 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{profileData.name}</h1>
        </div>
        <p className="text-gray-600">{profileData.bio}</p>

        {/* 작성한 글 섹션 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">작성한 글</h2>
          {/* 작성한 글 리스트 */}
          <ul className="mt-4">
            <li>글 제목 1</li>
            <li>글 제목 2</li>
          </ul>
        </div>

        {/* 작성한 댓글 섹션 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">작성한 댓글</h2>
          {/* 작성한 댓글 리스트 */}
          <ul className="mt-4">
            <li>댓글 내용 1</li>
            <li>댓글 내용 2</li>
          </ul>
        </div>

        {/* 공개 프로필로 이동 버튼 */}
        <div className="mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/profile")}
          >
            내 공개 프로필 보기
          </button>
        </div>
      </div>
    </div>
  );
}
