// features/onboarding/api/onboarding.api.ts
const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function handleJSON<T>(res: Response): Promise<T> {
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    // code 우선, 없으면 message 매핑
    const code =
      data.code ||
      (data.message === "서비스에 가입되지 않은 유저입니다."
        ? "USER_NOT_FOUND"
        : data.message === "포탈 로그인 실패: 아이디비번 틀림"
        ? "INVALID_CREDENTIALS"
        : "UNKNOWN");
    const msg = data.message || "요청에 실패했습니다";
    throw new ApiError(code, msg, res.status);
  }
  return data as T;
}

/** 2~3단계: 포털 로그인 */
export async function loginPortal(params: {
  studentId: string;
  password: string;
}): Promise<{
  ok: true;
  hasHistory: boolean; // 4단계 분기용
  hasWebmail?: boolean; // 7단계 분기 보조
  displayName?: string; // 8단계 환영 문구용
}> {
  const res = await fetch(`${API}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params),
  });
  return handleJSON(res);
}

/** 로그인 실패(미가입) 시: 4.2 → 회원가입 */
export async function registerPortal(params: {
  studentId: string;
  password: string;
}): Promise<{ ok: true }> {
  const res = await fetch(`${API}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params),
  });
  return handleJSON(res);
}

/** 5단계/11단계: 추가 정보 저장 */
export async function submitExtraInfo(params: {
  name: string;
  nickname?: string;
  isGraduated: boolean;
  graduationYm?: string; // YYYY-MM
  studentId?: string; // 11단계(증명서 경로)에서 필요
}): Promise<{ ok: true }> {
  const res = await fetch(`${API}/v1/onboarding/extra-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params),
  });
  return handleJSON(res);
}

/** 7단계: 구글(웹메일) OAuth 시작 – 실제 구현에 맞춰 라우팅/딥링크 처리 */
export async function startGoogleOAuth(): Promise<{ url?: string }> {
  const res = await fetch(`${API}/v1/auth/google/start`, {
    method: "POST",
    credentials: "include",
  });
  // url 반환 시 window.location.href = url 로 리다이렉트하면 됨
  return handleJSON(res);
}

/** 9단계: 증명서 업로드 */
export async function uploadCertificate(
  file: File
): Promise<{ requestId: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/v1/onboarding/certificates`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });
  return handleJSON(res);
}

/** 10~11단계: 서비스용 계정 생성(아이디/비번) */
export async function createServiceAccount(params: {
  desiredId: string;
  desiredPassword: string;
}): Promise<{ ok: true }> {
  const res = await fetch(`${API}/v1/onboarding/service-account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params),
  });
  return handleJSON(res);
}
