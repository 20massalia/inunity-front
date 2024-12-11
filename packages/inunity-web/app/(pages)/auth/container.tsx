"use client";

import { useFunnel } from "@use-funnel/browser";
import * as Steps from "@/app/(pages)/auth/steps";

type StepContextMap = {
  Welcome: Record<string, never>;
  SignInOptions: {
    studentNumber?: string;
    route?: "normal" | "certificate";
  };
  PasswordForm: {
    studentNumber: string;
    password: string;
    route?: "normal" | "certificate";
  };
  ExistingUserConfirmation: { studentNumber: string; password: string };
  NewUserConfirmation: { studentNumber: string; password: string };
  UserInfoForm: {
    studentNumber: string;
    password: string;
    name?: string;
    graduationYear?: string;
    department?: string;
    route?: "normal" | "certificate";
  };
  GoogleSignIn: Record<string, never>;
  CertificateAttach: {
    fromGoogleSignIn?: boolean;
  };
  CertificateCompletion: Record<string, never>;
};

export default function AuthContainer() {
  const funnel = useFunnel<StepContextMap>({
    id: "auth-funnel",
    initial: {
      step: "Welcome",
      context: {},
    },
  });

  return (
    <div className="h-full flex flex-col">
      <funnel.Render
        Welcome={({ history }) => (
          <Steps.Welcome onNext={() => history.push("SignInOptions", {})} />
        )}
        SignInOptions={({ context, history }) => (
          <Steps.SignInOptions
            studentNumber={context.studentNumber || ""}
            setStudentNumber={(studentNumber) =>
              history.replace("SignInOptions", {
                ...context,
                studentNumber,
              })
            }
            onNext={() =>
              // 아이디 입력 후 비밀번호 입력 페이지로 이동
              history.push("PasswordForm", (prev) => ({
                ...prev,
                studentNumber: context.studentNumber || "",
                password: "",
              }))
            }
            onAttachCertificate={() =>
              // '학교 포탈 계정이 없나요?' 클릭 시 증명서 첨부 페이지로 이동
              history.push("CertificateAttach", (prev) => ({
                ...prev,
                fromGoogleSignIn: false, // 구글로그인으로 넘어가지 않음
              }))
            }
            title={
              context.route === "certificate"
                ? "사용하고자 하는\n아이디를 입력해주세요." // 증명서 첨부 이후 사용할 아이디 입력
                : "학내 포탈에서 사용하는\n아이디를 입력해주세요." // 초기 아이디 입력
            }
          />
        )}
        PasswordForm={({ context, history }) => (
          <Steps.PasswordForm
            studentNumber={context.studentNumber}
            password={context.password || ""}
            setPassword={(password) =>
              history.replace("PasswordForm", (prev) => ({
                ...prev,
                password,
              }))
            }
            handlePasswordFormSubmit={() => {
              if (context.route === "certificate") {
                // 증명서 첨부 이후 비밀번호 입력이다?
                history.push("UserInfoForm", (prev) => ({
                  // 사용자 정보 입력으로 이동
                  ...prev,
                  route: "certificate",
                  password: context.password || "",
                }));
              } else {
                // 초기 아이디 입력 이후 비밀번호 입력이다?
                const userExists = context.studentNumber === "123"; // 임시 로그인 이력 판별 로직
                const nextStep = userExists
                  ? "ExistingUserConfirmation" // 로그인 이력 유
                  : "NewUserConfirmation"; // 로그인 이력 무
                history.push(nextStep, (prev) => ({
                  ...prev,
                  password: context.password || "",
                }));
              }
            }}
            title={
              context.route === "certificate"
                ? "사용하고자 하는\n비밀번호를 입력해주세요." // 증명서 첨부 이후 사용할 비밀번호 입력
                : "학내 포탈에서 사용하는\n비밀번호를 입력해주세요." // 초기 비밀번호 입력
            }
          />
        )}
        ExistingUserConfirmation={({ context }) => (
          <Steps.ExistingUserConfirmation
            onNext={() => {
              // 로그인이 완료되었음을 가정
              alert("로그인이 완료되었습니다!");
            }}
          />
        )}
        NewUserConfirmation={({ context, history }) => (
          <Steps.NewUserConfirmation
            onNext={() =>
              history.push("UserInfoForm", (prev) => ({
                ...prev,
                route: "normal", // 이름, 졸업연월만 입력하는 사용자 정보 입력 페이지
              }))
            }
          />
        )}
        UserInfoForm={({ context, history }) => (
          <Steps.UserInfoForm
            name={context.name || ""}
            setName={(name) =>
              history.replace("UserInfoForm", (prev) => ({
                ...prev,
                name,
              }))
            }
            graduationYear={context.graduationYear || ""}
            setGraduationYear={(graduationYear) =>
              history.replace("UserInfoForm", (prev) => ({
                ...prev,
                graduationYear,
              }))
            }
            studentNumber={
              context.route === "certificate"
                ? context.studentNumber || ""
                : undefined
            }
            setStudentNumber={
              context.route === "certificate" // 증명서 첨부 이후 사용자 정보 입력 페이지일 경우 학번 입력 필요
                ? (studentNumber) =>
                    history.replace("UserInfoForm", (prev) => ({
                      ...prev,
                      studentNumber,
                    }))
                : undefined
            }
            onNext={() => {
              if (context.route === "certificate") {
                // 증명서 첨부 이후 사용자 정보 입력 페이지다?
                history.push("CertificateCompletion", {}); // 로그인 완료(완료..라기보단 대기?)
              } else {
                // 초기 사용자 정보 입력 페이지다?
                history.push("GoogleSignIn", {}); // 구글 로그인으로 이동
              }
            }}
          />
        )}
        GoogleSignIn={({ history }) => (
          <Steps.GoogleSignIn
            onNext={() => (window.location.href = `${process.env.서버}/구글`)} // 임시 url
            onAttachCertificate={() =>
              // '학교 웹메일 계정이 없나요?' 클릭 시 증명서 첨부 페이지로 이동
              history.push("CertificateAttach", (prev) => ({
                ...prev,
                fromGoogleSignIn: true,
              }))
            }
          />
        )}
        CertificateAttach={({ context, history }) => (
          <Steps.CertificateAttach
            onAttachCertificate={() => {
              if (context.fromGoogleSignIn) {
                // 구글 로그인 페이지에서 '학교 웹메일 계정이 없나요?' 클릭한 경우 -> 별다른 정보 입력 X 로그인 완료
                history.push("CertificateCompletion", {});
              } else {
                // 초기 아이디 입력 페이지에서 '학교 포탈 계정이 없나요?' 클릭한 경우 -> 아이디 등등 정보 입력 O
                history.push("SignInOptions", (prev) => ({
                  ...prev,
                  route: "certificate",
                }));
              }
            }}
          />
        )}
        CertificateCompletion={() => <Steps.CertificateCompletion />}
      />
    </div>
  );
}
