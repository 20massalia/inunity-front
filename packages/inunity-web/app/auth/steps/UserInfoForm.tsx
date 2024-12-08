"use client";

import { Button, Input, Typography } from "ui";

interface UserInfoFormProps {
  name: string;
  setName: (value: string) => void;
  graduationYear: string;
  setGraduationYear: (value: string) => void;
  studentNumber?: string;
  setStudentNumber?: (value: string) => void;
  onNext: () => void;
}

export default function UserInfoForm({
  name,
  setName,
  graduationYear,
  setGraduationYear,
  studentNumber,
  setStudentNumber,
  onNext,
}: UserInfoFormProps) {
  return (
    <div className="min-h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        서비스 이용에 필요한
        <br />몇 가지 정보를 입력해주세요.
      </Typography>
      <div className="flex flex-col gap-4 mt-6 mb-4">
        <Input value={name} setValue={setName} placeholder="이름" />
        {studentNumber !== undefined && setStudentNumber && (
          <Input
            value={studentNumber}
            setValue={setStudentNumber}
            placeholder="학번"
          />
        )}
        <Input
          value={graduationYear}
          setValue={setGraduationYear}
          placeholder="졸업 년월"
        />
      </div>
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={onNext}>
          계속하기
        </Button>
      </div>
    </div>
  );
}
