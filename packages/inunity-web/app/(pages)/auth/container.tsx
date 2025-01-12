"use client";

import { useFunnel } from "@use-funnel/browser";
import SignInOptions from "@/features/onboarding/ui/steps/SignInOptions";
import PasswordForm from "@/features/onboarding/ui/steps/PasswordForm";
import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import { CertificateSetupFunnel } from "@/features/onboarding/ui/steps/CertificateSetupFunnel";
import { NewUserFunnel } from "../../../features/onboarding/ui/steps/NewUserFunnel";
import { AnimatePresence, motion } from "motion/react";
import fetchExtended, { CustomError } from "@/lib/fetchExtended";
import { useNativeRouter } from "@/hooks/useNativeRouter";

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
  const router = useNativeRouter();

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence>
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
            // const userExists = context.studentNumber === "123"; // 임시 로그인 이력 판별
            return (
              <PasswordForm
                studentNumber={context.studentNumber}
                password={context.password || ""}
                setPassword={(password) =>
                  history.replace("Password", { ...context, password })
                }
                handlePasswordFormSubmit={async () => {
                  let userExists = false;
                  const body = {
                    studentId: context.studentNumber,
                    password: context.password,
                  };
                  try {
                    await fetchExtended("v1/auth/login", {
                      method: "POST",
                      body,
                    });
                    userExists = true;
                  } catch (e) {
                    const err = e as CustomError
                    console.error(err, err.code, err.code == 400)
                    if (err.code == 400) {
                      // 사용자가 없는경우 (회원가입 시도)
                      try {
                        await fetchExtended("v1/auth/register", {
                          method: "POST",
                          body,
                        });
                      } catch (e) {
                        const err = e as CustomError
                        if (err instanceof CustomError && err.code === 400) {
                          alert(
                            "포탈 계정이 올바르지 않아요. 다시 입력해주세요."
                          );
                          history.back()
                        }
                      }
                    } else {
                    }
                    userExists = false;
                  }
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
              onNext={() => router.replace("/")}
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
      </AnimatePresence>
    </div>
  );
}
