"use client";

import React, { useEffect, useState } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { Button, ScrollView, SwipeableTabs, Tab, Typography } from "ui";
import { DropdownMenu } from "ui/src/DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faChevronLeft,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import fetchExtended from "@/lib/fetchExtended";
import LoadingOverlay from "@/shared/ui/LoadingOverlay";
import useProfile from "@/entities/profile/hooks/useProfile";
import useSkill from "@/entities/profile/hooks/useSkill";
import usePortfolioOG from "@/entities/profile/hooks/usePortfolioOG";
import useCareer from "@/entities/profile/hooks/useCareer";
import useDeleteSkill from "@/features/profile/hooks/useDeleteSkill";
import useDeleteCareer from "@/features/profile/hooks/useDeleteCareer";
import useDeletePortfolio from "@/features/profile/hooks/useDeletePortfolio";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<number | null>(initialUserId || null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // 본인 프로필 여부 (내 프로필 모드)
  const isOwner = !initialUserId;

  // 내 프로필 모드이면(userId가 없으면) /v1/users/information에서 userId를 가져옴
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!initialUserId) {
        try {
          const response = await fetchExtended<{
            id: number;
            profileImageUrl: string | null;
            department: string;
          }>("/v1/users/information", {
            method: "GET",
            credentials: "include",
          });

          setUserId(response.id);
          setAvatarUrl(response.profileImageUrl);
          setDepartment(response.department);
        } catch (error) {
          console.error("Failed to fetch user information:", error);
        }
      }
    };

    fetchUserInfo();
  }, [initialUserId]);

  // 배너 컬러
  const departmentColors: { [key: string]: string } = {
    컴퓨터공학부: "#002874",
    임베디드시스템공학과: "#C3EDFF",
    정보통신공학과: "#DBDBDB",
  };

  const bannerColor = departmentColors[department] || "#002874";

  // 아이콘별 연락처 url 달기
  const handleIconClick = (platform: string) => {
    const contract = profile?.contracts?.find(
      (c) => c.name.toLowerCase() === platform.toLowerCase()
    );

    if (contract?.url) {
      window.open(contract.url, "_blank");
    } else {
      alert(`${platform} URL이 설정되지 않았어요 😢`);
    }
  };

  const { data: profile, isPending: isProfileLoading } = useProfile(userId!);
  const { data: skills, isPending: isSkillsLoading } = useSkill(userId!);
  const { portfolio, ogData, isPortfolioLoading } = usePortfolioOG(userId!);
  const { data: careers, isLoading: isCareersLoading } = useCareer(userId!);
  const { mutate: deleteCareer, isPending: isDeleteCareerLoading } =
    useDeleteCareer(userId!);
  const { mutate: deletePortfolio, isPending: isDeletePortfolioLoading } =
    useDeletePortfolio(userId!);
  const { mutate: deleteSkill, isPending: isDeleteSkillLoading } =
    useDeleteSkill(userId!);

  // 로딩 처리
  const isDataLoading =
    !userId || isProfileLoading || isSkillsLoading || isCareersLoading; // || isPortfolioLoading
  const isMutationLoading =
    isDeleteCareerLoading || isDeletePortfolioLoading || isDeleteSkillLoading;
  const isPending = isDataLoading || isMutationLoading;

  // 삭제 함수
  const handleDelete = (
    section: "careers" | "projects" | "skills",
    targetId: number
  ) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    switch (section) {
      case "careers":
        deleteCareer(targetId, {
          onSuccess: () => {
            alert("경력이 삭제되었어요.");

            queryClient.invalidateQueries({ queryKey: ["careers", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
          },
          onError: (err) => {
            console.error("경력 삭제 실패:", err);
          },
        });
        break;

      case "projects":
        deletePortfolio(targetId, {
          onSuccess: () => {
            alert("프로젝트가 삭제되었어요.");

            queryClient.invalidateQueries({ queryKey: ["porfolios", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
          },
          onError: (err) => {
            console.error("프로젝트 삭제 실패:", err);
          },
        });
        break;

      case "skills":
        deleteSkill(targetId, {
          onSuccess: () => {
            alert("스킬이 삭제되었어요.");

            queryClient.invalidateQueries({ queryKey: ["skills", userId] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
          },
          onError: (err) => {
            console.error("스킬 삭제 실패:", err);
          },
        });
        break;

      default:
        break;
    }
  };

  // 수정 함수
  const handleEdit = (
    section: "careers" | "projects" | "skills",
    targetId: number
  ) => {
    router.push(`/profile/my/${section}/${targetId}`);
  };

  /*
    [1] 경력 탭 (companyHistory)
  */
  const CareersTabContent = () => (
    <div className="flex flex-col gap-4 mt-4 px-2">
      <ScrollView>
        {careers && careers.length > 0 ? (
          careers.map((career) => (
            <div key={career.careerId} className="relative p-4 rounded-md">
              {isOwner && (
                <div className="absolute right-2 top-4">
                  <DropdownMenu
                    menuId={`career-${career.careerId}`}
                    actions={[
                      {
                        label: "수정",
                        onClick: () => handleEdit("careers", career.careerId),
                      },
                      {
                        label: "삭제",
                        onClick: () => handleDelete("careers", career.careerId),
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
                  {career.startDate?.substring(0, 4)} -{" "}
                  {career.endDate?.substring(0, 4)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            입력된 경력이 없어요. 😢
          </div>
        )}
        {isOwner && (
          <Button
            size="large"
            onClick={() => router.push(`/profile/my/careers`)}
          >
            추가하기
          </Button>
        )}
      </ScrollView>
    </div>
  );

  /*
    [2] 프로젝트 탭 (projectHistory)
  */
  const ProjectsTabContent = () => (
    <div className="flex flex-col gap-4 mt-4 px-2">
      <ScrollView>
        {portfolio && portfolio.length > 0 ? (
          portfolio.map((project, i) => (
            <div key={project.portfolioId} className="relative p-4 rounded-md">
              {isOwner && (
                <div className="absolute right-2 top-4">
                  <DropdownMenu
                    menuId={`portfolio-${project.portfolioId}`}
                    actions={[
                      {
                        label: "수정",
                        onClick: () =>
                          handleEdit("projects", project.portfolioId),
                      },
                      {
                        label: "삭제",
                        onClick: () =>
                          handleDelete("projects", project.portfolioId),
                      },
                    ]}
                  />
                </div>
              )}
              <div className="text-lg font-extrabold">{project.title}</div>
              <div className="mt-1 text-sm text-gray-700">
                {project.startDate} - {project.endDate}
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
          ))
        ) : (
          <div className="text-center text-gray-500">
            입력된 프로젝트가 없어요. 😢
          </div>
        )}
        {isOwner && (
          <Button
            size="large"
            onClick={() => router.push(`/profile/my/projects`)}
          >
            추가하기
          </Button>
        )}
      </ScrollView>
    </div>
  );

  /*
    [3] 사용 기술 탭 (skill)
  */
  const SkillsTabContent = () => {
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
        <ScrollView>
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.skillId} className="relative p-4 rounded-md">
                {isOwner && (
                  <div className="absolute right-2 top-4">
                    <DropdownMenu
                      menuId={`skill-${skill.skillId}`}
                      actions={[
                        {
                          label: "수정",
                          onClick: () => handleEdit("skills", skill.skillId),
                        },
                        {
                          label: "삭제",
                          onClick: () => handleDelete("skills", skill.skillId),
                        },
                      ]}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="text-lg font-extrabold">{skill.name}</div>
                  <div className="text-sm font-light text-gray-400">
                    {skill.type}
                  </div>
                </div>
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
          {isOwner && (
            <Button
              size="large"
              onClick={() => router.push(`/profile/my/skills`)}
            >
              추가하기
            </Button>
          )}
        </ScrollView>
      </div>
    );
  };

  // Tabs
  const tabs: Tab[] = [
    {
      title: "활동",
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

  // 렌더링 분기 (로딩, 에러, 정상)
  if (isPending) {
    return <LoadingOverlay isLoading={true} />;
  }

  // (데이터 fetch가 끝났는데도 profile이 없다면 에러 상태)
  if (!profile) {
    return <div className="m-4 text-center">프로필을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <LoadingOverlay isLoading={isPending} />
      {/* 상단 배너 */}
      <div
        className="relative w-full h-44"
        style={{ backgroundColor: bannerColor }}
      >
        <div className="absolute top-4 left-4">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white cursor-pointer"
            size="lg"
            onClick={router.back}
          />
        </div>
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
      <ScrollView
        className="bg-[#f8f8f8]  justify-start items-start flex text-black gap-2"
        onRefresh={() => {}}
      >
        {/* 프로필 이미지 + SNS 아이콘 등 */}
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
              src={avatarUrl || "https://via.placeholder.com/116x116"}
              alt="profile image"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col justify-center ml-4 mt-1">
            <div className="flex flex-row gap-4 text-xl text-gray-600">
              <FontAwesomeIcon
                icon={faMessage}
                className="cursor-pointer"
                onClick={() => handleIconClick("KakaoTalk")}
              />
              <FontAwesomeIcon
                icon={faGithub as IconProp}
                className="cursor-pointer"
                onClick={() => handleIconClick("Github")}
              />
              <FontAwesomeIcon
                icon={faInstagram as IconProp}
                className="cursor-pointer"
                onClick={() => handleIconClick("Instagram")}
              />
            </div>
            {profile.description ? (
              <p className="text-sm text-gray-700 mt-1">
                {profile.description}
              </p>
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
      </ScrollView>
    </div>
  );
}
