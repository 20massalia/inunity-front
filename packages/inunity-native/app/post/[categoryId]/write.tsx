import { parseMessage, handleMessage } from "@/lib/MessageManager";
import { router } from "expo-router";
import { MessageEventType } from "message-type/message-type";
import { useRef } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import WebView from "react-native-webview";

export default function Screen() {
  const webViewRef = useRef<WebView>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          // injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
          source={{
            uri: `${process.env.EXPO_PUBLIC_WEB_URL}/post/1/write`,
          }}
          userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
          sharedCookiesEnabled
          onMessage={(event) => {
            const message = parseMessage(event.nativeEvent.data);
            handleMessage(message, {
              [MessageEventType.Navigation]: () => {
                router.push("/find");
              },
            });
          }}
        ></WebView>
      </View>
    </KeyboardAvoidingView>
  );
}
