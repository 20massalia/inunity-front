"use client";

import { useEffect } from "react";
import { Typography } from "ui";

export default function ExistingUserConfirmation({
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
        INUnity을
        <br />
        사용해보신 적이 있네요!
        <br />
        <br />
        돌아오신 걸 환영해요!
      </Typography>
    </div>
  );
}
