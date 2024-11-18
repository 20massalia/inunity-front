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
- `yarn nextapp run dev`: next 앱을 단독으로 실행합니다.

- Metro 번들러만 실행하기
- `yarn nativeapp start`: 네이티브 단을 빌드하지 않고 Metro 번들러만을 실행합니다.

- `yarn nativeapp run ios`: development build를 생성하고, Metro 번들러를 실행합니다.
- `yarn start`: 두 앱을 동시에 실행합니다. (next는 개밥서버, 네이티브는 iOS development build)
- `yarn startsim`: `yarn start`를 웹뷰 URL을 `localhost`로 고정하고 실행합니다. iOS 시뮬레이터 환경에서 구동을 위한 기능입니다.
```json
    "nextapp": "yarn workspace inunity-web",
    "nativeapp": "yarn workspace inunity-native ",
    "start": "EXPO_PUBLIC_WEB_URL=http://$(ipconfig getifaddr en0):3000; yarn nextapp run dev & yarn nativeapp run ios",
    "startsim": "EXPO_PUBLIC_WEB_URL=http://localhost:3000; yarn nextapp run dev & yarn nativeapp run ios"

    // inunity-native/pacakge.json
    "android": "expo run:android --device",
    "ios": "expo run:ios --device",
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
3. 네이티브 빌드 없이 Expo 서버만 실행하기

   무슨 이유인지는 모르겠지만, Expo 서버만 실행했을 때 env가 주입이 안되는 것 같아요. 그래서 아래와 같이 따로 지정해주어야 합니다.
   `EXPO_PUBLIC_WEB_URL=http://localhost:3000 yarn nativeapp start;`
### API URL
현재 테스트에 사용하고 있는 쿠키 인증 서버가 있습니다.

https://github.com/INUnity-for-UNI/inunity-cookie-test

이 레포지토리를 클론해서 세팅한 다음, 웹뷰 URL과 같이 이번엔 **next.js** 패키지의 env를 지정해주세요.
```env
# packages/inunity-web/.env.local

NEXT_PUBLIC_API_URL=http://192.168.1.146:8888 # 쿠키 테스트 서버를 구동하는 호스트
```
