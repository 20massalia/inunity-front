import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, CheckBox, Input, Typography } from "ui";
import FadeInOutStep from "./FadeInOutStep";

interface NewUserInfoProps {
  context: {
    name?: string;
    nickname?: string;
    graduationYear?: string;
  };
  history: any;
  onDone: () => void;
}

export default function NewUserInfo({ context, history, onDone }: NewUserInfoProps) {
  const [name, setName] = useState(context.name || "");
  const [nickname, setNickname] = useState(context.nickname || "");
  const [graduationYear, setGraduationYear] = useState(
    context.graduationYear || "2025-01"
  );
  const [isGraduated, setIsGraduated] = useState(false);

  const updateContext = (key: keyof typeof context, value: string) => {
    history.replace("Info", { ...context, [key]: value });
  };


  const [shown, setShown] = useState(true); // 텍스트가 보이는지 여부

  return (
    <FadeInOutStep shown={shown} onExit={onDone}>
      <div className="flex flex-col gap-4">
        <Typography variant="HeadingLargeBold" className="mb-4">
          서비스 이용에 필요한
          <br />몇 가지 정보를 입력해주세요.
        </Typography>

        <Input
          placeholder="이름"
          value={name}
          setValue={(value) => {
            setName(value);
            updateContext("name", value);
          }}
          className="mt-4"
        />
        <Input
          placeholder="사용할 닉네임"
          value={nickname}
          setValue={(value) => {
            setNickname(value);
            updateContext("nickname", value);
          }}
          className="mt-4"
        />
        <AnimatePresence>
          {isGraduated && (
            <motion.div
              initial={{ opacity: 0 }} // 시작 상태: 투명도 0, 위로부터 -50px
              animate={{ opacity: 1 }} // 애니메이션 완료 상태: 투명도 1, 원래 위치
              exit={{ opacity: 0 }} // 사라질 때 애니메이션
              transition={{
                duration: 0.4, // 애니메이션 시간 (1초)
                ease: "easeOut", // 이징 함수 (부드러운 움직임)
              }}
            >
              <Input
                placeholder="졸업 연월"
                value={graduationYear}
                setValue={(value) => {
                  setGraduationYear(value);
                  updateContext("graduationYear", value);
                }}
                className="mt-4 w-full"
                type="month"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center mt-4 gap-3">
          <CheckBox
            checked={isGraduated}
            setChecked={(checked) => setIsGraduated(checked)}
          />
          <label className="mr-4">졸업 여부</label>
        </div>
      </div>

      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => setShown(false)}>
          계속하기
        </Button>
      </div>
    </FadeInOutStep>
  );
}
