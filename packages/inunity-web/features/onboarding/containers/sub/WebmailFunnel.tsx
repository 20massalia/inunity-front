"use client";

import { useFunnel } from "@use-funnel/browser";
import type { OnboardingCtx } from "@/features/onboarding/model/onboarding.types";
import ActionStep from "@/features/onboarding/ui/patterns/ActionStep";
import OAuthButton from "@/features/onboarding/ui/primitives/OAuthButton";
import FormStep from "@/features/onboarding/ui/patterns/FormStep";
import { extraInfoSchema } from "@/features/onboarding/model/onboarding.schema";

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
    initial: { step: initial, context: ctx },
  });

  return (
    <funnel.Render
      ExtraInfo={({ context, history }) => (
        <FormStep<{ name: string; nickname?: string; graduationYm?: string }>
          title="사용자 정보 입력"
          schema={extraInfoSchema}
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
          onSubmit={(v) => {
            history.push("WebmailLogin", {
              ...context,
              name: v.name,
              nickname: v.nickname,
              graduationYm: v.graduationYm,
            });
          }}
        />
      )}
      WebmailLogin={({ context }) => (
        <ActionStep
          title="학과 인증 — 구글 로그인"
          description="학교 웹메일로 로그인해 주세요."
          primaryText="완료"
          onPrimary={onDone}
          secondaryText="학교 웹메일 계정이 없나요?"
          onSecondary={onNeedCertificate}
        >
          <div className="flex justify-center items-center flex-1">
            <OAuthButton provider="google" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            구글 로그인 완료 후 ‘완료’를 눌러 진행하세요.
          </p>
        </ActionStep>
      )}
    />
  );
}
