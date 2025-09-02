"use client";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";
import { Typography } from "ui";

// 교내 포탈 계정이 없는 경우 or 웹메일 계정이 없는 경우 교내 구성원 인증을 위해 증명서를 첨부하는 컴포넌트
export default function FilePicker({
  label = "파일 선택",
  accept = "image/png, image/jpeg, image/jpg, application/pdf",
  value,
  onChange,
  error,
}: {
  label?: string;
  accept?: string;
  value?: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}) {
  const id = useId();

  return (
    <div className="flex flex-col items-start mb-4">
      <label
        htmlFor={id}
        className="flex items-center justify-between w-full max-w-sm p-4 border rounded-lg cursor-pointer"
      >
        <Typography>{value?.name ?? label}</Typography>
        <FontAwesomeIcon icon={faFile} />
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
