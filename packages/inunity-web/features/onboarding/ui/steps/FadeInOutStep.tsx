import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function FadeInOutStep({
  onExit,
  children,
  shown,
}: React.PropsWithChildren<{
  onExit?: () => void;
  shown: boolean;
}>) {
  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <AnimatePresence onExitComplete={onExit}>
        {shown && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} // 시작 상태: 투명도 0, 위로부터 -50px
            animate={{ opacity: 1, y: 0 }} // 애니메이션 완료 상태: 투명도 1, 원래 위치
            exit={{ opacity: 0, y: 50 }} // 사라질 때 애니메이션
            transition={{
              duration: 1, // 애니메이션 시간 (1초)
              ease: "easeOut", // 이징 함수 (부드러운 움직임)
            }}
            className="flex flex-col w-full flex-1 p-5 justify-between gap-4"
            style={{ paddingTop: "30%" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
