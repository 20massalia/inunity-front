import { useState } from "react";
import { Button, Input, Typography } from "ui";

interface NewUserInfoProps {
  context: {
    name?: string;
    nickname?: string;
    graduationYear?: string;
  };
  history: any;
}

export default function NewUserInfo({ context, history }: NewUserInfoProps) {
  const [name, setName] = useState(context.name || "");
  const [nickname, setNickname] = useState(context.nickname || "");
  const [graduationYear, setGraduationYear] = useState(
    context.graduationYear || ""
  );
  const [isGraduated, setIsGraduated] = useState(false);

  const updateContext = (key: keyof typeof context, value: string) => {
    history.replace("Info", { ...context, [key]: value });
  };

  const handleSubmit = () => {
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
      {isGraduated && (
        <Input
          placeholder="졸업 연월"
          value={graduationYear}
          setValue={(value) => {
            setGraduationYear(value);
            updateContext("graduationYear", value);
          }}
          className="mt-4"
        />
      )}

      <div className="flex items-center mt-4">
        <label className="mr-4">졸업 여부</label>
        <button
          onClick={() => setIsGraduated((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isGraduated ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              isGraduated
                ? "translate-x-6 bg-white"
                : "translate-x-0 bg-gray-500"
            }`}
          />
        </button>
      </div>

      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={handleSubmit}>
          계속하기
        </Button>
      </div>
    </div>
  );
}
