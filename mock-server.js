const express = require("express");
const cors = require("cors");
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

// Mock 사용자 데이터
const mockUsers = [
  {
    id: 1,
    studentId: "202012345",
    name: "테스트 사용자",
    email: "test@example.com",
  },
];

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

// Mock 로그인
app.post("/v1/auth/login", (req, res) => {
  const { studentId, password } = req.body;

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
      status: 200,
      message: "Mock login successful",
      data: { userId: 1, name: "테스트 사용자" },
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Invalid credentials",
    });
  }
});

// Mock 회원가입
app.post("/v1/auth/register", (req, res) => {
  const { studentId, password } = req.body;

  // Mock 회원가입 성공 (실제로는 중복 체크 등을 해야 함)
  res.json({
    status: 200,
    message: "Mock registration successful",
    data: { userId: 2, studentId, name: "새로운 사용자" },
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
  console.log(`   GET  /v1/users`);
  console.log(`   GET  /v1/articles`);
  console.log(`   GET  /v1/categories`);
  console.log(
    `\n🔑 Mock credentials: studentId: "202012345", password: "password"`
  );
});
