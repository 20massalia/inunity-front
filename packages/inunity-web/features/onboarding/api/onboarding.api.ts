import { z } from "zod";
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
  ExtraInfoReq,
  ExtraInfoRes,
  StartOAuthRes,
  UploadCertRes,
  ServiceAccountReq,
  ServiceAccountRes,
  certificateFileSchema,
  TLoginReq,
  TLoginRes,
  TRegisterReq,
  TRegisterRes,
  TExtraInfoReq,
  TExtraInfoRes,
  TStartOAuthRes,
  TUploadCertRes,
  TServiceAccountReq,
  TServiceAccountRes,
} from "@/features/onboarding/model/onboarding.schema";

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

/* 서버 에러 매핑 */
function mapServerError(data: any, status: number): ApiError {
  const code =
    data?.code ??
    (data?.message === "서비스에 가입되지 않은 유저입니다."
      ? "USER_NOT_FOUND"
      : data?.message === "포탈 로그인 실패: 아이디비번 틀림"
      ? "INVALID_CREDENTIALS"
      : "UNKNOWN");
  const msg = data?.message ?? "요청에 실패했습니다";
  return new ApiError(code, msg, status);
}

async function parseJSON(res: Response) {
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

/* 공통 API 호출 래퍼: 입출력 모두 zod로 검증 */
async function apiCall<I, O>({
  path,
  method,
  body,
  input,
  output,
  headers,
  useFormData = false,
}: {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: I;
  input?: z.ZodSchema<I>;
  output: z.ZodSchema<O>;
  headers?: Record<string, string>;
  useFormData?: boolean;
}): Promise<O> {
  // 입력 검증
  if (input) {
    const parsed = input.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(
        "INVALID_INPUT",
        parsed.error.issues[0]?.message ?? "잘못된 입력",
        400
      );
    }
    body = parsed.data;
  }

  const res = await fetch(`${API}${path}`, {
    method,
    credentials: "include",
    headers: useFormData
      ? undefined
      : { "Content-Type": "application/json", ...(headers ?? {}) },
    body:
      body == null
        ? undefined
        : useFormData
        ? (body as any as FormData)
        : JSON.stringify(body),
  });

  const data = await parseJSON(res);
  if (!res.ok) throw mapServerError(data, res.status);

  // 출력 검증
  const out = output.safeParse(data);
  if (!out.success) {
    throw new ApiError(
      "INVALID_RESPONSE",
      "서버 응답 형식이 올바르지 않습니다",
      res.status
    );
  }
  return out.data;
}

/* 2~3단계: 포탈 로그인 */
export function loginPortal(params: TLoginReq): Promise<TLoginRes> {
  return apiCall({
    path: "/v1/auth/login",
    method: "POST",
    body: params,
    input: LoginReq,
    output: LoginRes,
  });
}

/* 로그인 실패(미가입) 시: 회원가입 */
export function registerPortal(params: TRegisterReq): Promise<TRegisterRes> {
  return apiCall({
    path: "/v1/auth/register",
    method: "POST",
    body: params,
    input: RegisterReq,
    output: RegisterRes,
  });
}

/* 5/11단계: 추가 정보 저장 */
export function submitExtraInfo(params: TExtraInfoReq): Promise<TExtraInfoRes> {
  return apiCall({
    path: "/v1/onboarding/extra-info",
    method: "POST",
    body: params,
    input: ExtraInfoReq,
    output: ExtraInfoRes,
  });
}

/* 7단계: 구글(웹메일) OAuth 시작 */
export function startGoogleOAuth(): Promise<TStartOAuthRes> {
  return apiCall({
    path: "/v1/auth/google/start",
    method: "POST",
    output: StartOAuthRes,
  });
}

/* 9단계: 증명서 업로드 (FormData) */
export async function uploadCertificate(file: File): Promise<TUploadCertRes> {
  const ok = certificateFileSchema.safeParse(file);
  if (!ok.success) {
    throw new ApiError(
      "INVALID_INPUT",
      ok.error.issues[0]?.message ?? "파일 오류",
      400
    );
  }
  const fd = new FormData();
  fd.append("file", file);

  return apiCall({
    path: "/v1/onboarding/certificates",
    method: "POST",
    body: fd as any,
    output: UploadCertRes,
    useFormData: true,
  });
}

/* 10~11단계: 서비스 계정 생성(아이디/비번) */
export function createServiceAccount(
  params: TServiceAccountReq
): Promise<TServiceAccountRes> {
  return apiCall({
    path: "/v1/onboarding/service-account",
    method: "POST",
    body: params,
    input: ServiceAccountReq,
    output: ServiceAccountRes,
  });
}
