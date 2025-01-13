import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../globals.css";
import useNotification from "@/hooks/useNotification";
import { WebViewProvider } from "@/components/useWebView";
import AuthManager, { CookieName } from "@/lib/AuthManager";
import AppLifecycleHandler from "@/lib/AppLifecycleHandler";
import { Cookie, Cookies } from "@react-native-cookies/cookies";
import useCookies from "@/hooks/useCookies";
import DevMenu from "@/components/DevMenu";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const API_BASE_URL = "https://server.inunity.club/v1";

interface ApiResponse {
  status: number;
  message: string;
  data: unknown;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [cycleManagerInitialized, setCycleManagerInitialized] = useState(false);

  const {
    cookies,
    isLoading: isCookieLoading,
    isSuccess: isCookieSuccess,
    isError: isCookieError,
  } = useCookies();

  const checkCookieValidity = async (url: string, cookies: Cookies) => {
    if (!cookies) {
      throw new Error("No cookie provided");
    }

    const cookieString = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value.value}`)
      .join("; ");
    console.log(cookieString);
    console.log(
      "JSESSIONID=47F348F2C4f976C9fE346663DB3D70875C; accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDIyMDE1NDMiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sIm1lbWJlcklkIjo0LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzM2ODEwMTk0LCJleHAiOjE3MzY4MTM3OTR9.GnqqyXRWl_rpI7rvMpTHp144rDtSZi6vDr_JhRH4iew; refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDIyMDE1NDMiLCJ1c2VySWQiOjQsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MzY4MTAxOTQsImV4cCI6MTczNjgxMDc5NH0.tOexdnMCmT0m96j6yRlxSFQmbMOmZWyvmeIXMf9vg_4"
    );

    const res = await fetch(url, {
      headers: {
        cookie: cookieString,
      },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`${res.status} | ${JSON.stringify(await res.json())}`);
    }

    const body = (await res.json()) as ApiResponse;
    if (body.status < 200 || body.status >= 300) {
      throw new Error(body.message);
    }
  };

  const authorizeApp = async () => {
    if (!isCookieSuccess || !cookies?.[CookieName.AccessToken]) {
      router.replace("/auth");
      await SplashScreen.hideAsync();
      return;
    }

    try {
      const accessToken = cookies[CookieName.AccessToken];

      // Check if token is expired
      const expiryDate = new Date(accessToken.expires!);
      if (expiryDate < new Date()) {
        throw new Error("Access token expired");
      }

      // Validate access token
      await checkCookieValidity(`${API_BASE_URL}/auth/test`, cookies);
      console.log("Access token valid", accessToken);

      // Set cookie in WebView
      await AuthManager.setBulkCookiesToManager(cookies);

      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("Authentication failed:", e);
      router.replace("/auth");
      await SplashScreen.hideAsync();
    }
  };

  // Initialize AppLifecycleHandler
  useEffect(() => {
    if (!cycleManagerInitialized) {
      AppLifecycleHandler.init();
      setCycleManagerInitialized(true);
    }
  }, []);

  // Handle app initialization
  useEffect(() => {
    if (loaded && !isCookieLoading && cycleManagerInitialized) {
      if (!isCookieError) {
        authorizeApp();
      } else {
        router.replace("/auth");
        SplashScreen.hideAsync();
      }
    }
  }, [loaded, isCookieLoading, cycleManagerInitialized]);

  useNotification();

  if (!loaded || !cycleManagerInitialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <WebViewProvider>
          <ThemeProvider value={DefaultTheme}>
            <DevMenu>
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
            </DevMenu>
          </ThemeProvider>
        </WebViewProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
