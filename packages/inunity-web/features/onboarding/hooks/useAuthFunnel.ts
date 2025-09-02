"use client";

import { useEffect } from "react";
import { useFunnel } from "@use-funnel/browser";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type AuthStep =
  | "Welcome"
  | "SignIn"
  | "Password"
  | "ExistingUser"
  | "NewUser"
  | "CertificateSetup"
  | "Completion";

export type AuthCtx = {
  studentNumber?: string;
  password?: string;
};

type StepMap = {
  Welcome: Record<string, never>;
  SignIn: { studentNumber?: string };
  Password: { studentNumber: string; password?: string };
  ExistingUser: Record<string, never>;
  NewUser: Record<string, never>;
  CertificateSetup: Record<string, never>;
  Completion: Record<string, never>;
};

export default function useAuthFunnel() {
  // 1) 퍼널 초기화
  const funnel = useFunnel<StepMap>({
    id: "auth",
    initial: { step: "Welcome", context: {} },
  });

  // 2) 로컬 영속화(훅 내부에서만)
  const [persistStep, setPersistStep] = useLocalStorage<AuthStep>(
    "onboarding_step",
    "Welcome"
  );
  const [persistCtx, setPersistCtx] = useLocalStorage<AuthCtx>(
    "onboarding_context",
    {}
  );

  useEffect(() => {
    setPersistStep(funnel.step as AuthStep);
  }, [funnel.step, setPersistStep]);

  useEffect(() => {
    setPersistCtx(funnel.context as AuthCtx);
  }, [funnel.context, setPersistCtx]);

  // 3) 전이/컨텍스트 유틸 (컨테이너는 이것만 사용)
  const patchCtx = (p: Partial<AuthCtx>) => {
    funnel.history.replace(funnel.step as any, {
      ...(funnel.context as AuthCtx),
      ...p,
    });
  };

  const push = <K extends keyof StepMap>(
    name: K,
    extra?: Partial<StepMap[K]>
  ) => {
    funnel.history.push(name, { ...(funnel.context as any), ...(extra ?? {}) });
  };

  const replace = <K extends keyof StepMap>(
    name: K,
    extra?: Partial<StepMap[K]>
  ) => {
    funnel.history.replace(name, {
      ...(funnel.context as any),
      ...(extra ?? {}),
    });
  };

  return {
    funnel,
    step: funnel.step as AuthStep,
    ctx: funnel.context as AuthCtx,
    patchCtx,
    push,
    replace,
  };
}
