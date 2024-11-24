import CustomWebView from "@/components/CustomWebView";
import { parseMessage, handleMessage } from "@/lib/MessageManager";
import { router, useLocalSearchParams } from "expo-router";
import { MessageEventType } from "message-type/message-type";
import { useRef } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import WebView from "react-native-webview";

export default function Screen() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <CustomWebView initialPathname={`/post/${categoryId}/write`} />
      </View>
    </KeyboardAvoidingView>
  );
}
