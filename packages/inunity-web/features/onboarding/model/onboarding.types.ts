export interface OnboardingCtx {
  // 포털 로그인
  studentNumber?: string; // = studentId
  password?: string;

  // 가입 이력/웹메일
  hasHistory?: boolean;
  hasWebmail?: boolean;

  // 환영 문구용
  displayName?: string;

  // 추가 정보(5, 11단계)
  name?: string;
  nickname?: string;
  isGraduated?: boolean;
  graduationYm?: string; // YYYY-MM

  // 증명서(9단계)
  certificateFile?: File | null;

  // 서비스 계정(10~11단계)
  desiredId?: string;
  desiredPassword?: string;
}

// 루트/서브 스텝 이름은 참고용(훅/퍼널에서 사용)
export type RootStep =
  | "Welcome"
  | "PortalId"
  | "PortalPw"
  | "HistoryGate"
  | "ExtraInfo"
  | "Wait"
  | "WebmailOAuth"
  | "Greet"
  | "CertFlow"
  | "Summary";

export type CertStep =
  | "CertAttach"
  | "DesiredId"
  | "DesiredPw"
  | "CertExtraInfo";
export type WebmailStep = "CheckHistory" | "ExtraInfo" | "WebmailLogin";
