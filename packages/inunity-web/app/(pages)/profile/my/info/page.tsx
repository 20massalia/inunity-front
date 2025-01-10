"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Input, Typography } from "ui";

export default function MyInfo() {
  const [nickname, setNickname] = useState("김정아");
  const [bio, setBio] = useState("문제를 찾고, 해결하는 것을 즐깁니다.");
  const [company, setCompany] = useState("개굴컴퍼니 개발팀");
  const [role, setRole] = useState("백엔드 개발자");
  const [instagram, setInstagram] = useState("https://instagram.com/frog");
  const [github, setGithub] = useState("https://github.com/frog");
  const [kakao, setKakao] = useState("https://open.kakao.com/frog");
  const [blog, setBlog] = useState("https://blog.frog.com");

  const router = useNativeRouter();

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
          <div className="w-fit text-sm font-medium whitespace-nowrap">
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
              value={bio}
              setValue={setBio}
              placeholder="한줄 소개를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">소속</div>
            <Input
              value={company}
              setValue={setCompany}
              placeholder="소속을 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">직무</div>
            <Input
              value={role}
              setValue={setRole}
              placeholder="직무를 입력하세요"
            />
          </div>
        </div>

        <div className="w-full border border-[#eff3f4] my-4"></div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">
              Instagram
            </div>
            <Input
              value={instagram}
              setValue={setInstagram}
              placeholder="Instagram 링크를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">
              Github
            </div>
            <Input
              value={github}
              setValue={setGithub}
              placeholder="Github 링크를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">
              KakaoTalk
            </div>
            <Input
              value={kakao}
              setValue={setKakao}
              placeholder="KakaoTalk 링크를 입력하세요"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[110px] text-black text-lg font-medium">Blog</div>
            <Input
              value={blog}
              setValue={setBlog}
              placeholder="Blog 링크를 입력하세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
