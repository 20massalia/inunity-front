"use client";

import { Button, Typography } from "ui";

interface GoogleSignInProps {
  onNext: () => void;
  onAttachCertificate: () => void;
}

export default function GoogleSignIn({
  onNext,
  onAttachCertificate,
}: GoogleSignInProps) {
  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        이제 학과 인증을 위해
        <br />
        구글 로그인을 시도할게요.
      </Typography>
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={onNext}>
          Google로 계속하기
        </Button>
        <div className="text-center" onClick={onAttachCertificate}>
          학교 포탈 계정이 없나요?
        </div>
      </div>
    </div>
  );
}
