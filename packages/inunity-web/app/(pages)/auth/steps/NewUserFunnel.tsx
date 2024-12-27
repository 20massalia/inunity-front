import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFunnel } from "@use-funnel/browser";

import TextOnly from "@/app/(pages)/auth/steps/TextOnly";
import GoogleSignin from "@/app/(pages)/auth/steps/GoogleSignIn";
import CertificateAttach from "./CertificateAttach";
import NewUserInfo from "./NewUserInfo";

interface NewUserFunnelProps {
  onComplete: () => void;
}

type FunnelContext = {
  name?: string;
  nickname?: string;
  graduationYear?: string;
};

export function NewUserFunnel({ onComplete }: NewUserFunnelProps) {
  const { Render, history } = useFunnel<{
    Introduction: Record<string, never>;
    Info: FunnelContext;
    Google: Record<string, never>;
    Certificate: Record<string, never>;
  }>({
    id: "new-user",
    initial: { step: "Introduction", context: {} },
  });

  // pathname 감지해서 구글 로그인 성공/실패 시 처리
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/auth/google/success") {
      // 구글 로그인 성공 시에는 onComplete()
      onComplete();
    } else if (pathname.startsWith("/auth/google/fail")) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const message = urlParams.get("message");

      alert(`Google 로그인 실패\nCode: ${code}\nMessage: ${message}`);
      // 실패 시 Google 단계로 이동
      history.push("Google", {});
    }
  }, [pathname, onComplete, history]);

  return (
    <Render
      Introduction={() => {
        const handleNext = () => {
          history.push("Info", {});
        };

        return (
          <TextOnly
            title={
              <>
                INUnity에 처음이네요!
                <br />
                조금만 더 입력해볼까요?
              </>
            }
            onNext={handleNext}
          />
        );
      }}
      Info={({ context }) => (
        <NewUserInfo context={context} history={history} />
      )}
      Google={() => {
        const handleAttachCertificate = () => {
          history.push("Certificate", {});
        };

        return (
          <GoogleSignin
            onNext={() => {}} // 현재 빈칸
            onAttachCertificate={handleAttachCertificate}
          />
        );
      }}
      Certificate={() => {
        return <CertificateAttach onAttachCertificate={onComplete} />;
      }}
    />
  );
}
