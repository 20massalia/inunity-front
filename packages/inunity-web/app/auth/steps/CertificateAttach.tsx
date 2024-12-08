import { Button, Typography } from "ui";

interface CertificateAttachProps {
  onAttachCertificate: () => void;
}

export default function CertificateAttach({
  onAttachCertificate,
}: CertificateAttachProps) {
  return (
    <div className="min-h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        증명서 첨부
      </Typography>
      <Typography className="text-sm mb-6">
        3개월 이내 발급한 졸업/재학증명서를 제출해주세요. <br />
        영업일 기준 최대 72시간 이내에 처리해드리겠습니다.
      </Typography>
      <div className="flex items-center justify-between w-full max-w-sm p-4 border rounded-lg">
        <Typography>파일 선택</Typography>
        <span className="material-icons">attach_file</span>
      </div>
      <div className="mt-auto mb-5 flex flex-col">
        <Button variant="primary" size="large" onClick={onAttachCertificate}>
          계속하기
        </Button>
      </div>
    </div>
  );
}
