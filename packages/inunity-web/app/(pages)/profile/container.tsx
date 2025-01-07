"use client";

import React, { useEffect, useState } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { SwipeableTabs, Tab } from "ui";
import { DropdownMenu } from "ui/src/DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faChevronLeft,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

interface CompanyHistory {
  companyName: string;
  job: string;
  role: string;
  from: number;
  to: number;
}

interface ProjectHistory {
  title: string;
  period: string;
  link: string;
}

interface Skill {
  name: string;
  level: string;
}

interface ProfileData {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  company?: string;
  role?: string;
  companyHistory: CompanyHistory[];
  projectHistory: ProjectHistory[];
  skill: Skill[];
}

interface ProfileContainerProps {
  userId?: string;
  ogData?: Array<{
    title?: string;
    description?: string;
    image?: string;
    url: string;
  }>;
}

/**
 * @param userId
 *   - 없으면 "내 프로필" 모드
 *   - 있으면 userId에 해당하는 "타인 프로필" 모드
 */
export default function ProfileContainer({
  userId,
  ogData = [],
}: ProfileContainerProps) {
  const router = useNativeRouter();
  const [token, setToken] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // userId가 없으면 내 프로필(수정 가능), 있으면 해당 userId 프로필(수정 불가능)
  // 실제 로직은 token 등에 따라 isOwner를 판별
  const isOwner = true;

  useEffect(() => {
    // 1. 브라우저 쿠키에서 access token(또는 refresh token) 꺼내기
    const cookieString = document.cookie;
    let found: string | undefined;
    cookieString.split(";").forEach((c) => {
      const trimmed = c.trim();
      if (trimmed.startsWith("accessToken=")) {
        found = trimmed.split("=")[1];
      }
    });
    if (found) {
      setToken(found);
    }

    // 2. 임시 가짜 데이터
    const fakeFetchProfile = async (targetId: string) => {
      // 예시 데이터
      return {
        id: targetId,
        name: targetId === "me" ? "김정아" : `사용자(${targetId})`,
        avatarUrl:
          "https://sitem.ssgcdn.com/14/71/65/item/1000529657114_i1_750.jpg",
        bio: "문제를 찾고, 해결하는 것을 즐깁니다.",
        company: "000 개발팀",
        role: "백엔드 개발자",
        companyHistory: [
          {
            companyName: "네이버",
            job: "소프트웨어 엔지니어",
            role: "백엔드 개발",
            from: 2018,
            to: 2021,
          },
          {
            companyName: "카카오",
            job: "소프트웨어 엔지니어",
            role: "프론트엔드 개발",
            from: 2015,
            to: 2018,
          },
          {
            companyName: "삼성전자",
            job: "소프트웨어 엔지니어",
            role: "모바일 앱 개발",
            from: 2012,
            to: 2015,
          },
        ],
        projectHistory: [
          {
            title: "타임피스",
            period: "2024.01 ~",
            link: "https://github.com/Your-Lie-in-April/server",
          },
          {
            title: "나만의 쇼핑몰",
            period: "2023.02 - 2023.05",
            link: "https://github.com/someone/my-shopping-mall",
          },
        ],
        skill: [
          { name: "TypeScript", level: "고" },
          { name: "React", level: "중" },
          { name: "Node.js", level: "중" },
        ],
      } as ProfileData;
    };

    const loadProfile = async () => {
      const targetId = userId ?? "me";
      const data = await fakeFetchProfile(targetId);
      setProfileData(data);
    };

    loadProfile();
  }, [userId]);

  // 프로필 데이터 불러오는 중
  if (!profileData) {
    return <div>로딩 중...</div>;
  }

  const handleEdit = (
    section: "careers" | "projects" | "skills",
    index: number
  ) => {
    router.push(`/profile/my/${section}/${index}`);
  };

  /*
  [1] 경력 탭 (companyHistory)
  */
  const CareersTabContent = () => {
    return (
      <div className="flex flex-col gap-4 mt-4 px-2">
        {profileData.companyHistory.map((item, i) => (
          <div key={i} className="relative p-4 rounded-md">
            {isOwner && (
              <div className="absolute right-2 top-4">
                <DropdownMenu
                  menuId={`${i}`}
                  actions={[
                    {
                      label: "수정",
                      onClick: () => handleEdit("careers", i),
                    },
                    {
                      label: "삭제",
                      onClick: () => alert("삭제"),
                    },
                  ]}
                />
              </div>
            )}
            <div className="text-lg font-extrabold">{item.companyName}</div>
            <div className="flex items-center mt-1 text-sm text-gray-700">
              <span className="font-extrabold">{item.job}</span>
              <span className="mx-1 text-black/50">·</span>
              <span>
                {item.from} - {item.to}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">{item.role}</div>
          </div>
        ))}
      </div>
    );
  };

  /*
  [2] 프로젝트 탭 (projectHistory)
  */
  const ProjectsTabContent = () => {
    return (
      <div className="flex flex-col gap-4 mt-4 px-2">
        {profileData.projectHistory.map((p, i) => {
          const og = ogData[i];
          return (
            <div key={i} className="relative p-4 rounded-md">
              {isOwner && (
                <div className="absolute right-2 top-4">
                  <DropdownMenu
                    menuId={`${i}`}
                    actions={[
                      {
                        label: "수정",
                        onClick: () => router.push(`/profile/my/projects/${i}`),
                      },
                      {
                        label: "삭제",
                        onClick: () => alert("삭제되었습니다."),
                      },
                    ]}
                  />
                </div>
              )}
              <div className="text-lg font-extrabold">{p.title}</div>
              <div className="mt-1 text-sm text-gray-700">{p.period}</div>
              {og?.image ? (
                <div className="mt-4">
                  <img
                    src={og.image}
                    alt={og.title || p.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="mt-4 text-gray-500">{og.url}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /*
  [3] 사용 기술 탭 (skill)
  */
  const SkillsTabContent = () => {
    return (
      <div className="flex flex-col gap-4 mt-4 px-2">
        {profileData.skill.map((s, i) => (
          <div key={i} className="relative p-4 rounded-md">
            {isOwner && (
              <div className="absolute right-2 top-4">
                <DropdownMenu
                  menuId={`${i}`}
                  actions={[
                    {
                      label: "수정",
                      onClick: () => handleEdit("skills", i),
                    },
                    {
                      label: "삭제",
                      onClick: () => alert("삭제"),
                    },
                  ]}
                />
              </div>
            )}
            <div className="text-lg font-extrabold">{s.name}</div>
            <div className="flex items-center mt-1 text-sm text-gray-700">
              <span className="font-extrabold">기술 숙련도</span>
              <span className="mx-1 text-black/50">·</span>
              <span>{s.level}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs: Tab[] = [
    {
      title: "경력",
      id: 0,
      content: <CareersTabContent />,
    },
    {
      title: "프로젝트",
      id: 1,
      content: <ProjectsTabContent />,
    },
    {
      title: "사용 기술",
      id: 2,
      content: <SkillsTabContent />,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white">
      {/* 상단 배너 */}
      <div className="relative w-full bg-blue-900 h-44">
        {/* 좌측 상단 버튼/아이콘 */}
        <div className="absolute top-4 left-4">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white cursor-pointer"
            size="lg"
            onClick={router.back}
          />
        </div>
        {/* 우측 상단 수정 아이콘 */}
        {isOwner && (
          <div className="absolute top-4 right-4">
            <FontAwesomeIcon
              icon={faPencil}
              className="text-white cursor-pointer"
              size="lg"
              onClick={() => {
                router.push("/profile/my/info");
              }}
            />
          </div>
        )}
      </div>

      {/* 프로필 이미지 */}
      <div className="relative flex flex-row px-4">
        <div
          className="
            -mt-12
            w-24 h-24
            rounded-full
            overflow-hidden
            shrink-0
          "
        >
          <img
            src={profileData.avatarUrl || "/default-avatar.png"}
            alt="profile image"
            className="object-cover w-full h-full"
          />
        </div>

        {/* 메시지, 깃허브, 인스타 */}
        <div className="flex flex-col justify-center ml-4 mt-1">
          <div className="flex flex-row gap-4 text-xl text-gray-600">
            <FontAwesomeIcon icon={faMessage} className="cursor-pointer" />
            <FontAwesomeIcon icon={faGithub} className="cursor-pointer" />
            <FontAwesomeIcon icon={faInstagram} className="cursor-pointer" />
          </div>
          <p className="mt-1 text-sm text-gray-700">{profileData.bio}</p>
        </div>
      </div>

      {/* 이름 / 회사 / 직무 */}
      <div className="mt-4 px-4">
        <h1 className="text-xl font-bold">{profileData.name}</h1>

        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-semibold">소속 |</span>
            <span className="ml-1">{profileData.company}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-semibold">직무 |</span>
            <span className="ml-1">{profileData.role}</span>
          </div>
        </div>
      </div>

      {/* 탭 영역 */}
      <div className="mt-6 px-4 pb-8">
        <SwipeableTabs tabs={tabs} />
      </div>
    </div>
  );
}
