import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, Input, Typography, CheckBox } from "ui";
import { DateInput } from "../DateInput";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import FadeInOutStep from "./FadeInOutStep";

interface NewUserInfoProps {
  context: {
    name?: string;
    nickname?: string;
    graduationDate?: string;
  };
  history: any;
  onDone: () => void;
}

export default function NewUserInfo({ context, history }: NewUserInfoProps) {
  const [form, setForm] = useLocalStorage("new_user_info", {
    name: context.name || "",
    nickname: context.nickname || "",
    graduationDate: context.graduationDate || "",
    isGraduated: false,
  });

  const updateField = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (typeof value === "string") {
      history.replace("Info", { ...context, [key]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!form.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (form.isGraduated && !form.graduationDate.trim()) {
      alert("졸업 날짜를 입력해주세요.");
      return;
    }

    const requestBody = {
      userName: form.name,
      nickName: form.nickname,
      graduationDate: form.isGraduated ? form.graduationDate : null,
      isGraduation: form.isGraduated,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`오류가 발생했습니다: ${errorData.message}`);
        return;
      }

      alert("사용자 정보가 성공적으로 저장되었습니다!");
      history.push("Google", {});
    } catch (error) {
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const [shown, setShown] = useState(true); // 텍스트가 보이는지 여부

  return (
    <FadeInOutStep shown={shown} onExit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Typography variant="HeadingLargeBold" className="mb-4">
          서비스 이용에 필요한
          <br />몇 가지 정보를 입력해주세요.
        </Typography>
        <Input
          placeholder="이름"
          value={form.name}
          setValue={(value) => updateField("name", value)}
          className="mt-16"
        />
        <Input
          placeholder="사용할 닉네임"
          value={form.nickname}
          setValue={(value) => updateField("nickname", value)}
          className="mt-16"
        />
        <AnimatePresence>
          {form.isGraduated && (
            <motion.div
              initial={{ opacity: 0 }} // 시작 상태: 투명도 0, 위로부터 -50px
              animate={{ opacity: 1 }} // 애니메이션 완료 상태: 투명도 1, 원래 위치
              exit={{ opacity: 0 }} // 사라질 때 애니메이션
              transition={{
                duration: 0.4, // 애니메이션 시간 (1초)
                ease: "easeOut", // 이징 함수 (부드러운 움직임)
              }}
            >
              <DateInput
                placeholder="졸업 날짜"
                value={form.graduationDate}
                setValue={(value) => updateField("graduationDate", value)}
                className="w-32"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 h-full">
          <CheckBox
            checked={form.isGraduated}
            setChecked={(checked) => {
              updateField("isGraduated", checked);
              if (!checked) {
                updateField("graduationDate", "");
              }
            }}
          />
          <Typography>졸업 여부</Typography>
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
