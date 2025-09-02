"use client";

import { useState } from "react";
import { Button, Input, Typography } from "ui";
import FadeInOutStep from "./FadeInOutStep";
import {
  ApiError,
  loginPortal,
  registerPortal,
} from "@/features/onboarding/api/onboarding.api";

interface PasswordFormProps {
  studentNumber: string;
  password: string;
  setPassword: (password: string) => void;
  handleLoginSuccess: () => void; // 4.1 기존 사용자 플로우
  handleRegisterSuccess: () => void; // 4.2 신규 사용자 플로우(다음 스텝으로)
}

export default function PasswordForm({
  studentNumber,
  password,
  setPassword,
  handleLoginSuccess,
  handleRegisterSuccess,
}: PasswordFormProps) {
  const [shown, setShown] = useState(true);

  const handleNext = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    try {
      // 1) 로그인 시도
      const res = await loginPortal({ studentId: studentNumber, password });

      // 2) 성공 → 가입 이력에 따라 분기
      if (res.hasHistory) {
        handleLoginSuccess(); // 4.1
      } else {
        // 4.2 "처음이네요!" 스텝으로 진행
        handleRegisterSuccess();
      }
    } catch (e) {
      // 3) 실패 → 미가입이면 회원가입 후 4.2로, 그 외는 에러 안내
      if (e instanceof ApiError) {
        if (e.code === "USER_NOT_FOUND") {
          try {
            await registerPortal({ studentId: studentNumber, password });
            handleRegisterSuccess(); // 4.2
          } catch (re) {
            const msg =
              re instanceof ApiError
                ? re.message
                : "회원가입 중 알 수 없는 오류";
            alert(msg);
          }
        } else if (e.code === "INVALID_CREDENTIALS") {
          alert("아이디 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.");
        } else {
          alert(`로그인 실패: ${e.message}`);
        }
      } else {
        alert("네트워크 오류가 발생했습니다.");
      }
    }
  };

  return (
    <FadeInOutStep onExit={handleNext} shown={shown}>
      <div className="flex flex-col gap-3">
        <Typography variant="HeadingLargeBold" className="mb-4">
          학내 포탈에서 사용하는
          <br />
          비밀번호를 입력해주세요.
        </Typography>
        <Input
          value={password}
          setValue={setPassword}
          placeholder="포탈 비밀번호"
          masked
          className="self-stretch"
        />
      </div>

      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => setShown(false)}>
          계속하기
        </Button>
      </div>
    </FadeInOutStep>
  );
}
