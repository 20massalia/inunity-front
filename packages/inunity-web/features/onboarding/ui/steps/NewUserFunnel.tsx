import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFunnel } from "@use-funnel/browser";

import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import GoogleSignin from "@/features/onboarding/ui/steps/GoogleSignIn";
import CertificateAttach from "./CertificateAttach";
import NewUserInfo from "./NewUserInfo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import fetchExtended from "@/lib/fetchExtended";

interface NewUserFunnelProps {
  onComplete: () => void;
}

type FunnelContext = {
  name?: string;
  nickname?: string;
  graduationDate?: string;
};

export function NewUserFunnel({ onComplete }: NewUserFunnelProps) {
  const [step, setStep] = useLocalStorage("new_user_step", "Introduction");
  const [context, setContext] = useLocalStorage("new_user_context", {});

  const funnel = useFunnel<{
    Introduction: Record<string, never>;
    Info: FunnelContext;
    Google: Record<string, never>;
    Certificate: Record<string, never>;
  }>({
    id: "new-user",
    initial: { step: "Introduction", context: {} },
  });

  // pathname 감지해서 구글 로그인 성공/실패 시 처리
  // Todo: auth/google/success or fail 페이지에서 처리 필요. or /auth#success나 /auth#fail로 처리

  // const pathname = usePathname();
  // useEffect(() => {
  //   if (pathname === "/auth/google/success") {
  //     // 구글 로그인 성공 시에는 onComplete()
  //     onComplete();
  //   } else if (pathname.startsWith("/auth/google/fail")) {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get("code");
  //     const message = urlParams.get("message");

  //     alert(`Google 로그인 실패\nCode: ${code}\nMessage: ${message}`);
  //     // 실패 시 Google 단계로 이동
  //     history.push("Google", {});
  //   }
  // }, [pathname, onComplete, history]);

  return (
    <funnel.Render
      Introduction={({ history }) => {
        const handleNext = () => {
          history.push("Info", {});
          setStep("Info");
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
      Info={({ context, history }) => (
        <NewUserInfo
          context={context}
          history={{
            ...history,
            replace: (step: "Info", updatedContext: FunnelContext) => {
              const mergedContext = { ...context, ...updatedContext };
              history.replace(step, mergedContext);
              setContext((prev) => ({ ...prev, ...mergedContext }));
            },
          }}
          onDone={async () => {
            try {
              await fetchExtended("v1/users/", {
                method: "PUT",
                body: {
                  userName: context.name,
                  nickName: context.nickname,
                  graduationDate: context.graduationDate,
                  isGraduation: Boolean(context.graduationDate),
                },
              });
              history.push("Google", {});
            } catch (e) {
              alert("사용자 정보가 제대로 입력되지 않았어요 🥲");
            }
          }}
        />
      )}
      Google={({history}) => {
        // 학교 웸 메일이 없는 경우 증명서 제출 페이지로 이동
        const handleAttachCertificate = () => {
          history.push("Certificate", {});
          setStep("Certificate");
        };

        return <GoogleSignin onAttachCertificate={handleAttachCertificate} />;

      }}
      Certificate={() => (
        <CertificateAttach
          onAttachCertificate={() => {
            onComplete();
            setStep("Complete");
          }}
        />
      )}
    />
  );
}
