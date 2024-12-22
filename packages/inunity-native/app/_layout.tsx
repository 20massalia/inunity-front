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

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Alert,
  TouchableHighlight,
  Platform,
  SafeAreaView,
} from "react-native";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { registerDevMenuItems } from "expo-dev-menu";
import { Slot } from "expo-router";

// Import your global CSS file
import "../globals.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuView } from "@react-native-menu/menu";
import useNotification from "@/hooks/useNotification";
import { WebViewProvider } from "@/components/useWebView";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export let webViewUrl = process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000/';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
              <Stack.Screen name="post/[categoryId]/index" />
              <Stack.Screen name="post/[categoryId]/write" />
              <Stack.Screen name="post/[categoryId]/[postId]/index" />
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

