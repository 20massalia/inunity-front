"use client";

import { Button, Input, Typography } from "ui";

interface PasswordFormProps {
  studentNumber: string;
  password: string;
  setPassword: (password: string) => void;
  handleLoginSuccess: () => void;
  handleRegisterSuccess: () => void;
}

async function attemptLogin(studentNumber: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 쿠키 포함
      body: JSON.stringify({ studentId: Number(studentNumber), password }),
    }
  );

  // 응답이 실패인 경우 에러 메시지 파싱
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
}

async function attemptRegister(studentNumber: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 쿠키 포함
      body: JSON.stringify({ studentId: Number(studentNumber), password }),
    }
  );

  // 응답이 실패인 경우 에러 메시지 파싱
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`회원 가입 중 오류 발생: ${message}`);
  }
}

export default function PasswordForm({
  studentNumber,
  password,
  setPassword,
  handleLoginSuccess,
  handleRegisterSuccess,
}: PasswordFormProps) {
  const handleNext = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    try {
      // 1) 먼저 로그인 시도
      await attemptLogin(studentNumber, password);
      // 로그인 성공 시
      handleLoginSuccess();
    } catch (error) {
      // 2) 로그인 실패 시 분기 처리
      if (error instanceof Error) {
        if (error.message === "서비스에 가입되지 않은 유저입니다.") {
          // 회원가입 진행
          try {
            await attemptRegister(studentNumber, password);
            handleRegisterSuccess();
          } catch (registerError) {
            if (registerError instanceof Error) {
              alert(registerError.message);
            } else {
              alert("알 수 없는 오류가 발생했습니다.");
            }
          }
        } else if (error.message === "포탈 로그인 실패: 아이디비번 틀림") {
          alert("아이디 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.");
        } else {
          alert(`로그인 실패: ${error.message || "알 수 없는 오류"}`);
        }
      } else {
        alert("네트워크 오류: 알 수 없는 문제");
      }
    }
  };

  return (
    <div className="h-dvh flex flex-col mx-5">
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
        className="mt-16"
      />

      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={handleNext}>
          계속하기
        </Button>
      </div>
    </div>
  );
}
