"use client";

import StepLayout from "@/features/onboarding/ui/steps/StepLayout";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";
import FilePicker from "@/features/onboarding/ui/primitives/FilePicker";

export default function UploadStep({
  title,
  description,
  file,
  onChange,
  onNext,
  uploading = false,
  shown = true,
}: {
  title: string;
  description?: React.ReactNode;
  file: File | null;
  onChange: (f: File | null) => void;
  onNext: () => void;
  uploading?: boolean;
  shown?: boolean;
}) {
  return (
    <StepLayout
      title={title}
      description={description}
      shown={shown}
      footer={
        <ActionBar
          primaryText={uploading ? "업로드 중…" : "계속하기"}
          onPrimary={onNext}
          disabled={!file || uploading}
        />
      }
    >
      <div className="flex flex-col items-start mb-4">
        <FilePicker value={file} onChange={onChange} />
      </div>
    </StepLayout>
  );
}
