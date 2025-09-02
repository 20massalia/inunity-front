"use client";

import { useFunnel } from "@use-funnel/browser";
import StepLayout from "@/features/onboarding/ui/StepLayout";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";
import OAuthButton from "@/features/onboarding/ui/primitives/OAuthButton";
import FormStep from "@/features/onboarding/ui/patterns/FormStep";
import { extraInfoSchema } from "@/features/onboarding/model/onboarding.schema";
import type { OnboardingCtx } from "@/features/onboarding/model/onboarding.types";

type WebmailStep = "ExtraInfo" | "WebmailLogin";
type StepMap = Record<WebmailStep, OnboardingCtx>;

export default function WebmailFunnel({
  initial = "WebmailLogin",
  ctx,
  onPatch,
  onDone,
  onNeedCertificate,
}: {
  initial?: WebmailStep;
  ctx: OnboardingCtx;
  onPatch: (p: Partial<OnboardingCtx>) => void;
  onDone: () => void;
  onNeedCertificate?: () => void;
}) {
  const funnel = useFunnel<StepMap>({
    id: "webmail",
    initial: { step: initial as WebmailStep, context: ctx },
  });

  return (
    <funnel.Render
      ExtraInfo={({ context, history }) => (
        <FormStep<{ name: string; nickname?: string; graduationYm?: string }>
          title="사용자 정보 입력"
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
          onSubmit={(v) => {
            const patch: Partial<OnboardingCtx> = {
              name: v.name,
              nickname: v.nickname || undefined,
              isGraduated: !!v.graduationYm,
              graduationYm: v.graduationYm || undefined,
            };
            const ok = extraInfoSchema.safeParse(patch as any);
            if (!ok.success) {
              alert(ok.error.issues[0]?.message);
              return;
            }
            onPatch(patch);
            history.push("WebmailLogin", { ...context, ...patch });
          }}
        />
      )}
      WebmailLogin={({ context }) => (
        <StepLayout
          title="학과 인증 — 구글 로그인"
          description="학교 웹메일로 로그인해 주세요."
          shown
          footer={
            <ActionBar
              primaryText="완료"
              onPrimary={onDone}
              secondaryText="학교 웹메일 계정이 없나요?"
              onSecondary={onNeedCertificate}
            />
          }
        >
          <OAuthButton
            provider="google"
            onClick={() => {
              // 실제 OAuth 트리거 연결 지점
              // startGoogleOAuth().then(({ url }) => url && (window.location.href = url));
            }}
          />
          <p className="text-xs text-gray-500 mt-2">
            구글 로그인 완료 후 ‘완료’를 눌러 진행하세요.
          </p>
        </StepLayout>
      )}
    />
  );
}
