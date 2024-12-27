"use client";

import { useFunnel } from "@use-funnel/browser";
import SignInOptions from "@/app/(pages)/auth/steps/SignInOptions";
import PasswordForm from "@/app/(pages)/auth/steps/PasswordForm";
import TextOnly from "@/app/(pages)/auth/steps/TextOnly";
import { CertificateSetupFunnel } from "@/app/(pages)/auth/steps/CertificateSetupFunnel";
import { NewUserFunnel } from "./steps/NewUserFunnel";

export default function AuthContainer() {
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
            }}
          />
        )}
        SignIn={({ context, history }) => (
          <SignInOptions
            studentNumber={context.studentNumber || ""}
            setStudentNumber={(studentNumber) =>
              history.replace("SignIn", { ...context, studentNumber })
            }
            onNext={() =>
              history.push("Password", {
                studentNumber: context.studentNumber || "",
              })
            }
            onAttachCertificate={() => history.push("CertificateSetup", {})}
          />
        )}
        Password={({ context, history }) => {
          const userExists = context.studentNumber === "123"; // 임시 로그인 이력 판별
          return (
            <PasswordForm
              studentNumber={context.studentNumber}
              password={context.password || ""}
              setPassword={(password) =>
                history.replace("Password", { ...context, password })
              }
              handlePasswordFormSubmit={() => {
                if (userExists) {
                  history.push("ExistingUser", {});
                } else {
                  history.push("NewUser", {});
                }
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
            onNext={() => alert("로그인 완료")}
          />
        )}
        NewUser={({ history }) => (
          <NewUserFunnel onComplete={() => history.push("Completion", {})} />
        )}
        CertificateSetup={({ history }) => (
          <CertificateSetupFunnel
            onComplete={() => history.push("Completion", {})}
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
