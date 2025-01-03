"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import { Typography, Button } from "ui";

export default function GoogleSuccess() {
  const router = useNativeRouter();

  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        반가워요!
        <br />
        이제 시작해볼까요?
      </Typography>
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => router.push("/")}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
