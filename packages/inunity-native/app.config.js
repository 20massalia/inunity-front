export default {
  "expo": {
    "name": "inunity-native",
    "slug": "inunity-native",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "inunity",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "org.inu.inunity",
      "googleServicesFile": process.env.GOOGLE_SERVICES_PLIST ?? "./GoogleService-Info.plist",
      buildNumber: "1",
      "infoPlist": {
        "NSCrossWebsiteTrackingUsageDescription": "Allow apps to authenticate ."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "org.inu.inunity",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
      versionCode: '1'
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static",
            "deploymentTarget": "13.4"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "b790a028-3786-4c9c-8659-2f66ec95062d"
      }
    }
  }
};
