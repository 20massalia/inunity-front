"use client";

import React, { useEffect, useState } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { SwipeableTabs, Tab, Typography } from "ui";
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
import useDeleteSkill from "@/features/profile/hooks/useDeleteSkill";

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
  const [activeTab, setActiveTab] = useState(0);

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
  // const { portfolio, ogData, isPortfolioLoading } = usePortfolioOG(userId!);
  const { data: careers, isLoading: isCareersLoading } = useCareer(userId!);

  const isOwner = !initialUserId;

  if (
    !userId ||
    isProfileLoading ||
    isSkillsLoading ||
    // isPortfolioLoading ||
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
      {careers && careers.length > 0 ? (
        careers.map((career, i) => (
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
        ))
      ) : (
        <div className="text-center text-gray-500">
          입력된 경력이 없어요. 😢
        </div>
      )}
    </div>
  );

  /*
  [2] 프로젝트 탭 (projectHistory)
  */
  // const ProjectsTabContent = () => (
  //   <div className="flex flex-col gap-4 mt-4 px-2">
  //     {portfolio && portfolio.length > 0 ? (
  //       portfolio.map((project, i) => (
  //         <div key={i} className="relative p-4 rounded-md">
  //           {isOwner && (
  //             <div className="absolute right-2 top-4">
  //               <DropdownMenu
  //                 menuId={`${i}`}
  //                 actions={[
  //                   {
  //                     label: "수정",
  //                     onClick: () => handleEdit("projects", i),
  //                   },
  //                   {
  //                     label: "삭제",
  //                     onClick: () => alert("삭제되었습니다."),
  //                   },
  //                 ]}
  //               />
  //             </div>
  //           )}
  //           <div className="text-lg font-extrabold">{project.title}</div>
  //           <div className="mt-1 text-sm text-gray-700">
  //             {project.startDate} ~ {project.endDate}
  //           </div>
  //           {ogData && ogData[i]?.image ? (
  //             <img
  //               src={ogData[i]?.image}
  //               alt={ogData[i]?.title || project.url}
  //               className="w-full h-64 object-cover rounded-md mt-4"
  //             />
  //           ) : (
  //             <div className="mt-4 text-gray-500">{project.url}</div>
  //           )}
  //         </div>
  //       ))
  //     ) : (
  //       <div className="text-center text-gray-500">입력된 프로젝트가 없어요. 😢</div>
  //     )}
  //   </div>
  // );

  /*
  [3] 사용 기술 탭 (skill)
  */
  const SkillsTabContent = () => {
    const deleteSkill = useDeleteSkill(userId);

    const handleDeleteSkill = async (skillId: number) => {
      try {
        await deleteSkill.mutateAsync(skillId);
        alert("기술이 삭제되었습니다.");
      } catch (error) {
        console.error("Failed to delete skill:", error);
        alert("기술 삭제에 실패했습니다.");
      }
    };

    const getLevelText = (level: string) => {
      switch (level) {
        case "LOW":
          return "저";
        case "MEDIUM":
          return "중";
        case "HIGH":
          return "고";
        default:
          return level;
      }
    };

    return (
      <div className="flex flex-col gap-4 mt-4 px-2">
        {skills && skills.length > 0 ? (
          skills.map((skill, i) => (
            <div key={i} className="relative p-4 rounded-md">
              {isOwner && (
                <div className="absolute right-2 top-4">
                  <DropdownMenu
                    menuId={`${i}`}
                    actions={[
                      {
                        label: "수정",
                        onClick: () => handleEdit("skills", skill.skillId),
                      },
                      {
                        label: "삭제",
                        onClick: () => handleDeleteSkill(skill.skillId),
                      },
                    ]}
                  />
                </div>
              )}
              <div className="text-lg font-extrabold">{skill.name}</div>
              <div className="flex items-center mt-1 text-sm text-gray-700">
                <span className="font-extrabold">기술 숙련도</span>
                <span className="mx-1 text-black/50">·</span>
                <span>{getLevelText(skill.level)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            입력된 기술이 없어요. 😢
          </div>
        )}
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
      // content: <ProjectsTabContent />,
      content: <div>.</div>,
    },
    {
      title: "사용 기술",
      id: 2,
      content: <SkillsTabContent />,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white">
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
          {/* 테스트용 이미지로 망곰이가 들어가있음ㅎㅎ */}
          <img
            src={
              avatarUrl ||
              "data:image/png;base64,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"
            }
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
          {profile.description ? (
            <p className="text-sm text-gray-700 mt-1">{profile.description}</p>
          ) : null}
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
