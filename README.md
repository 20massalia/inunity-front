<img width="1920" height="960" alt="inunity" src="https://github.com/user-attachments/assets/a13803a1-aebe-44c3-8664-86adcb4d2ab6" />

# 정보기술대 커스텀 SNS 경진대회 
**INUnity::정보대학교 구성원을 위한 정보 공유 커뮤니티**

React Native 앱 위에 Next.js 웹뷰를 올리고, RN–Web 간 메시지 브릿지로 상호작용합니다.

인증된 구성원은 익명으로 다양한 주제에서 활발히 의견을 나눌 수 있고, 정보대 특화 기능과 문화를 반영합니다.

<br/>

# 프로젝트 배경 및 목적
## 배경

1. 단과대 내 학과 간 소통 부족
2. 휴학생의 고립감 및 소통 문제
3. 재학생과 졸업생 간 연결성 약화
4. 학교 및 단과대 특화 정보와 기능의 부재
5. 정보 전달 경로의 파편화

## 목적
재학생과 졸업생에 걸쳐 정보대에 특화된 전공/취창업 및 학교생활에 필요한 양질의 정보를 공유할 수 있게 하고, 단과대/학과/학생회 등에서 전달하는 창구를 일원화합니다.

또한 학교나 단과대에 특화된 특화 기능을 제공해 학교생활의 질을 향상시킵니다.

<br/>

# 시스템 전반 (Architecture & Runtime)

* 구성: React Native 앱 ⇄ Next.js(Web) WebView 임베딩

* 브릿지: RN–Web 간 MessageManager로 이벤트 교환 (로그인/로그아웃/네비게이션/로그/인증 등)

* 플랫폼 식별: usePlatformResolver로 OS/웹뷰 여부를 판별해 분기 처리

* 데이터 동기화(시스템 레벨)
  * TanStack Query: 웹뷰 이동에도 서버 상태가 일관되게 복원되도록 캐시 키/초기 데이터 전략 설계
  * Next 최적화: 웹 렌더를 Next 기반으로 정리해 로드 안정성과 전반적인 UX 개선

<br>

---

<br>

# 온보딩 리팩토링 개요

* **범위**: 온보딩 전 과정을 설계/구현 - 기존 UI 유지, 내부 구조 전면 정리

## 핵심 변경점

* **상태 흐름 표준화**: `@use-funnel/browser` 루트 퍼널 + 서브 퍼널 2종(웹메일/증명서)
* **레이어링 확립**: `containers / patterns / primitives` 3계층으로 역할 분리
* **폼/검증 체계화**: `react-hook-form + zod`

  * 필드(primitive) → 폼(form-level) → API 경계(요청/응답) 3단계 검증
* **API 경계 강화**: 요청/응답 zod 스키마 + `ApiError` 코드 매핑
* **컴포넌트 정리**: 중복 Step 제거 → `FormStep / UploadStep / InfoStep`로 통일
* **UX 일관화**: 하단 고정 `ActionBar`(메인 버튼 + 아래 텍스트 CTA), `TextOnly` 자동 전환 유지

## 온보딩 사용자 흐름

`Welcome → PortalId → PortalPw → (ReturningIntro | FirstIntro) → ExtraInfo → PreWebmail → WebmailFlow → Greet`
분기:

* **포탈 계정 없음** → `CertFlow_NoPortal`
* **포탈은 있으나 웹메일 없음** → `CertFlow_PortalNoWebmail`
  서브 퍼널:
* **WebmailFunnel**: 구글 OAuth, 필요 시 증명서 분기
* **CertificateFunnel**: `증명서 첨부 → 아이디/비번 설정 → 추가 정보`

## 디렉터리 구조(요약)

```
features/onboarding/
│
├─ containers/OnboardingFunnel.tsx
├─ containers/sub/{WebmailFunnel,CertificateFunnel}.tsx
│
├─ ui/steps/{StepLayout, FadeInOutStep, TextOnly}.tsx
├─ ui/patterns/{FormStep, InfoStep, ActionStep, UploadStep}.tsx
├─ ui/primitives/{ActionBar, FilePicker, OAuthButton}.tsx
│
├─ model/{onboarding.schema.ts,onboarding.types.ts}
│
└─ api/onboarding.api.ts
```

## 기술 스택

* **Web**: Next.js 14(App Router), TypeScript, TailwindCSS
* **Form/Validation**: react-hook-form, zod
* **Flow**: @use-funnel/browser

## 개선 효과

* 새 단계/분기 추가 시 **컨테이너·스키마만 확장** 하여 개발 속도↑, 리스크↓
* 폼/서버 양단 검증으로 **런타임 안정성** 확보
* 컴포넌트 재사용 극대화로 **코드 중복↓, 유지보수성↑**
