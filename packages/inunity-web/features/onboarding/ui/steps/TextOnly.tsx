// 텍스트만 있는 페이지들을 위해..
import { useEffect, ReactNode } from "react";
import { Typography } from "ui";

interface TextOnlyProps {
  title: ReactNode;
  onNext: () => void;
}

export default function TextOnly({ title, onNext }: TextOnlyProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000); // 내맘대로 2000(?)
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        {title}
      </Typography>
    </div>
  );
}
