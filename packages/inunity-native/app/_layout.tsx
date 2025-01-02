import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";

// Import your global CSS file
import "../globals.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNotification from "@/hooks/useNotification";
import { WebViewProvider } from "@/components/useWebView";
import AuthManager from "@/lib/AuthManager";
import AppLifecycleHandler from "@/lib/AppLifecycleHandler";
import { Cookie } from "@react-native-cookies/cookies";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [cookieSynced, setCookieSynced] = useState(false);
  const [cycleManagerInitialized, setCycleManagerInitialized] = useState(false);

  useEffect(() => {
    if (loaded && cookieSynced) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const syncCookie = async () => {
    // 스토리지에 쿠키가 있으면 꺼내서 셋.
    try {
      const cookieFromStorage = await AuthManager.getCookieFromStorage();
      console.log("cookie:", (cookieFromStorage as Cookie).name);
      if (cookieFromStorage)
      await AuthManager.setCookieToManager(cookieFromStorage);
    } catch (e) {
      console.error(e);
    }
    // 쿠키 싱크 성공 유무와 관계없이 통과.
    setCookieSynced(true);
  };

  useEffect(() => {
    syncCookie().then(() => {
      setCookieSynced(true);
    });
    if (!cycleManagerInitialized) {
      AppLifecycleHandler.init();
      setCycleManagerInitialized(true);
    }
  }, []);

  useNotification();

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <WebViewProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="article/[categoryId]/index" />
              <Stack.Screen name="article/[categoryId]/write" />
              <Stack.Screen name="article/[categoryId]/[articleId]/index" />
              <Stack.Screen name="(tabs)" />

              <Stack.Screen name="list" />
              <Stack.Screen name="notification/index" />
              <Stack.Screen name="notification/setting" />
            </Stack>
          </ThemeProvider>
        </WebViewProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
