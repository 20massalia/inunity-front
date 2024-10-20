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

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Header = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#002874" }}>
      <View style={{ backgroundColor: "#002874", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
        <Ionicons name="chevron-back" size={30} color={"white"} onPress={() => router.back()} />
        <View>
          <Text style={[styles.departmentName, styles.noticeTitleTypo]}>
            컴퓨터공학부
          </Text>
          <Text style={[styles.noticeTitle, styles.noticeTitleTypo]}>
            공지사항
          </Text>
        </View>
        <Ionicons name='menu' size={30} color={"white"} />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noticeTitleTypo: {
  textAlign: "center",
  color: "#fff",
  fontFamily: "Inter-ExtraBold",
  fontWeight: "800"
  },
  departmentName: {
  fontSize: 10
  },
  noticeTitle: {
  fontSize: 16
  },
  });

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="detail"
          options={{ header: (props) => <Header /> }}
        />
        <Stack.Screen name="index" options={{headerShown: false}}  />
        <Stack.Screen name="list" options={{headerShown: false}}  />
      </Stack>
    </ThemeProvider>
  );
}
