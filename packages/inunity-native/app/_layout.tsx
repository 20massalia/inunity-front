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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export let webViewUrl = process.env.EXPO_PUBLIC_WEB_URL;

const devMenuItems = [
  {
    name: "Set WebView URL",
    callback: () => {
      Alert.prompt("디버그 메뉴", "WebView URL을 입력해주세요.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (value) => {
            webViewUrl = value;
          },
        },
      ]);
    },
  },
];

registerDevMenuItems(devMenuItems);

const Header = () => {
  // Todo: change Background color by category
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#EFF3F4",
        }}
      >
        <Ionicons name="chevron-back" size={30} onPress={() => router.back()} />
        <View>
          <Text style={[styles.departmentName, styles.noticeTitleTypo]}>
            컴퓨터공학부
          </Text>
          <Text style={[styles.noticeTitle, styles.noticeTitleTypo]}>
            공지사항
          </Text>
        </View>
        <MenuView
          onPressAction={({ nativeEvent }) => {
            console.warn(JSON.stringify(nativeEvent));
          }}
          actions={[
            {
              id: "edit",
              title: "수정",
              image: Platform.select({
                ios: "pencil",
                android: "ic_menu_edit",
              }),
            },
            {
              id: "delete",
              title: "삭제",
              attributes: {
                destructive: true,
              },
              image: Platform.select({
                ios: "trash",
                android: "ic_menu_delete",
              }),
            },
            {
              id: "report",
              title: "신고",
              attributes: {
                destructive: true,
              },
              image: Platform.select({
                ios: "light.beacon.max",
                android: "ic_menu_delete",
              }),
            },
            {
              id: "block",
              title: "차단",
              image: Platform.select({
                ios: "hand.raised",
                android: "ic_menu_share",
              }),
            },
            {
              id: "share",
              title: "공유",
              image: Platform.select({
                ios: "square.and.arrow.up",
                android: "ic_menu_share",
              }),
            },
          ]}
          shouldOpenOnLongPress={false}
        >
          <View
            // onPress={() => {}}
            className="aspect-square flex items-center"
          >
            <FontAwesome6 name="ellipsis-vertical" size={30} />
          </View>
        </MenuView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noticeTitleTypo: {
    textAlign: "center",
    color: "black",
    fontFamily: "Inter-ExtraBold",
    fontWeight: "800",
  },
  departmentName: {
    fontSize: 10,
  },
  noticeTitle: {
    fontSize: 16,
  },
});

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
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

