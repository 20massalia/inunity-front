import { useState } from "react";
import { Button, Input, Typography, CheckBox } from "ui";
import { DateInput } from "../DateInput";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NewUserInfoProps {
  context: {
    name?: string;
    nickname?: string;
    graduationDate?: string;
  };
  history: any;
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

  return (
    <div className="h-dvh flex flex-col mx-5">
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
      <div className="flex items-center justify-between mt-4 w-full h-[50px]">
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
        {form.isGraduated && (
          <DateInput
            placeholder="졸업 날짜"
            value={form.graduationDate}
            setValue={(value) => updateField("graduationDate", value)}
            className="w-32"
          />
        )}
      </div>

      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={handleSubmit}>
          계속하기
        </Button>
      </div>
    </div>
  );
}
