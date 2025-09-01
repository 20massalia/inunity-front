# 로컬 개발 환경 설정 가이드

## 개요
이 문서는 InUnity 프로젝트를 로컬 환경에서 백엔드 없이 개발할 수 있도록 설정하는 방법을 설명합니다.

## 변경사항
기존 Cloudflare 서브도메인 기반 쿠키 인증에서 로컬 Mock 인증으로 변경되었습니다.

## 사전 요구사항
- Node.js 18+ 
- Yarn 4.2.2+
- iOS Simulator 또는 Android Emulator

## 설치 및 설정

### 1. 의존성 설치
```bash
cd inunity-front
yarn install
```

### 2. Mock 서버 실행
```bash
# Mock API 서버 실행 (포트 8080)
yarn mock-server
```

### 3. 로컬 개발 환경 실행
```bash
# Mock 서버 + Next.js + React Native 동시 실행
yarn dev:local

# 또는 개별 실행
yarn mock-server & yarn startsim
```

## Mock 인증 정보
- **학번**: `202012345`
- **비밀번호**: `password`

## Mock API 엔드포인트
- `GET /health` - 서버 상태 확인
- `GET /v1/auth/test` - 인증 테스트
- `POST /v1/auth/login` - 로그인
- `GET /v1/users` - 사용자 정보
- `GET /v1/articles` - 게시글 목록
- `GET /v1/categories` - 카테고리 목록

## 환경변수 설정

### 네이티브 앱 (inunity-native)
```bash
# packages/inunity-native/.env.local
EXPO_PUBLIC_WEB_URL=http://localhost:3000
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/v1
EXPO_PUBLIC_MOCK_AUTH=true
```

### 웹 앱 (inunity-web)
```bash
# packages/inunity-web/.env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/v1
NEXT_PUBLIC_MOCK_AUTH=true
```

## 개발 워크플로우

### 1. Mock 서버 시작
```bash
yarn mock-server
```

### 2. Next.js 앱 시작
```bash
yarn nextapp run dev
```

### 3. React Native 앱 시작
```bash
yarn nativeapp run ios-sim
# 또는
yarn nativeapp run android
```

## 문제 해결

### Mock 서버가 시작되지 않는 경우
- 포트 8080이 사용 중인지 확인
- `yarn install`로 의존성 재설치

### 인증이 작동하지 않는 경우
- Mock 서버가 실행 중인지 확인
- 환경변수 `EXPO_PUBLIC_MOCK_AUTH=true` 설정 확인
- 브라우저/시뮬레이터에서 쿠키 허용 확인

### CORS 오류가 발생하는 경우
- Mock 서버의 CORS 설정 확인
- 올바른 origin 설정 확인

## 프로덕션 배포 시 주의사항
- Mock 인증은 개발 환경에서만 사용
- 프로덕션에서는 실제 백엔드 API 사용
- 환경변수 `EXPO_PUBLIC_MOCK_AUTH=false` 설정

## 추가 개발 팁
- Mock 서버의 응답을 수정하여 다양한 시나리오 테스트
- 네트워크 탭에서 API 호출 확인
- React Native Debugger 사용하여 네이티브 앱 디버깅

