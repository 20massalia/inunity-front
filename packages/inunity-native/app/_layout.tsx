import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";

// Import your global CSS file
import "../globals.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNotification from "@/hooks/useNotification";
import { WebViewProvider } from "@/components/useWebView";
import AuthManager, { CookieName } from "@/lib/AuthManager";
import AppLifecycleHandler from "@/lib/AppLifecycleHandler";
import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import useAccessTokenCookie from "@/hooks/useAccessTokenCookie";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [cycleManagerInitialized, setCycleManagerInitialized] = useState(false);
  const {
    cookie,
    isLoading: isCookieLoading,
    isSuccess: isCookieSuccess,
    isError: isCookieError,
  } = useAccessTokenCookie();

  const checkCookieValidity = async (url: string, cookie: Cookie) => {
    if (!cookie) {
      throw new Error("no cookie");
    } else {
      const cookieString = Object.entries(cookie)
        .map(([key, value]) => `${key}=${value.value}`)
        .join("; ");

      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Cookie: cookieString,
        },
      });
      if (!res.ok) throw new Error(res.status.toString());
      const body = (await res.json()) as {
        status: number;
        message: string;
        data: unknown;
      };
      if (200 <= body.status && body.status < 300) {
        return;
      } else throw new Error(body.message);
    }
  };
  const authorizeApp = async () => {
    if (isCookieSuccess && cookie)
      try {
        await checkCookieValidity(
          "https://server.inunity.club/v1/auth/test",
          cookie
        );
        console.log("cookie  valid.", cookie);

        await AuthManager.setCookieToManager(cookie);
        const expiryDate = new Date(cookie.expires!);
        if (expiryDate < new Date()) throw new Error("cookie expired.");

        SplashScreen.hideAsync();
        // 쿠키가 있고 제대로 동기화 됐으면 스플래시 제거
        return;
      } catch (e) {
        console.log("cookie not valid.", e);
        const refreshCookie = await AuthManager.getCookieFromStorage(
          CookieName.RefreshToken
        );
        await checkCookieValidity(
          "https://server.inunity.club/v1/auth/refresh",
          cookie
        );
      }
    // 쿠키가 없거나 올바르지 않거나 토큰이 만료됐으면 /auth로 이동
    router.replace("/auth");
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (loaded && !isCookieLoading && cycleManagerInitialized) {
      if (!isCookieError) authorizeApp();
      else {
        router.replace("/auth");
        SplashScreen.hideAsync();
      }
    }
  }, [loaded, isCookieLoading, cycleManagerInitialized]);

  useEffect(() => {
    if (!cycleManagerInitialized) {
      AppLifecycleHandler.init();
      setCycleManagerInitialized(true);
    }
  }, []);

  useNotification();

  if (!loaded  || !cycleManagerInitialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <WebViewProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="auth/index" />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="article/[categoryId]/index" />
              <Stack.Screen name="article/[categoryId]/write" />
              <Stack.Screen name="article/[categoryId]/[articleId]/index" />
              <Stack.Screen name="(tabs)" />

              <Stack.Screen name="list" />
              <Stack.Screen name="notification/index" />
              <Stack.Screen name="notification/setting" />
              <Stack.Screen name="license" options={{ title: "license" }} />
            </Stack>
          </ThemeProvider>
        </WebViewProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
