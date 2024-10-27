import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView, Platform, Button, View } from "react-native";
import WebView from "react-native-webview";

import { ThemedText } from "@/components/ThemedText";
import AuthManager from "@/lib/AuthManager";
import { useMessageManager, parseMessage, handleMessage } from "@/lib/MessageManager";
import { MessageEventType, NavigationEvent } from "message-type/message-type";


export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);
  const messageManager = useMessageManager(webViewRef);
  useEffect(() => {
    if (!isWebViewLoading)
    AuthManager.getCredentialFromStorage().then((cookie) => {
      messageManager.sendMessage({ event: MessageEventType.Auth, value: cookie });
      setCookie(cookie);
    });
  }, [isWebViewLoading]);

  return (
    <SafeAreaView>
      <View style={{height:'100%',}}>
      <WebView
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
        source={{
          uri: "http://192.168.1.146:3000/login",
        }}
        userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
        sharedCookiesEnabled
        onLoadStart={() => setIsWebViewLoading(true)}
        onLoadEnd={() => setIsWebViewLoading(false)}
        onMessage={(event) => {
          const message = parseMessage(event.nativeEvent.data);
          handleMessage(message, {
            [MessageEventType.Login]: () => {
              router.push('/list')
            },
            [MessageEventType.Navigation]: () => {
              const navigation = message.value as NavigationEvent;
              console.log(message)
              router.push({pathname: navigation.path as any, params: navigation.params as any})
            },
          });
        }}
      ></WebView>

      </View>
    </SafeAreaView>
  );
}