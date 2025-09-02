import { z } from "zod";

// 포털 자격
export const studentNumberSchema = z.object({
  studentNumber: z.string().min(1, "학번(아이디)을 입력하세요"),
});
export const passwordSchema = z.object({
  password: z.string().min(6, "비밀번호는 6자 이상"),
});
export const loginSchema = studentNumberSchema.merge(passwordSchema);

// 추가 정보 (5, 11단계)
export const extraInfoSchema = z
  .object({
    name: z.string().min(1, "이름을 입력하세요"),
    nickname: z.string().min(1, "닉네임을 입력하세요").optional(),
    isGraduated: z.boolean(),
    graduationYm: z
      .string()
      .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM 형식")
      .optional(),
    studentId: z.string().optional(), // 증명서 경로(11단계)에서 필요
  })
  .refine((v) => (v.isGraduated ? !!v.graduationYm : true), {
    message: "졸업자라면 졸업 연월을 입력하세요",
    path: ["graduationYm"],
  });

// 증명서(9단계)
export const certificateSchema = z.object({
  certificateFile: z
    .instanceof(File)
    .refine((f) => f.size <= 5 * 1024 * 1024, "최대 5MB까지 업로드 가능")
    .refine(
      (f) => /^(image\/(png|jpeg)|application\/pdf)$/.test(f.type),
      "PNG/JPEG/PDF만 허용"
    ),
});

// 서비스 계정(10~11단계)
export const serviceAccountSchema = z.object({
  desiredId: z.string().min(4, "아이디는 4자 이상"),
  desiredPassword: z.string().min(6, "비밀번호는 6자 이상"),
});

// 타입 추론
export type LoginForm = z.infer<typeof loginSchema>;
export type ExtraInfoForm = z.infer<typeof extraInfoSchema>;
export type ServiceAccountForm = z.infer<typeof serviceAccountSchema>;
export type CertificateForm = z.infer<typeof certificateSchema>;
