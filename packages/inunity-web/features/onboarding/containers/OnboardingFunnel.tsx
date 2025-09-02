"use client";

import { useFunnel } from "@use-funnel/browser";
import TextOnly from "@/features/onboarding/ui/steps/TextOnly";
import FormStep from "@/features/onboarding/ui/patterns/FormStep";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";
import PasswordForm from "@/features/onboarding/ui/steps/PasswordForm";
import type { OnboardingCtx } from "@/features/onboarding/model/onboarding.types";
import {
  studentNumberSchema,
  extraInfoSchema,
} from "@/features/onboarding/model/onboarding.schema";
import { submitExtraInfo } from "@/features/onboarding/api/onboarding.api";
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
    <div className="h-full flex flex-col">
      <funnel.Render
        /* 1) 텍스트만 */
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
        /* 2) 포털 아이디 입력 (없음 → 9로 분기 버튼) */
        PortalId={({ context, history }) => (
          <div className="flex flex-col gap-3">
            <FormStep<{ studentNumber: string }>
              title="학내 포털 아이디 입력"
              fields={[
                {
                  type: "text",
                  name: "studentNumber",
                  label: "포털 아이디",
                  placeholder: "학번 또는 아이디",
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
            />
            <div className="px-5 -mt-3">
              <ActionBar
                primaryText="포털 계정이 없나요?"
                onPrimary={() => history.push("CertFlow_NoPortal", context)}
              />
            </div>
          </div>
        )}
        /* 3) 포털 비밀번호 입력 → 4.1/4.2 분기 */
        PortalPw={({ context, history }) => (
          <PasswordForm
            studentNumber={context.studentNumber ?? ""}
            password={context.password ?? ""}
            setPassword={(password: string) =>
              history.replace("PortalPw", { ...context, password })
            }
            // 4.1: 가입 이력 有 → 자동 진행 스텝
            handleLoginSuccess={() => history.push("ReturningIntro", context)}
            // 4.2: 가입 이력 無 → 자동 진행 스텝
            handleRegisterSuccess={() => history.push("FirstIntro", context)}
          />
        )}
        /* 4.1) 텍스트만 */
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
        /* 4.2) 텍스트만 */
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
        /* 5) 추가 정보 입력 */
        ExtraInfo={({ context, history }) => (
          <FormStep<{ name: string; nickname?: string; graduationYm?: string }>
            title="추가 정보 입력"
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
                placeholder: "별명",
              },
              {
                type: "text",
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
        /* 6) 텍스트만 */
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
        /* 7) 웹메일(OAuth) → 8 또는 9~11로 분기 */
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
        /* 8) 환영 */
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
        /* 9~11) 증명서 플로우 */
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
        /* 6 or 11 종료 공통 */
        Summary={({ context }) => (
          <div className="px-5">
            <h2 className="text-xl font-bold mb-2">접수가 완료되었습니다.</h2>
            <p className="text-sm text-gray-600 mb-6">
              검토 후 이용할 수 있어요.
            </p>
            <ActionBar primaryText="확인" onPrimary={() => onComplete?.()} />
          </div>
        )}
      />
    </div>
  );
}
