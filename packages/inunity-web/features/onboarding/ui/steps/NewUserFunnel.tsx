import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFunnel } from "@use-funnel/browser";

import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import GoogleSignin from "@/features/onboarding/ui/steps/GoogleSignIn";
import CertificateAttach from "./CertificateAttach";
import NewUserInfo from "./NewUserInfo";
import fetchExtended from "@/lib/fetchExtended";

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
        <NewUserInfo
          context={context}
          history={history}
          onDone={async () => {
            try {
              await fetchExtended("v1/users/", {
                method: "PUT",
                body: {
                  userName: context.name,
                  nickName: context.nickname,
                  graduationDate: context.graduationYear,
                  isGraduation: Boolean(context.graduationYear),
                },
              });
              history.push("Google", {});
            } catch (e) {
              alert('사용자 정보가 제대로 입력되지 않았어요 🥲')
            }
          }}
        />
      )}
      Google={() => {
        // 학교 웸 메일이 없는 경우 증명서 제출 페이지로 이동
        const handleAttachCertificate = () => {
          history.push("Certificate", {});
        };

        return <GoogleSignin onAttachCertificate={handleAttachCertificate} />;
      }}
      Certificate={() => {
        return <CertificateAttach onAttachCertificate={onComplete} />;
      }}
    />
  );
}
