import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { StyleSheet, View, Text, Image, Pressable, Alert } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { registerDevMenuItems } from 'expo-dev-menu';
import { Slot } from "expo-router";

// Import your global CSS file
import "../globals.css"
import { verifyInstallation } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export let webViewUrl = process.env.EXPO_PUBLIC_WEB_URL;

const devMenuItems = [
  {
    name: 'Set WebView URL',
    callback: () => {
      Alert.prompt(
        "디버그 메뉴",
        "WebView URL을 입력해주세요.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: (value) => {
            webViewUrl = value;
          } }
        ],
      );    },
  },
];

registerDevMenuItems(devMenuItems);

const Header = () => {
// Todo: change Background color by category
  return (

    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar style="dark"  />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#EFF3F4'
        }}
      >
        <Ionicons
          name="chevron-back"
          size={30}
          onPress={() => router.back()}
        />
        <View>
          <Text style={[styles.departmentName, styles.noticeTitleTypo]}>
            컴퓨터공학부
          </Text>
          <Text style={[styles.noticeTitle, styles.noticeTitleTypo]}>
            공지사항
          </Text>
        </View>
        <Ionicons name="menu-sharp" size={30}  />
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

  if (!loaded) {
    return null;
  }
  verifyInstallation();


  return (
    <SafeAreaProvider >
      <GestureHandlerRootView>

      
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="detail"
            options={{ header: (props) => <Header /> }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="list" options={{ headerShown: false }} />
        </Stack>
       
      </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

