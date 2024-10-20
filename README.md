# inunity-front

### DX에 대해
개발 경험도 굉장히 중요한 영역입니다. 개발 과정이 효율적이어야 쓸데 없는 곳에 시간을 덜 허비하고, 루즈해지지 않고 추진력 있게 나아갈 수 있습니다 🏃‍♀️

### 모노레포
이 프로젝트는 모노레포를 이용해 React Native와 next에서 공통으로 쓰는 모듈을 효율적으로 관리합니다. 아래와 같은구조를 갖고 있습니다.
```
pacakges
ㄴ inunity-web
ㄴ inunity-native
ㄴ ...some-other-modules

```
### 실행
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