"use client";

import { useEffect } from "react";
import { Typography } from "ui";

export default function NewUserConfirmation({
  onNext,
}: {
  onNext: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold">
        INUnity에 처음이네요!
        <br />
        조금만 더 입력해볼까요?
      </Typography>
    </div>
  );
}
