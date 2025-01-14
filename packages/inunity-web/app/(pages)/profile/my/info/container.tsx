"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Input, Typography } from "ui";
import fetchExtended from "@/lib/fetchExtended";
import useSaveProfile from "@/features/profile/hooks/useSaveProfile";
import { useQueryClient } from "@tanstack/react-query";

export type ContractType = "SNS" | "WEBSITE" | "ETC";

export interface RequestCreateUpdateContract {
  contractId?: number;
  type: ContractType;
  name: string;
  url: string;
}

export default function MyInfo() {
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [job, setJob] = useState("");
  const [contracts, setContracts] = useState<RequestCreateUpdateContract[]>([]);

  const router = useNativeRouter();
  const queryClient = useQueryClient();
  const { mutate: updateUserInfo } = useSaveProfile(userId || 0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await fetchExtended<{
          id: number;
          nickname: string;
          description: string;
          organization: string;
          job: string;
          contracts: RequestCreateUpdateContract[];
        }>("/v1/users/information", {
          method: "GET",
          credentials: "include",
        });

        setUserId(userResponse.id);
        setNickname(userResponse.nickname || "");
        setDescription(userResponse.description || "");
        setOrganization(userResponse.organization || "");
        setJob(userResponse.job || "");
        setContracts(userResponse.contracts || []);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleContractChange = (
    index: number,
    field: keyof RequestCreateUpdateContract,
    value: string | ContractType
  ) => {
    setContracts((prev) =>
      prev.map((contract, i) =>
        i === index ? { ...contract, [field]: value } : contract
      )
    );
  };

  const addNewContract = () => {
    setContracts((prev) => [
      ...prev,
      { type: "SNS", name: "", url: "" }, // 기본값으로 추가
    ]);
  };

  const removeContract = (index: number) => {
    setContracts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    updateUserInfo(
      { nickname, description, organization, job, contracts },
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
  };

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
            className="w-fit text-sm font-medium whitespace-nowrap"
            onClick={handleUpdate}
          >
            완료
          </div>
        }
      />

      <div className="self-stretch flex-col items-start gap-4 px-5 py-4">
        <div className="flex flex-col items-center gap-2.5">
          <img
            className="w-[116px] h-[116px] rounded-full"
            src="https://via.placeholder.com/116x116"
            alt="Profile"
          />
          <button className="px-3 py-1 bg-[#185bec]/80 rounded-md shadow-md text-white text-sm font-bold">
            사진 불러오기
          </button>
        </div>

        <div className="w-full border border-[#eff3f4] my-4"></div>

        {/* 기본 정보 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">
              닉네임
            </div>
            <Input
              value={nickname}
              setValue={setNickname}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">
              한줄 소개
            </div>
            <Input
              value={description}
              setValue={setDescription}
              placeholder="한줄 소개를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">소속</div>
            <Input
              value={organization}
              setValue={setOrganization}
              placeholder="소속을 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">직무</div>
            <Input
              value={job}
              setValue={setJob}
              placeholder="직무를 입력하세요"
            />
          </div>
        </div>

        <div className="w-full border border-[#eff3f4] my-4"></div>

        {/* 계약 정보 (SNS, 웹사이트 링크 등) */}
        <div className="flex flex-col gap-4">
          <Typography variant="HeadingSmallBold">연결된 링크</Typography>
          {contracts.map((contract, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border p-4 rounded-md"
            >
              <div className="flex items-center gap-4">
                <Typography variant="LabelNormalBold">타입</Typography>
                <select
                  value={contract.type}
                  onChange={(e) =>
                    handleContractChange(
                      index,
                      "type",
                      e.target.value as ContractType
                    )
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="SNS">SNS</option>
                  <option value="WEBSITE">WEBSITE</option>
                  <option value="ETC">ETC</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  value={contract.name}
                  setValue={(value) =>
                    handleContractChange(index, "name", value)
                  }
                  placeholder="이름을 입력하세요"
                />
                <Input
                  value={contract.url}
                  setValue={(value) =>
                    handleContractChange(index, "url", value)
                  }
                  placeholder="URL을 입력하세요"
                />
              </div>
              <button
                onClick={() => removeContract(index)}
                className="mt-2 text-red-500 text-sm"
              >
                삭제
              </button>
            </div>
          ))}
          <button
            onClick={addNewContract}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            새 링크 추가
          </button>
        </div>
      </div>
    </div>
  );
}
