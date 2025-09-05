"use client";

import { useFunnel } from "@use-funnel/browser";
import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import InfoStep from "@/features/onboarding/ui/patterns/InfoStep";
import FormStep from "@/features/onboarding/ui/patterns/FormStep";
import type { OnboardingCtx } from "@/features/onboarding/model/onboarding.types";
import {
  studentNumberSchema,
  extraInfoSchema,
} from "@/features/onboarding/model/onboarding.schema";
import {
  submitExtraInfo,
  loginPortal,
  registerPortal,
  ApiError,
} from "@/features/onboarding/api/onboarding.api";
import WebmailFunnel from "@/features/onboarding/containers/sub/WebmailFunnel";
import CertificateFunnel from "@/features/onboarding/containers/sub/CertificateFunnel";

type StepMap = {
  Welcome: OnboardingCtx;
  PortalId: OnboardingCtx;
  PortalPw: OnboardingCtx;
  ReturningIntro: OnboardingCtx;
  FirstIntro: OnboardingCtx;
  ExtraInfo: OnboardingCtx;
  PreWebmail: OnboardingCtx;
  WebmailFlow: OnboardingCtx;
  CertFlow_NoPortal: OnboardingCtx;
  CertFlow_PortalNoWebmail: OnboardingCtx;
  Greet: OnboardingCtx;
  Summary: OnboardingCtx;
};

export default function OnboardingFunnel({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const funnel = useFunnel<StepMap>({
    id: "onboarding",
    initial: { step: "Welcome", context: {} as OnboardingCtx },
  });

  return (
    <div className="h-real-screen flex flex-col">
      <funnel.Render
        Welcome={({ context, history }) => (
          <TextOnly
            title={
              <>
                반가워요!
                <br />
                로그인을 시작해볼까요?
              </>
            }
            onNext={() => history.push("PortalId", context)}
          />
        )}
        PortalId={({ context, history }) => (
          <FormStep<{ studentNumber: string }>
            title={"학내 포탈에서 사용하는\n아이디를 입력해주세요."}
            fields={[
              {
                type: "text",
                name: "studentNumber",
                label: "포탈 아이디",
                placeholder: "9자리 학번",
              },
            ]}
            defaultValues={{ studentNumber: context.studentNumber ?? "" }}
            onSubmit={(v) => {
              const ok = studentNumberSchema.safeParse(v);
              if (!ok.success) return alert(ok.error.issues[0]?.message);
              history.push("PortalPw", {
                ...context,
                studentNumber: v.studentNumber,
              });
            }}
            secondaryText="학교 포탈 계정이 없나요?"
            onSecondary={() => history.push("CertFlow_NoPortal", context)}
          />
        )}
        PortalPw={({ context, history }) => (
          <FormStep<{ password: string }>
            title={"학내 포탈에서 사용하는\n비밀번호를 입력해주세요."}
            fields={[
              {
                type: "password",
                name: "password",
                label: "포탈 비밀번호",
                placeholder: "포탈 비밀번호",
              },
            ]}
            defaultValues={{ password: context.password ?? "" }}
            onSubmit={async (v) => {
              const password = v.password?.trim();
              if (!password) return alert("비밀번호를 입력해주세요!");
              try {
                const res = await loginPortal({
                  studentId: context.studentNumber!,
                  password,
                });
                // 로그인 성공 시에만 온보딩 진행
                if (res.hasHistory)
                  history.push("ReturningIntro", { ...context, password });
                else history.push("FirstIntro", { ...context, password });
              } catch (e) {
                if (e instanceof ApiError && e.code === "USER_NOT_FOUND") {
                  // 포탈 계정이 없는 경우 안내
                  alert(
                    "해당 포탈 계정이 존재하지 않습니다.\n'학교 포탈 계정이 없나요?' 버튼을 통해 회원가입을 진행해주세요."
                  );
                } else if (
                  e instanceof ApiError &&
                  e.code === "INVALID_CREDENTIALS"
                ) {
                  alert(
                    "아이디 또는 비밀번호가 잘못되었습니다.\n다시 확인해주세요."
                  );
                } else {
                  alert(
                    "네트워크 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
                  );
                }
              }
            }}
          />
        )}
        ReturningIntro={({ context }) => (
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
            onNext={() => onComplete?.()}
          />
        )}
        FirstIntro={({ context, history }) => (
          <TextOnly
            title={
              <>
                INUnity에 처음이네요!
                <br />
                조금만 더 입력해볼까요?
              </>
            }
            onNext={() => history.push("ExtraInfo", context)}
          />
        )}
        ExtraInfo={({ context, history }) => (
          <FormStep<{ name: string; nickname?: string; graduationYm?: string }>
            title={"서비스 이용에 필요한\n몇 가지 정보를 입력해주세요."}
            fields={[
              {
                type: "text",
                name: "name",
                label: "이름",
                placeholder: "홍길동",
              },
              {
                type: "text",
                name: "nickname",
                label: "닉네임(선택)",
                placeholder: "닉네임",
              },
              {
                type: "month",
                name: "graduationYm",
                label: "졸업 연월(선택)",
                placeholder: "YYYY-MM",
              },
            ]}
            defaultValues={{
              name: context.name ?? "",
              nickname: context.nickname ?? "",
              graduationYm: context.graduationYm ?? "",
            }}
            onSubmit={async (v) => {
              const payload: OnboardingCtx = {
                ...context,
                name: v.name,
                nickname: v.nickname || undefined,
                isGraduated: !!v.graduationYm,
                graduationYm: v.graduationYm || undefined,
              };
              const ok = extraInfoSchema.safeParse(payload);
              if (!ok.success) return alert(ok.error.issues[0]?.message);
              await submitExtraInfo({
                name: payload.name!,
                nickname: payload.nickname,
                isGraduated: !!payload.isGraduated,
                graduationYm: payload.graduationYm,
              });
              history.push("PreWebmail", payload);
            }}
          />
        )}
        PreWebmail={({ context, history }) => (
          <TextOnly
            title={
              <>
                좋아요,
                <br />곧 이용할 수 있을 거예요!
              </>
            }
            onNext={() => history.push("WebmailFlow", context)}
          />
        )}
        WebmailFlow={({ context, history }) => (
          <WebmailFunnel
            initial="WebmailLogin"
            ctx={context}
            onPatch={(p) =>
              history.replace("WebmailFlow", { ...context, ...p })
            }
            onDone={() => history.push("Greet", context)}
            onNeedCertificate={() =>
              history.push("CertFlow_PortalNoWebmail", context)
            }
          />
        )}
        Greet={({ context }) => (
          <TextOnly
            title={
              <>
                {context.name ?? "사용자"}님 반가워요!
                <br />
                이제 시작해볼까요?
              </>
            }
            onNext={() => onComplete?.()}
          />
        )}
        CertFlow_NoPortal={({ context, history }) => (
          <CertificateFunnel
            variant="no-portal"
            ctx={context}
            onPatch={(p) =>
              history.replace("CertFlow_NoPortal", { ...context, ...p })
            }
            onDone={() => history.push("Summary", context)}
          />
        )}
        CertFlow_PortalNoWebmail={({ context, history }) => (
          <CertificateFunnel
            variant="portal-no-webmail"
            ctx={context}
            onPatch={(p) =>
              history.replace("CertFlow_PortalNoWebmail", { ...context, ...p })
            }
            onDone={() => history.push("Summary", context)}
          />
        )}
        Summary={({ context }) => (
          <InfoStep
            title="접수가 완료되었습니다."
            description="검토 후 이용할 수 있어요."
            primaryText="확인"
            onPrimary={() => onComplete?.()}
          />
        )}
      />
    </div>
  );
}
