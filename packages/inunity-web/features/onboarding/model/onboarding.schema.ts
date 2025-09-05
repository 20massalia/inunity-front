import { z } from "zod";

/* 공통 Primitive */
export const monthString = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM 형식으로 입력해주세요.");

export const studentNumberSchema = z
  .string()
  .length(9, "포탈 아이디는 9자리 숫자(학번)입니다.")
  .regex(/^\d+$/, "숫자만 입력해주세요.");

export const passwordSchema = z
  .string()
  .min(6, "비밀번호는 6자 이상이어야 합니다.");

/* 업로드 파일 단독 스키마 */
export const certificateFileSchema = z
  .instanceof(File, { message: "파일을 선택하세요." })
  .refine((f) => f.size <= 5 * 1024 * 1024, "최대 5MB까지 업로드 가능합니다.")
  .refine(
    (f) =>
      ["application/pdf", "image/png", "image/jpeg", "image/jpg"].includes(
        f.type
      ),
    "PDF, PNG, JPEG, JPG 형식만 가능합니다."
  );

/* UI(Form) 레벨 스키마 */
export const portalIdFormSchema = z.object({
  studentNumber: studentNumberSchema,
});

export const passwordFormSchema = z.object({
  password: passwordSchema,
});

export const extraInfoSchema = z.object({
  name: z.string().min(2, "이름을 입력하세요.").max(30),
  nickname: z.string().max(20).optional().or(z.literal("")),
  graduationYm: monthString.optional().or(z.literal("")),
  // isGraduated는 graduationYm 존재 여부로 파생
});

export const certificateSchema = z.object({
  certificateFile: certificateFileSchema,
});

export const serviceAccountSchema = z.object({
  desiredId: z
    .string()
    .min(4, "아이디는 4자 이상이어야 합니다.")
    .regex(/^[a-z0-9._-]+$/i, "영문/숫자/._- 만 사용 가능합니다."),
  desiredPassword: passwordSchema,
});

export const certExtraInfoSchema = z.object({
  name: z.string().min(2).max(30),
  studentId: studentNumberSchema,
  nickname: z.string().max(20).optional().or(z.literal("")),
  graduationYm: monthString.optional().or(z.literal("")),
});

/* API 요청/응답 스키마(경계 검증) */
// 로그인
export const LoginReq = z.object({
  studentId: studentNumberSchema,
  password: passwordSchema,
});
export const LoginRes = z.object({
  ok: z.literal(true),
  hasHistory: z.boolean(),
  hasWebmail: z.boolean().optional(),
  displayName: z.string().optional(),
});

// 회원가입
export const RegisterReq = LoginReq;
export const RegisterRes = z.object({ ok: z.literal(true) });

// 추가정보 저장
export const ExtraInfoReq = z
  .object({
    name: z.string().min(1),
    nickname: z.string().min(1).optional(),
    isGraduated: z.boolean(),
    graduationYm: monthString.optional(),
    studentId: studentNumberSchema.optional(),
  })
  .refine((v) => (v.isGraduated ? !!v.graduationYm : true), {
    message: "졸업자는 졸업 연월이 필요합니다.",
    path: ["graduationYm"],
  });
export const ExtraInfoRes = z.object({ ok: z.literal(true) });

// 구글 OAuth 시작
export const StartOAuthRes = z.object({
  url: z.string().url().optional(),
});

// 증명서 업로드
export const UploadCertRes = z.object({
  requestId: z.string(),
});

// 서비스 계정 생성
export const ServiceAccountReq = z.object({
  desiredId: z
    .string()
    .min(4)
    .regex(/^[a-z0-9._-]+$/i),
  desiredPassword: passwordSchema,
});
export const ServiceAccountRes = z.object({ ok: z.literal(true) });

// 편의 타입
export type TLoginReq = z.infer<typeof LoginReq>;
export type TLoginRes = z.infer<typeof LoginRes>;
export type TRegisterReq = z.infer<typeof RegisterReq>;
export type TRegisterRes = z.infer<typeof RegisterRes>;
export type TExtraInfoReq = z.infer<typeof ExtraInfoReq>;
export type TExtraInfoRes = z.infer<typeof ExtraInfoRes>;
export type TStartOAuthRes = z.infer<typeof StartOAuthRes>;
export type TUploadCertRes = z.infer<typeof UploadCertRes>;
export type TServiceAccountReq = z.infer<typeof ServiceAccountReq>;
export type TServiceAccountRes = z.infer<typeof ServiceAccountRes>;
