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
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useProfile from "@/entities/profile/hooks/useProfile";
import useSkill from "@/entities/profile/hooks/useSkill";
import usePortfolioOG from "@/entities/profile/hooks/usePortfolioOG";
import useCareer from "@/entities/profile/hooks/useCareer";
import fetchExtended from "@/lib/fetchExtended";

interface ProfileContainerProps {
  userId?: number;
}

/**
 * @param userId
 *   - 없으면 "내 프로필" 모드
 *   - 있으면 userId에 해당하는 "타인 프로필" 모드
 */
export default function ProfileContainer({
  userId: initialUserId,
}: ProfileContainerProps) {
  const router = useNativeRouter();
  const [userId, setUserId] = useState<number | null>(initialUserId || null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!initialUserId) {
        try {
          const response = await fetchExtended<{
            id: number;
            profileImageUrl: string | null;
          }>("/v1/users/information", {
            method: "GET",
            credentials: "include",
          });

          setUserId(response.id);
          setAvatarUrl(response.profileImageUrl);
        } catch (error) {
          console.error("Failed to fetch user information:", error);
        }
      }
    };

    fetchUserInfo();
  }, [initialUserId]);

  const { data: profile, isLoading: isProfileLoading } = useProfile(userId!);
  const { data: skills, isLoading: isSkillsLoading } = useSkill(userId!);
  const { portfolio, ogData, isPortfolioLoading } = usePortfolioOG(userId!);
  const { data: careers, isLoading: isCareersLoading } = useCareer(userId!);

  const isOwner = !initialUserId;

  if (
    !userId ||
    isProfileLoading ||
    isSkillsLoading ||
    isPortfolioLoading ||
    isCareersLoading
  ) {
    return <div>로딩 중...</div>;
  }

  if (!profile) {
    return <div>프로필을 불러올 수 없습니다.</div>;
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
  const CareersTabContent = () => (
    <div className="flex flex-col gap-4 mt-4 px-2">
      {careers?.map((career, i) => (
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
          <div className="text-lg font-extrabold">{career.companyName}</div>
          <div className="flex items-center mt-1 text-sm text-gray-700">
            <span className="font-extrabold">{career.position}</span>
            <span className="mx-1 text-black/50">·</span>
            <span>
              {career.startDate} - {career.endDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  /*
  [2] 프로젝트 탭 (projectHistory)
  */
  const ProjectsTabContent = () => (
    <div className="flex flex-col gap-4 mt-4 px-2">
      {portfolio?.map((project, i) => (
        <div key={i} className="relative p-4 rounded-md">
          {isOwner && (
            <div className="absolute right-2 top-4">
              <DropdownMenu
                menuId={`${i}`}
                actions={[
                  {
                    label: "수정",
                    onClick: () => handleEdit("projects", i),
                  },
                  {
                    label: "삭제",
                    onClick: () => alert("삭제되었습니다."),
                  },
                ]}
              />
            </div>
          )}
          <div className="text-lg font-extrabold">{project.title}</div>
          <div className="mt-1 text-sm text-gray-700">
            {project.startDate} ~ {project.endDate}
          </div>
          {ogData && ogData[i]?.image ? (
            <img
              src={ogData[i]?.image}
              alt={ogData[i]?.title || project.url}
              className="w-full h-64 object-cover rounded-md mt-4"
            />
          ) : (
            <div className="mt-4 text-gray-500">{project.url}</div>
          )}
        </div>
      ))}
    </div>
  );

  /*
  [3] 사용 기술 탭 (skill)
  */
  const SkillsTabContent = () => (
    <div className="flex flex-col gap-4 mt-4 px-2">
      {skills?.map((skill, i) => (
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
          <div className="text-lg font-extrabold">{skill.name}</div>
          <div className="flex items-center mt-1 text-sm text-gray-700">
            <span className="font-extrabold">기술 숙련도</span>
            <span className="mx-1 text-black/50">·</span>
            <span>{skill.level}</span>
          </div>
        </div>
      ))}
    </div>
  );

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
  const [activeTab, setActiveTab] = useState(0);

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
            src={avatarUrl || "/default-avatar.png"}
            alt="profile image"
            className="object-cover w-full h-full"
          />
        </div>
        {/* 메시지, 깃허브, 인스타 */}
        <div className="flex flex-col justify-center ml-4 mt-1">
          <div className="flex flex-row gap-4 text-xl text-gray-600">
            <FontAwesomeIcon icon={faMessage} className="cursor-pointer" />
            <FontAwesomeIcon
              icon={faGithub as IconProp}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faInstagram as IconProp}
              className="cursor-pointer"
            />
          </div>
          {/* <p className="text-sm text-gray-700 mt-1">{profile.bio}</p> */}
        </div>
      </div>

      {/* 이름 / 회사 / 직무 */}
      <div className="mt-4 px-4">
        <h1 className="text-xl font-bold">{profile.nickname}</h1>

        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-semibold">소속 |</span>
            <span className="ml-1">{profile.organization}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-semibold">직무 |</span>
            <span className="ml-1">{profile.job}</span>
          </div>
        </div>
      </div>

      {/* 탭 영역 */}
      <div className="mt-6 px-4 pb-8">
        <SwipeableTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
