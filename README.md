# inunity-front

### DX에 대해
개발 경험도 굉장히 중요한 영역입니다. 개발 과정이 효율적이어야 쓸데 없는 곳에 시간을 덜 허비하고, 루즈해지지 않고 추진력 있게 나아갈 수 있습니다 🏃‍♀️

### 모노레포
이 프로젝트는 모노레포를 이용해 React Native와 next에서 공통으로 쓰는 모듈을 효율적으로 관리합니다. 아래와 같은구조를 갖고 있습니다.
> 🚨 모노레포 의존성 관리.. 정말 잘 하셔야 합니다. 특히 react 같이 공통으로 쓰는 모듈 버전을 잘못 건들였다가 대참사가 일어날 수 있어요.
```
pacakges
ㄴ inunity-web
ㄴ inunity-native
ㄴ message-type
ㄴ ui
ㄴ ... 뭐가 더 추가될수도?
```
## 실행
### 설정
```bash
yarn install # 의존성 설치
```
아래 스크립트를 이용해 실행할 수 있습니다.
- `yarn nextapp`: next 앱을 단독으로 실행합니다.
- `yarn nativeapp`: 네이티브 앱 만을 단독으로 실행합니다.
- `yarn start`: 두 앱을 동시에 실행합니다.
```json
  "scripts": {
    "nextapp": "yarn workspace inunity-web run dev",
    "nativeapp": "yarn workspace inunity-native run ios",
    "start": "yarn nextapp & yarn nativeapp"
  },
```
### 웹뷰 URL
이 앱은 React Native 와 WebView 상의 react가 유기적으로 동작합니다. 따라서 정상적인 테스트/이용을 위해 웹뷰 URL을 지정해주어야 합니다. 이는 `EXPO_PUBLIC_WEB_URL` 환경변수를 지정해줌으로서 가능합니다. 아래는 설정하는 두 방법을 소개합니다. 
1. .env 파일에 등록하기 (고정, 권장)
```env
# packages/inunity-native/.env.local

EXPO_PUBLIC_WEB_URL=http://192.168.1.146:3000 # next.js 서버를 구동하는 호스트
```
2. 일회성으로 테스트해보기
```bash
export EXPO_PUBLIC_WEB_URL=http://192.168.1.146:3000; yarn start
```
### API URL
현재 테스트에 사용하고 있는 쿠키 인증 서버가 있습니다.

https://github.com/INUnity-for-UNI/inunity-cookie-test

이 레포지토리를 클론해서 세팅한 다음, 웹뷰 URL과 같이 이번엔 **next.js** 패키지의 env를 지정해주세요.
```env
# packages/inunity-web/.env.local

NEXT_PUBLIC_API_URL=http://192.168.1.146:8888 # 쿠키 테스트 서버를 구동하는 호스트
```