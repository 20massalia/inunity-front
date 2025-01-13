import { motion, AnimatePresence } from "framer-motion";
import { useEffect, ReactNode, useState } from "react";
import { Typography } from "ui";

interface TextOnlyProps {
  title: ReactNode;
  onNext: () => void;
}

export default function TextOnly({ title, onNext }: TextOnlyProps) {
  const [shown, setShown] = useState(true); // 텍스트가 보이는지 여부

  useEffect(() => {
    // 텍스트를 사라지게 할 때 (예: 2초 후)
    const timer = setTimeout(() => {
      setShown(false);
    }, 2000); // 2초 후 사라짐

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <div
      className="h-real-screen flex flex-col"
      style={{ padding: "50% 20px" }}
    >
      <AnimatePresence onExitComplete={onNext}>
        {shown && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} // 시작 상태: 투명도 0, 위로부터 -50px
            animate={{ opacity: 1, y: 0 }} // 애니메이션 완료 상태: 투명도 1, 원래 위치
            exit={{ opacity: 0, y: 50 }} // 사라질 때 애니메이션
            transition={{
              duration: 1, // 애니메이션 시간 (1초)
              ease: "easeOut", // 이징 함수 (부드러운 움직임)
            }}
          >
            <Typography variant="HeadingLargeBold">{title}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
