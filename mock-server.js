const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 8080;

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:19006"],
    credentials: true,
  })
);

// JSON 파싱
app.use(express.json());

// 파일 업로드를 위한 multer 설정 (메모리에만 저장)
const upload = multer({ storage: multer.memoryStorage() });

// Mock 사용자 데이터
const mockUsers = [
  {
    id: 1,
    studentId: "202012345",
    name: "테스트 사용자",
    email: "test@example.com",
    hasHistory: true,
    hasWebmail: true,
    displayName: "테스트 사용자",
  },
];

// Mock 온보딩 데이터 저장소
const onboardingData = new Map();

// Mock 인증 미들웨어
const mockAuthMiddleware = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (cookies && cookies.includes("accessToken")) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthorized - Mock authentication required",
    });
  }
};

// Health check
app.get("/health", (req, res) => {
  res.json({ status: 200, message: "Mock server is running", data: null });
});

// Mock 인증 테스트
app.get("/v1/auth/test", mockAuthMiddleware, (req, res) => {
  res.json({
    status: 200,
    message: "Mock authentication successful",
    data: { userId: 1, name: "테스트 사용자" },
  });
});

// Mock 포털 로그인 (온보딩용)
app.post("/v1/auth/login", (req, res) => {
  const { studentId, password } = req.body;

  // 학번 형식 검증 (9자리 숫자)
  if (!/^\d{9}$/.test(studentId)) {
    return res.status(400).json({
      code: "INVALID_STUDENT_ID",
      message: "올바른 학번 형식이 아닙니다. (9자리 숫자)",
    });
  }

  // 비밀번호 길이 검증
  if (!password || password.length < 6) {
    return res.status(400).json({
      code: "INVALID_PASSWORD",
      message: "비밀번호는 6자 이상이어야 합니다.",
    });
  }

  // 기존 사용자 (hasHistory: true)
  if (studentId === "202012345" && password === "password") {
    // Mock 쿠키 설정
    res.cookie("accessToken", `mock-access-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    res.cookie("refreshToken", `mock-refresh-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    res.cookie("JSESSIONID", `mock-session-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    res.json({
      ok: true,
      hasHistory: true,
      hasWebmail: true,
      displayName: "테스트 사용자",
    });
  }
  // 신규 사용자 (hasHistory: false)
  else if (studentId === "202012346" && password === "password") {
    // Mock 쿠키 설정
    res.cookie("accessToken", `mock-access-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    res.cookie("refreshToken", `mock-refresh-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    res.cookie("JSESSIONID", `mock-session-${Date.now()}`, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    res.json({
      ok: true,
      hasHistory: false,
      hasWebmail: false,
      displayName: "신규 사용자",
    });
  }
  // 잘못된 자격증명
  else if (studentId === "202012345" && password !== "password") {
    res.status(401).json({
      code: "INVALID_CREDENTIALS",
      message: "포탈 로그인 실패: 아이디비번 틀림",
    });
  }
  // 미가입 사용자
  else {
    res.status(404).json({
      code: "USER_NOT_FOUND",
      message: "서비스에 가입되지 않은 유저입니다.",
    });
  }
});

// Mock 포털 회원가입 (온보딩용) - 포탈 계정이 없는 경우에만 사용
app.post("/v1/auth/register", (req, res) => {
  const { studentId, password } = req.body;

  // 학번 형식 검증 (9자리 숫자)
  if (!/^\d{9}$/.test(studentId)) {
    return res.status(400).json({
      code: "INVALID_STUDENT_ID",
      message: "올바른 학번 형식이 아닙니다. (9자리 숫자)",
    });
  }

  // 비밀번호 길이 검증
  if (!password || password.length < 6) {
    return res.status(400).json({
      code: "INVALID_PASSWORD",
      message: "비밀번호는 6자 이상이어야 합니다.",
    });
  }

  // 이미 가입된 사용자 체크
  if (studentId === "202012345" || studentId === "202012346") {
    return res.status(409).json({
      code: "USER_ALREADY_EXISTS",
      message: "이미 가입된 사용자입니다.",
    });
  }

  // Mock 쿠키 설정
  res.cookie("accessToken", `mock-access-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  res.cookie("refreshToken", `mock-refresh-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  });

  res.cookie("JSESSIONID", `mock-session-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  // Mock 회원가입 성공
  res.json({
    ok: true,
  });
});

// Mock 사용자 정보
app.get("/v1/users", mockAuthMiddleware, (req, res) => {
  res.json({
    status: 200,
    message: "Users retrieved successfully",
    data: mockUsers,
  });
});

// Mock 게시글 목록
app.get("/v1/articles", mockAuthMiddleware, (req, res) => {
  const mockArticles = [
    {
      id: 1,
      title: "Mock 게시글 1",
      content: "이것은 Mock 데이터입니다.",
      author: "테스트 사용자",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Mock 게시글 2",
      content: "또 다른 Mock 데이터입니다.",
      author: "테스트 사용자",
      createdAt: new Date().toISOString(),
    },
  ];

  res.json({
    status: 200,
    message: "Articles retrieved successfully",
    data: mockArticles,
  });
});

// Mock 카테고리 목록
app.get("/v1/categories", mockAuthMiddleware, (req, res) => {
  const mockCategories = [
    { id: 1, name: "자유게시판" },
    { id: 2, name: "질문과답변" },
    { id: 3, name: "프로젝트" },
  ];

  res.json({
    status: 200,
    message: "Categories retrieved successfully",
    data: mockCategories,
  });
});

// ===== 온보딩 관련 API =====

// 추가 정보 저장 (5단계/11단계)
app.post("/v1/onboarding/extra-info", (req, res) => {
  const { name, nickname, isGraduated, graduationYm, studentId } = req.body;

  // 온보딩 데이터 저장
  const userId = req.headers["x-user-id"] || "mock-user";
  onboardingData.set(userId, {
    name,
    nickname,
    isGraduated,
    graduationYm,
    studentId,
    timestamp: new Date().toISOString(),
  });

  // Mock 쿠키 설정 (온보딩 과정에서도 인증 상태 유지)
  res.cookie("accessToken", `mock-access-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  res.cookie("refreshToken", `mock-refresh-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  });

  res.cookie("JSESSIONID", `mock-session-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  res.json({
    ok: true,
  });
});

// 구글 OAuth 시작 (7단계)
app.post("/v1/auth/google/start", (req, res) => {
  // Mock OAuth URL 반환
  res.json({
    url: "https://accounts.google.com/oauth/authorize?client_id=mock&redirect_uri=mock&scope=email&response_type=code&state=mock",
  });
});

// 증명서 업로드 (9단계)
app.post("/v1/onboarding/certificates", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      code: "FILE_REQUIRED",
      message: "파일이 필요합니다.",
    });
  }

  // 파일 정보 로그 출력 (실제 저장은 하지 않음)
  const fileName = Buffer.from(file.originalname, "latin1").toString("utf8");
  console.log(
    `📁 Mock 파일 업로드: ${fileName} (${file.size} bytes, ${file.mimetype})`
  );

  // Mock 업로드 성공
  const requestId = `cert-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  res.json({
    requestId,
  });
});

// 서비스 계정 생성 (10~11단계)
app.post("/v1/onboarding/service-account", (req, res) => {
  const { desiredId, desiredPassword } = req.body;

  // 아이디 중복 체크 (Mock)
  if (desiredId === "admin" || desiredId === "test") {
    return res.status(409).json({
      code: "ID_ALREADY_EXISTS",
      message: "이미 사용 중인 아이디입니다.",
    });
  }

  // Mock 쿠키 설정 (최종 온보딩 완료 시 인증 상태 확정)
  res.cookie("accessToken", `mock-access-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  res.cookie("refreshToken", `mock-refresh-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  });

  res.cookie("JSESSIONID", `mock-session-${Date.now()}`, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  });

  // Mock 계정 생성 성공
  res.json({
    ok: true,
  });
});

// 404 핸들러
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Mock API endpoint not found",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
  console.log(`📱 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   GET  /v1/auth/test`);
  console.log(`   POST /v1/auth/login`);
  console.log(`   POST /v1/auth/register`);
  console.log(`   GET  /v1/users`);
  console.log(`   GET  /v1/articles`);
  console.log(`   GET  /v1/categories`);
  console.log(`\n🎯 온보딩 관련 API:`);
  console.log(`   POST /v1/onboarding/extra-info`);
  console.log(`   POST /v1/auth/google/start`);
  console.log(`   POST /v1/onboarding/certificates`);
  console.log(`   POST /v1/onboarding/service-account`);
  console.log(`\n🔑 Mock credentials:`);
  console.log(`   기존 사용자: studentId: "202012345", password: "password"`);
  console.log(`   신규 사용자: studentId: "202012346", password: "password"`);
  console.log(`   잘못된 비밀번호: studentId: "202012345", password: "wrong"`);
  console.log(`   미가입 사용자: studentId: "202012347", password: "password"`);
  console.log(`\n📋 검증 규칙:`);
  console.log(`   - 학번: 9자리 숫자만 허용`);
  console.log(`   - 비밀번호: 6자 이상 필수`);
  console.log(
    `   - 포탈 계정이 없는 경우: '학교 포탈 계정이 없나요?' 버튼 사용`
  );
  console.log(`   - 포탈 로그인 실패 시 자동 회원가입 시도하지 않음`);
});
