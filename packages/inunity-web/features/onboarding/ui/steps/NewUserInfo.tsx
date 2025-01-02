import { useState } from "react";
import { Button, Input, Typography, CheckBox } from "ui";
import { DateInput } from "../DateInput";

interface NewUserInfoProps {
  context: {
    name?: string;
    nickname?: string;
    graduationDate?: string;
  };
  history: any;
}

export default function NewUserInfo({ context, history }: NewUserInfoProps) {
  const [form, setForm] = useState({
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

  const handleSubmit = () => {
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

    history.push("Google", {});
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
