import CustomWebView from "@/components/CustomWebView";
import {  useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export default function Screen() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <CustomWebView initialPathname={`/post/${categoryId}/write`} />
      </View>
    </KeyboardAvoidingView>
  );
}
