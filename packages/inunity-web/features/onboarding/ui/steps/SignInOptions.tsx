import { AnimatePresence, motion } from "motion/react";
import { title } from "process";
import { useState, useEffect } from "react";
import { Button, Input, Typography } from "ui";
import FadeInOutStep from "./FadeInOutStep";

interface SignInOptionsProps {
  studentNumber: string;
  setStudentNumber: (value: string) => void;
  onNext: () => void;
  onAttachCertificate: () => void;
}

export default function SignInOptions({
  studentNumber,
  setStudentNumber,
  onNext,
  onAttachCertificate,
}: SignInOptionsProps) {
  const handleNext = () => {
    if (!studentNumber.trim()) {
      alert("아이디를 입력해주세요!");
      return;
    }

    if (studentNumber.length !== 9 || !/^\d+$/.test(studentNumber)) {
      alert("포탈 아이디는 9자리 학번입니다.");
      return;
    }

    onNext();
  };

  const [shown, setShown] = useState(true); // 텍스트가 보이는지 여부

  return (
    <FadeInOutStep onExit={handleNext} shown={shown}>
      <div className="flex flex-col gap-3">
        <Typography variant="HeadingLargeBold" className="mb-4">
          학내 포탈에서 사용하는
          <br />
          아이디를 입력해주세요.
        </Typography>
        <Input
          value={studentNumber}
          setValue={setStudentNumber}
          placeholder="포탈 아이디"
          className=" self-stretch"
        />
      </div>
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => setShown(false)}>
          계속하기
        </Button>
        {/* <div className="text-center" onClick={onAttachCertificate}>
          학교 포탈 계정이 없나요?
        </div> */}
      </div>
    </FadeInOutStep>
  );
}
