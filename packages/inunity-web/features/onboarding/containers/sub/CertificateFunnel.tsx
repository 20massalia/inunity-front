"use client";

import { useFunnel } from "@use-funnel/browser";

import StepLayout from "@/features/onboarding/ui/StepLayout";
import FilePicker from "@/features/onboarding/ui/primitives/FilePicker";
import ActionBar from "@/features/onboarding/ui/primitives/ActionBar";
import FormStep from "@/features/onboarding/ui/patterns/FormStep";
import useCertificateUpload from "@/features/onboarding/hooks/useCertificateUpload";
import {
  certificateSchema,
  serviceAccountSchema,
  extraInfoSchema,
} from "@/features/onboarding/model/onboarding.schema";
import type { OnboardingCtx } from "@/features/onboarding/model/onboarding.types";
import {
  createServiceAccount,
  submitExtraInfo,
} from "@/features/onboarding/api/onboarding.api";

type CertStep = "CertAttach" | "DesiredId" | "DesiredPw" | "CertExtraInfo";
type StepMap = Record<CertStep, OnboardingCtx>;

export default function CertificateFunnel({
  variant,
  initial = "CertAttach",
  ctx,
  onPatch,
  onDone,
}: {
  variant: "no-portal" | "portal-no-webmail";
  initial?: CertStep;
  ctx: OnboardingCtx;
  onPatch: (p: Partial<OnboardingCtx>) => void;
  onDone: () => void;
}) {
  const funnel = useFunnel<StepMap>({
    id: `cert-${variant}`,
    initial: { step: initial as CertStep, context: ctx },
  });

  const upload = useCertificateUpload();

  return (
    <funnel.Render
      CertAttach={({ context, history }) => (
        <StepLayout
          title="증명서 첨부"
          description="3개월 이내 발급한 졸업/재학증명서를 제출해 주세요. 영업일 기준 최대 72시간 이내 처리됩니다."
          shown
          footer={
            <ActionBar
              primaryText={upload.isPending ? "업로드 중…" : "계속하기"}
              onPrimary={async () => {
                const ok = certificateSchema.safeParse({
                  certificateFile: context.certificateFile,
                });
                if (!ok.success) {
                  alert(ok.error.issues[0]?.message);
                  return;
                }
                await upload.mutateAsync(context.certificateFile!);
                history.push("DesiredId", context);
              }}
              disabled={!context.certificateFile || upload.isPending}
            />
          }
        >
          <FilePicker
            value={context.certificateFile ?? null}
            onChange={(f) => {
              onPatch({ certificateFile: f });
              history.replace("CertAttach", { ...context, certificateFile: f });
            }}
          />
        </StepLayout>
      )}
      DesiredId={({ context, history }) => (
        <FormStep<{ desiredId: string }>
          title="사용할 아이디 입력"
          fields={[
            {
              type: "text",
              name: "desiredId",
              label: "아이디",
              placeholder: "4자 이상",
            },
          ]}
          defaultValues={{ desiredId: context.desiredId ?? "" }}
          onSubmit={(v) => {
            const ok = serviceAccountSchema
              .pick({ desiredId: true })
              .safeParse(v);
            if (!ok.success) {
              alert(ok.error.issues[0]?.message);
              return;
            }
            onPatch({ desiredId: v.desiredId });
            history.push("DesiredPw", { ...context, desiredId: v.desiredId });
          }}
        />
      )}
      DesiredPw={({ context, history }) => (
        <FormStep<{ desiredPassword: string }>
          title="비밀번호 설정"
          fields={[
            {
              type: "password",
              name: "desiredPassword",
              label: "비밀번호",
              placeholder: "6자 이상",
            },
          ]}
          defaultValues={{ desiredPassword: context.desiredPassword ?? "" }}
          onSubmit={async (v) => {
            const ok = serviceAccountSchema
              .pick({ desiredPassword: true })
              .safeParse(v);
            if (!ok.success) {
              alert(ok.error.issues[0]?.message);
              return;
            }
            onPatch({ desiredPassword: v.desiredPassword });
            await createServiceAccount({
              desiredId: context.desiredId!,
              desiredPassword: v.desiredPassword,
            });
            history.push("CertExtraInfo", {
              ...context,
              desiredPassword: v.desiredPassword,
            });
          }}
        />
      )}
      CertExtraInfo={({ context }) => (
        <FormStep<{
          name: string;
          studentId: string;
          nickname?: string;
          graduationYm?: string;
        }>
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
              name: "studentId",
              label: "학번",
              placeholder: "학번",
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
            studentId: context.studentNumber ?? "",
            nickname: context.nickname ?? "",
            graduationYm: context.graduationYm ?? "",
          }}
          onSubmit={async (v) => {
            const patch: Partial<OnboardingCtx> = {
              name: v.name,
              nickname: v.nickname || undefined,
              isGraduated: !!v.graduationYm,
              graduationYm: v.graduationYm || undefined,
              studentNumber: v.studentId,
            };
            const ok = extraInfoSchema.safeParse(patch as any);
            if (!ok.success) {
              alert(ok.error.issues[0]?.message);
              return;
            }
            onPatch(patch);
            await submitExtraInfo({
              name: patch.name!,
              nickname: patch.nickname,
              isGraduated: !!patch.isGraduated,
              graduationYm: patch.graduationYm,
              studentId: v.studentId,
            });
            onDone();
          }}
        />
      )}
    />
  );
}
