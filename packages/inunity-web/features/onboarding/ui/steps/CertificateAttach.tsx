import { Button, Typography } from "ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FadeInOutStep from "./FadeInOutStep";

interface CertificateAttachProps {
  onAttachCertificate: () => void;
}

export default function CertificateAttach({
  onAttachCertificate,
}: CertificateAttachProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 현재 파일 형식에 대한 제한 없음, pdf가 용량이 크다는 정아씨의 의견...
  // 이미지로 제한을 해야 하나?
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // 업로드
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  const [shown, setShown] = useState(true)

  return (
    <FadeInOutStep shown={shown} onExit={onAttachCertificate}>
      <div className="flex flex-col gap-3">
      <Typography variant="HeadingLargeBold" className="mb-4">
        증명서 첨부
      </Typography>
      <Typography className="text-sm mb-6">
        3개월 이내 발급한 졸업/재학증명서를 제출해주세요. <br />
        영업일 기준 최대 72시간 이내에 처리해드리겠습니다.
      </Typography>
      <div className="flex flex-col items-start mb-4">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-between w-full max-w-sm p-4 border rounded-lg cursor-pointer"
        >
          <Typography>
            {selectedFile ? selectedFile.name : "파일 선택"}
          </Typography>
          <FontAwesomeIcon icon={faFile} />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{display:'none'}}
          
          onChange={handleFileChange}
        />
      </div>
      </div>

    
      <div className="mt-auto mb-5 flex flex-col">
        <Button variant="primary" size="large" onClick={() => setShown(false)}>
          계속하기
        </Button>
      </div>
    </FadeInOutStep>
  );
}
