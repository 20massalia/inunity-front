"use client";

import { Button, Input, Typography } from "ui";

interface PasswordFormStepProps {
  studentNumber: string;
  password: string;
  setPassword: (password: string) => void;
  handlePasswordFormSubmit: () => void;
}

export default function PasswordFormStep({
  studentNumber,
  password,
  setPassword,
  handlePasswordFormSubmit,
}: PasswordFormStepProps) {
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
        className="mt-6"
      />
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button
          variant="primary"
          size="large"
          onClick={handlePasswordFormSubmit}
        >
          계속하기
        </Button>
      </div>
    </div>
  );
}
