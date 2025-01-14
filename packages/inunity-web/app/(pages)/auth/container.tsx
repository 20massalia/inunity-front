"use client";

import { useFunnel } from "@use-funnel/browser";
import SignInOptions from "@/features/onboarding/ui/steps/SignInOptions";
import PasswordForm from "@/features/onboarding/ui/steps/PasswordForm";
import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import { CertificateSetupFunnel } from "@/features/onboarding/ui/steps/CertificateSetupFunnel";
import { NewUserFunnel } from "../../../features/onboarding/ui/steps/NewUserFunnel";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { MessageEventType } from "message-type/message-type";

export default function AuthContainer() {
  const [step, setStep] = useLocalStorage("onboarding_step", "Welcome");
  const [context, setContext] = useLocalStorage("onboarding_context", {});

  const funnel = useFunnel<{
    Welcome: Record<string, never>;
    SignIn: { studentNumber?: string };
    Password: { studentNumber: string; password?: string };
    ExistingUser: Record<string, never>;
    NewUser: Record<string, never>;
    CertificateSetup: Record<string, never>;
    Completion: Record<string, never>;
  }>({
    id: "auth",
    initial: { step: "Welcome", context: {} },
  });
  const { messageManager } = useMessageManager();
  const router = useNativeRouter();

  return (
    <div className="h-full flex flex-col">
      <funnel.Render
        Welcome={({ history }) => (
          <TextOnly
            title={
              <>
                반가워요!
                <br />
                로그인을 시작해볼까요?
              </>
            }
            onNext={() => {
              history.push("SignIn", {});
              setStep("SignIn");
            }}
          />
        )}
        SignIn={({ context, history }) => (
          <SignInOptions
            studentNumber={context.studentNumber || ""}
            setStudentNumber={(studentNumber) => {
              setContext((prev) => ({
                ...prev,
                studentNumber,
              }));
              history.replace("SignIn", { ...context, studentNumber });
            }}
            onNext={() => {
              history.push("Password", {
                studentNumber: context.studentNumber || "",
              });
              setStep("Password");
            }}
            onAttachCertificate={() => {
              history.push("CertificateSetup", {});
              setStep("CertificateSetup");
            }}
          />
        )}
        Password={({ context, history }) => {
          return (
            <PasswordForm
              studentNumber={context.studentNumber}
              password={context.password || ""}
              setPassword={(password) =>
                history.replace("Password", { ...context, password })
              }
              handleLoginSuccess={() => {
                messageManager?.sendMessage(MessageEventType.Login);
                history.push("ExistingUser", {});
                setStep("ExistingUser");
              }}
              handleRegisterSuccess={() => {
                messageManager?.sendMessage(MessageEventType.Login);
                history.push("NewUser", {});
                setStep("NewUser");
              }}
            />
          );
        }}
        ExistingUser={() => (
          <TextOnly
            title={
              <>
                INUnity를
                <br />
                사용해보신 적이 있네요!
                <br />
                돌아오신 걸 환영해요!
              </>
            }
            onNext={() => router.replace("/")}
          />
        )}
        NewUser={({ history }) => (
          <NewUserFunnel
            onComplete={() => {
              history.push("Completion", {});
              setStep("Completion");
            }}
          />
        )}
        CertificateSetup={({ history }) => (
          <CertificateSetupFunnel
            onComplete={() => {
              history.push("Completion", {});
              setStep("Completion");
            }}
          />
        )}
        Completion={() => (
          <TextOnly
            title={
              <>
                좋아요,
                <br />곧 이용할 수 있을 거예요!
              </>
            }
            onNext={() => {}}
          />
        )}
      />
    </div>
  );
}
