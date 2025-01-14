"use client";

import React, { useState, useEffect } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Typography } from "ui";
import fetchExtended from "@/lib/fetchExtended";
import useSkill from "@/entities/profile/hooks/useSkill";
import { SkillType, SkillLevel } from "@/entities/profile/model/SkillDto";
import useEditSkill from "@/features/profile/hooks/useEditSkill";
import usePostSkill from "@/features/profile/hooks/usePostSkill";
import { useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "@/shared/ui/LoadingOverlay";

interface MySkillsProps {
  skillId?: number; // Optional for creation mode
}

export default function MySkills({ skillId }: MySkillsProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<SkillLevel>("LOW");
  const [type, setType] = useState<SkillType>("ETC");
  const [loading, setLoading] = useState(false);

  const router = useNativeRouter();
  const queryClient = useQueryClient();

  const isEditMode = !!skillId;

  const { data: skills, isLoading } = useSkill(isEditMode ? userId || 0 : 0);
  const { mutate: editSkill } = useEditSkill(userId || 0);
  const { mutate: postSkill } = usePostSkill(userId || 0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetchExtended<{ id: number }>(
          "/v1/users/information",
          { method: "GET", credentials: "include" }
        );
        setUserId(response.id);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (isEditMode && !isLoading && skills) {
      const skill = skills.find((s) => s.skillId === skillId);
      if (skill) {
        setName(skill.name || "");
        setLevel(skill.level || "LOW");
        setType(skill.type || "ETC");
      }
    }
  }, [skills, skillId, isLoading, isEditMode]);

  const handleSubmit = () => {
    if (!userId) {
      alert("유저 정보를 불러오지 못했습니다.");
      return;
    }

    setLoading(true);

    if (isEditMode) {
      editSkill(
        { skillId: skillId!, name, level, type },
        {
          onSuccess: () => {
            setLoading(false);
            console.log("수정 성공");
            queryClient.invalidateQueries({ queryKey: ["skills", userId] });
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
      postSkill(
        { name, level, type },
        {
          onSuccess: () => {
            setLoading(false);
            console.log("생성 성공");
            queryClient.invalidateQueries({ queryKey: ["skills", userId] });
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

  const skillTypes: SkillType[] = [
    "LANGUAGES",
    "FRAMEWORK",
    "DATABASE",
    "DEVOPS",
    "COMMUNICATION",
    "TOOL",
    "ETC",
  ];

  const skillLevels: { value: SkillLevel; label: string }[] = [
    { value: "LOW", label: "저" },
    { value: "MEDIUM", label: "중" },
    { value: "HIGH", label: "고" },
  ];

  return (
    <div className="flex-col items-center overflow-hidden">
      <LoadingOverlay isLoading={loading} />
      <AppBar
        center={
          <Typography variant="HeadingNormalBold">
            {isEditMode ? "사용 기술 수정" : "사용 기술 생성"}
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
          <Typography variant="HeadingSmallBold">기술 이름</Typography>
          <Input
            value={name}
            setValue={setName}
            placeholder="기술 이름을 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">기술 타입</Typography>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as SkillType)}
            className="p-2 border rounded-md"
          >
            {skillTypes.map((skillType) => (
              <option key={skillType} value={skillType}>
                {skillType}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="HeadingSmallBold">기술 수준</Typography>
          <div className="flex gap-4">
            {skillLevels.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="skillLevel"
                  value={value}
                  checked={level === value}
                  onChange={() => setLevel(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
