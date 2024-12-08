"use client";

import { useEffect } from "react";
import { Typography } from "ui";

export default function Welcome({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold">
        반가워요!
        <br />
        로그인을 시작해볼까요?
      </Typography>
    </div>
  );
}
