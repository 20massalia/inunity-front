"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Input, Typography } from "ui";
import uploadImage from "@/lib/uploadImage";
import useSaveProfile from "@/features/profile/hooks/useSaveProfile";
import useProfile from "@/entities/profile/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import { ContractType } from "@/entities/profile/model/ProfileDto";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface RequestCreateUpdateContract {
  contractId?: number;
  type: ContractType;
  name: string;
  url: string;
}

export default function MyInfo() {
  const router = useNativeRouter();
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<number | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [job, setJob] = useState("");

  // 기본 contracts 설정
  const [contracts, setContracts] = useState<RequestCreateUpdateContract[]>([
    { name: "KakaoTalk", type: "SNS", url: "" },
    { name: "Github", type: "WEBSITE", url: "" },
    { name: "Instagram", type: "SNS", url: "" },
  ]);

  const { data: profileData } = useProfile(userId || 0);
  const { mutate: updateUserInfo } = useSaveProfile(userId || 0);

  // 컴포넌트 첫 로드 시 /v1/users/information 통해 userId, profileImageUrl 가져옴
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetchExtended<{
          id: number;
          profileImageUrl: string | null;
        }>("/v1/users/information", {
          method: "GET",
          credentials: "include",
        });

        setUserId(response.id);
        setProfileImageUrl(response.profileImageUrl || "");
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setDescription(profileData.description || "");
      setOrganization(profileData.organization || "");
      setJob(profileData.job || "");
      setContracts((prevContracts) =>
        prevContracts.map((contract) => {
          const matchedContract = profileData.contracts.find(
            (c) => c.name === contract.name
          );
          return matchedContract
            ? { ...contract, url: matchedContract.url }
            : contract;
        })
      );
    }
  }, [profileData]);

  const handleContractChange = (index: number, value: string) => {
    setContracts((prevContracts) => {
      const updatedContracts = [...prevContracts];
      updatedContracts[index] = { ...updatedContracts[index], url: value };
      return updatedContracts;
    });
  };

  const handleUpdate = async () => {
    if (!profileData) return;

    try {
      let imageUrl = profileImageUrl;

      if (newImageFile) {
        setUploading(true);
        imageUrl = await uploadImage("profile-image", newImageFile);
        setUploading(false);
        setProfileImageUrl(imageUrl);
      }

      updateUserInfo(
        {
          nickname,
          description,
          organization,
          job,
          contracts,
          profileImageUrl: imageUrl,
        },
        {
          onSuccess: () => {
            console.log("수정 성공");

            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            router.back();
          },
          onError: (err) => {
            console.error("수정 실패:", err);
          },
        }
      );
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setProfileImageUrl(imagePreviewUrl);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="flex-col items-center overflow-hidden">
      <AppBar
        center={
          <Typography variant="HeadingNormalBold">프로필 기본 정보</Typography>
        }
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

      <div className="self-stretch flex-col items-start gap-4 px-5 py-4">
        {/* 프로필 이미지 + 업로드 */}
        <div className="flex flex-col items-center gap-2.5">
          <img
            className="w-[116px] h-[116px] rounded-full"
            src={profileImageUrl || "https://via.placeholder.com/116x116"}
            alt="Profile image"
          />
          <label className="px-3 py-1 bg-[#185bec]/80 rounded-md shadow-md text-white text-sm font-bold cursor-pointer">
            사진 불러오기
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>

        <div className="w-full border border-[#eff3f4] my-4"></div>

        {/* 기본 정보 (닉네임, 한줄소개, 소속, 직무) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[110px] text-lg font-medium">닉네임</div>
            <Input
              value={nickname}
              setValue={setNickname}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-lg font-medium">한줄 소개</div>
            <Input
              value={description}
              setValue={setDescription}
              placeholder="한줄 소개를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-lg font-medium">소속</div>
            <Input
              value={organization}
              setValue={setOrganization}
              placeholder="소속을 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-lg font-medium">직무</div>
            <Input
              value={job}
              setValue={setJob}
              placeholder="직무를 입력하세요"
            />
          </div>
        </div>

        <div className="w-full border border-[#eff3f4] my-4"></div>

        {/* 연결된 링크 (카카오톡, 깃허브, 인스타 등) */}
        <div className="flex flex-col gap-4">
          {contracts.map((contract, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-[110px] flex items-center gap-1">
                <FontAwesomeIcon
                  icon={
                    contract.name === "KakaoTalk"
                      ? (faMessage as IconProp)
                      : contract.name === "Github"
                      ? (faGithub as IconProp)
                      : (faInstagram as IconProp)
                  }
                  size="lg"
                  className="text-gray-500"
                />
                <div className="text-sm">{contract.name}</div>
              </div>
              <Input
                value={contract.url}
                setValue={(value) => handleContractChange(index, value)}
                placeholder={`URL을 입력하세요`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
