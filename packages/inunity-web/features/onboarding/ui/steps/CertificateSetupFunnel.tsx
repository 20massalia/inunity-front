// (포탈 계정이 없는 경우) 증명서 첨부 및 유저 정보 입력 과정...이었으나 잠정적 폐기(?)

import { useFunnel } from "@use-funnel/browser";
import InputForm from "@/features/onboarding/ui/steps/InputForm";
import CertificateAttach from "./CertificateAttach";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CertificateSetupFunnelProps {
  onComplete: () => void;
}

export function CertificateSetupFunnel({
  onComplete,
}: CertificateSetupFunnelProps) {
  const [step, setStep] = useLocalStorage("certificate_setup_step", "Attach");
  const [context, setContext] = useLocalStorage(
    "certificate_setup_context",
    {}
  );

  const funnel = useFunnel<{
    Attach: Record<string, never>;
    SignInOptions: { studentNumber?: string };
    PasswordForm: { password?: string };
    UserInfoForm: {
      name?: string;
      graduationYear?: string;
      studentNumber?: string;
    };
  }>({
    id: "certificate-setup",
    initial: { step: "Attach", context: {} },
  });

  return (
    <funnel.Render
      Attach={({ history }) => (
        <CertificateAttach
          onAttachCertificate={() => {
            history.push("SignInOptions", {});
            setStep("SignInOptions");
          }}
        />
      )}
      SignInOptions={({ context, history }) => (
        <InputForm
          title="사용할 아이디를 입력해주세요."
          inputFields={[
            {
              name: "studentNumber",
              placeholder: "아이디",
              value: context.studentNumber || "",
              setValue: (studentNumber) => {
                setContext((prev) => ({
                  ...prev,
                  studentNumber,
                }));
                history.replace("SignInOptions", {
                  ...context,
                  studentNumber,
                });
              },
            },
          ]}
          onSubmit={() => {
            history.push("PasswordForm", {});
            setStep("PasswordForm");
          }}
        />
      )}
      PasswordForm={({ context, history }) => (
        <InputForm
          title="사용할 비밀번호를 입력해주세요."
          inputFields={[
            {
              name: "password",
              placeholder: "비밀번호",
              value: context.password || "",
              setValue: (password) => {
                setContext((prev) => ({
                  ...prev,
                  password,
                }));
                history.replace("PasswordForm", {
                  ...context,
                  password,
                });
              },
            },
          ]}
          onSubmit={() => {
            history.push("UserInfoForm", {});
            setStep("UserInfoForm");
          }}
        />
      )}
      UserInfoForm={({ context, history }) => (
        <InputForm
          title="사용자 정보를 입력해주세요."
          inputFields={[
            {
              name: "name",
              placeholder: "이름",
              value: context.name || "",
              setValue: (name) => {
                setContext((prev) => ({
                  ...prev,
                  name,
                }));
                history.replace("UserInfoForm", {
                  ...context,
                  name,
                });
              },
            },
            {
              name: "graduationYear",
              placeholder: "졸업 연월",
              value: context.graduationYear || "",
              setValue: (graduationYear) => {
                setContext((prev) => ({
                  ...prev,
                  graduationYear,
                }));
                history.replace("UserInfoForm", {
                  ...context,
                  graduationYear,
                });
              },
            },
          ]}
          onSubmit={() => {
            onComplete();
            setStep("Complete");
          }}
        />
      )}
    />
  );
}
