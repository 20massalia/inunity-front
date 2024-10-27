import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView, Platform, Button, View } from "react-native";
import WebView from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { ThemedText } from "@/components/ThemedText";
import AuthManager from "@/lib/AuthManager";
import { Message, MessageEventType, NavigationEvent } from "message-type/message-type";
import { handleMessage, parseMessage } from "@/lib/MessageManager";


export default function List() {
  const webViewRef = useRef<WebView>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  useEffect(() => {
    AuthManager.getCredentialFromStorage().then((cookie) => {
      sendMessage({ event: MessageEventType.Auth, value: cookie });
      setCookie(cookie);
    });
  }, []);

  const sendMessage = (message: Message) => {
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  return (
    <View>
      <View style={{height:'100%',}}>
      <WebView
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
        source={{
          uri: `${process.env.EXPO_PUBLIC_WEB_URL}/list`,
        }}
        userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
        sharedCookiesEnabled
        onMessage={(event) => {
          const message = parseMessage(event.nativeEvent.data);
          handleMessage(message, {
            [MessageEventType.Navigation]: () => {
              const navigation = message.value as NavigationEvent;
              console.log(message)
              router.push({pathname: navigation.path as any, params: navigation.params as any})
            },
          });
        }}
      ></WebView>

      </View>
    </View>
  );
}