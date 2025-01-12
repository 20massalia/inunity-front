import { ThemedText } from "@/components/ThemedText";
import { Href, Link } from "expo-router";
import { FlatList, Image, SafeAreaView, View } from "react-native";

export default function Page() {
  const license = appLicense.concat(
    Object.entries(webLicense).map(([name, license]) => {
      return {
        libraryName: name,
        version: name.split("@").reverse()[0],
        _license: license.licenses,
        _description: "",
        homepage: "",
        author: { name: "", email: "" },
        repository: {
          type: "git",
          url: license.repository,
        },
        _licenseContent: "",
      };
    })
  );
  return (
    <SafeAreaView>
      <FlatList
        data={license}
        renderItem={(info) => (
          <View>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Link href={(info.item.homepage ?? info.item.repository.url) as Href<string>} >
            <ThemedText>{info.item.libraryName}</ThemedText>
            </Link>
            <ThemedText>{info.item.version}</ThemedText>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "gray" }}
            ></View>
          </View>
        )}
      ></FlatList>
      <Link href="https://toss.im/tossface/copyright">
        <ThemedText>tossface</ThemedText>
      </Link>
    </SafeAreaView>
  );
}

const webLicense = {
  "@next/env@14.2.15": {
    licenses: "MIT",
    repository: "https://github.com/vercel/next.js",
    publisher: "Next.js Team",
    email: "support@vercel.com",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@next/env",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@next/env/README.md",
  },
  "@next/swc-darwin-arm64@14.2.15": {
    licenses: "MIT",
    repository: "https://github.com/vercel/next.js",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@next/swc-darwin-arm64",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@next/swc-darwin-arm64/README.md",
  },
  "@swc/helpers@0.5.5": {
    licenses: "Apache-2.0",
    repository: "https://github.com/swc-project/swc",
    publisher: "강동윤",
    email: "kdy1997.dev@gmail.com",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@swc/helpers",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@swc/helpers/LICENSE",
  },
  "@tanstack/react-query-devtools@5.60.2": {
    licenses: "MIT",
    repository: "https://github.com/TanStack/query",
    publisher: "tannerlinsley",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@tanstack/react-query-devtools",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@tanstack/react-query-devtools/LICENSE",
  },
  "@tanstack/react-query@5.60.2": {
    licenses: "MIT",
    repository: "https://github.com/TanStack/query",
    publisher: "tannerlinsley",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@tanstack/react-query",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@tanstack/react-query/LICENSE",
  },
  "@types/react@18.3.12": {
    licenses: "MIT",
    repository: "https://github.com/DefinitelyTyped/DefinitelyTyped",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/ui/node_modules/@types/react",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/ui/node_modules/@types/react/LICENSE",
  },
  "@use-funnel/browser@0.0.8": {
    licenses: "MIT",
    repository: "https://github.com/toss/use-funnel",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@use-funnel/browser",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@use-funnel/browser/LICENSE",
  },
  "@use-funnel/core@0.0.7": {
    licenses: "MIT",
    repository: "https://github.com/toss/use-funnel",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@use-funnel/core",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/@use-funnel/core/LICENSE",
  },
  "caniuse-lite@1.0.30001680": {
    licenses: "CC-BY-4.0",
    repository: "https://github.com/browserslist/caniuse-lite",
    publisher: "Ben Briggs",
    email: "beneb.info@gmail.com",
    url: "http://beneb.info",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/caniuse-lite",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/caniuse-lite/LICENSE",
  },

  "next-pwa@5.6.0": {
    licenses: "MIT",
    repository: "https://github.com/shadowwalker/next-pwa",
    publisher: "ShadowWalker",
    email: "w@weiw.io",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next-pwa",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next-pwa/LICENSE",
  },
  "next@14.2.15": {
    licenses: "MIT",
    repository: "https://github.com/vercel/next.js",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next/license.md",
  },
  "postcss@8.4.31": {
    licenses: "MIT",
    repository: "https://github.com/postcss/postcss",
    publisher: "Andrey Sitnik",
    email: "andrey@sitnik.ru",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next/node_modules/postcss",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/next/node_modules/postcss/LICENSE",
  },
  "react-icons@5.4.0": {
    licenses: "MIT",
    repository: "https://github.com/react-icons/react-icons",
    publisher: "Goran Gajic",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-icons",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-icons/LICENSE",
  },
  "react-slick@0.30.3": {
    licenses: "MIT",
    repository: "https://github.com/akiran/react-slick",
    publisher: "Kiran Abburi",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-slick",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-slick/LICENSE",
  },
  "react-spinners@0.15.0": {
    licenses: "MIT",
    repository: "https://github.com/davidhu2000/react-spinners",
    publisher: "David Hu",
    url: "https://www.davidhu.io",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-spinners",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/react-spinners/LICENSE",
  },
  "styled-jsx@5.1.1": {
    licenses: "MIT",
    repository: "https://github.com/vercel/styled-jsx",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/styled-jsx",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/styled-jsx/license.md",
  },
  "typescript@4.9.5": {
    licenses: "Apache-2.0",
    repository: "https://github.com/Microsoft/TypeScript",
    publisher: "Microsoft Corp.",
    path: "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/ui/node_modules/typescript",
    licenseFile:
      "/Users/kimwash/Projects/INUnity/inunity-front/packages/inunity-web/node_modules/ui/node_modules/typescript/LICENSE.txt",
  },
};

const appLicense = [
  {
    libraryName: "@react-native-cookies/cookies",
    version: "6.2.1",
    _license: "MIT",
    _description: "Cookie Manager for React Native",
    homepage: "https://github.com/react-native-cookies/cookies#readme",
    author: { name: "Jason Safaiyeh", email: "safaiyeh@protonmail.com" },
    repository: {
      type: "git",
      url: "git+https://github.com/react-native-cookies/cookies.git",
      baseUrl: "https://github.com/react-native-cookies/cookies",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2020 React Native Community\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "@react-native-firebase/app",
    version: "21.6.0",
    _license: "Apache-2.0",
    _description:
      "A well tested, feature rich Firebase implementation for React Native, supporting iOS & Android. Individual module support for Admob, Analytics, Auth, Crash Reporting, Cloud Firestore, Database, Dynamic Links, Functions, Messaging (FCM), Remote Config, Storage and more.",
    author: {
      name: "Invertase",
      email: "oss@invertase.io",
      url: "http://invertase.io",
    },
    repository: {
      type: "git",
      url: "https://github.com/invertase/react-native-firebase/tree/main/packages/app",
    },
    _licenseContent:
      'Apache-2.0 License\n------------------\n\nCopyright (c) 2016-present Invertase Limited <oss@invertase.io>\n\nLicensed under the Apache License, Version 2.0 (the "License");\nyou may not use this library except in compliance with the License.\n\nYou may obtain a copy of the Apache-2.0 License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an "AS IS" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.\n\n\nCreative Commons Attribution 3.0 License\n----------------------------------------\n\nCopyright (c) 2016-present Invertase Limited <oss@invertase.io>\n\nDocumentation and other instructional materials provided for this project\n(including on a separate documentation repository or it\'s documentation website) are\nlicensed under the Creative Commons Attribution 3.0 License. Code samples/blocks\ncontained therein are licensed under the Apache License, Version 2.0 (the "License"), as above.\n\nYou may obtain a copy of the Creative Commons Attribution 3.0 License at\n\n    https://creativecommons.org/licenses/by/3.0/\n',
  },
  {
    libraryName: "@react-native-menu/menu",
    version: "1.1.6",
    _license: "MIT",
    _description: "UIMenu component for react-native",
    homepage: "https://github.com/react-native-menu/menu#readme",
    author: {
      name: "Jesse Katsumata",
      email: "jesse.katsumata@gmail.com",
      url: "https://github.com/Naturalclar",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/react-native-menu/menu.git",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2020 Jesse Katsumata\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "@react-navigation/native",
    version: "6.1.18",
    _license: "MIT",
    _description: "React Native integration for React Navigation",
    homepage: "https://reactnavigation.org",
    repository: {
      type: "git",
      url: "git+https://github.com/react-navigation/react-navigation.git",
      directory: "packages/native",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "expo-router",
    version: "3.5.24",
    _license: "MIT",
    _description:
      "Expo Router is a file-based router for React Native and web applications.",
    homepage: "https://docs.expo.dev/routing/introduction/",
    author: { name: "650 Industries, Inc." },
    repository: {
      url: "git+https://github.com/expo/expo.git",
      type: "git",
      directory: "packages/expo-router",
    },
  },
  {
    libraryName: "react",
    version: "18.2.0",
    _license: "MIT",
    _description: "React is a JavaScript library for building user interfaces.",
    homepage: "https://reactjs.org/",
    repository: {
      type: "git",
      url: "git+https://github.com/facebook/react.git",
      directory: "packages/react",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Facebook, Inc. and its affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native",
    version: "0.74.5",
    _license: "MIT",
    _description: "A framework for building native apps using React",
    homepage: "https://reactnative.dev/",
    repository: {
      type: "git",
      url: "git+https://github.com/facebook/react-native.git",
      directory: "packages/react-native",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-gesture-handler",
    version: "2.16.2",
    _license: "MIT",
    _description:
      "Experimental implementation of a new declarative API for gesture handling in react-native",
    homepage:
      "https://github.com/software-mansion/react-native-gesture-handler#readme",
    author: { name: "Krzysztof Magiera", email: "krzys.magiera@gmail.com" },
    repository: {
      type: "git",
      url: "git+https://github.com/software-mansion/react-native-gesture-handler.git",
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2016 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-reanimated",
    version: "3.10.1",
    _license: "MIT",
    _description:
      "More powerful alternative to Animated library for React Native.",
    homepage:
      "https://github.com/software-mansion/react-native-reanimated#readme",
    author: { name: "Krzysztof Magiera", email: "krzys.magiera@gmail.com" },
    repository: {
      type: "git",
      url: "git+https://github.com/software-mansion/react-native-reanimated.git",
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2016 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-safe-area-context",
    version: "4.10.5",
    _license: "MIT",
    _description:
      "A flexible way to handle safe area, also works on Android and web.",
    homepage:
      "https://github.com/th3rdwave/react-native-safe-area-context#readme",
    author: { name: "Janic Duplessis", email: "janicduplessis@gmail.com" },
    repository: {
      type: "git",
      url: "git+https://github.com/th3rdwave/react-native-safe-area-context.git",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019 Th3rd Wave\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-screens",
    version: "3.31.1",
    _license: "MIT",
    _description: "Native navigation primitives for your React Native app.",
    homepage: "https://github.com/software-mansion/react-native-screens#readme",
    author: { name: "Krzysztof Magiera", email: "krzys.magiera@gmail.com" },
    repository: {
      type: "git",
      url: "git+https://github.com/software-mansion/react-native-screens.git",
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2018 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-web",
    version: "0.19.13",
    _license: "MIT",
    _description: "React Native for Web",
    homepage: "https://github.com/necolas/react-native-web#readme",
    author: { name: "Nicolas Gallagher" },
    repository: {
      type: "git",
      url: "git://github.com/necolas/react-native-web.git",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Nicolas Gallagher.\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: "react-native-webview",
    version: "13.8.6",
    _license: "MIT",
    _description:
      "React Native WebView component for iOS, Android, macOS, and Windows",
    homepage:
      "https://github.com/react-native-webview/react-native-webview#readme",
    author: { name: "Jamon Holmgren", email: "jamon@infinite.red" },
    repository: {
      type: "git",
      url: "git+https://github.com/react-native-webview/react-native-webview.git",
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2015-present, Facebook, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
];
