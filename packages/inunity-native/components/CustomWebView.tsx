import WebView, { WebViewProps } from "react-native-webview";
import { useWebView, webViewUrl } from "./useWebView";
import { Platform } from "react-native";
import {
  handleMessage,
  parseMessage,
  useMessageManager,
} from "@/lib/MessageManager";
import {
  MessageEventType,
  NavigationEvent,
  PageEvent,
} from "message-type/message-type";
import { router } from "expo-router";
import { isLightColor } from "@/lib/ColorUtil";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import AuthManager from "@/lib/AuthManager";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomWebView({
  pageEventHandler,
  initialPathname,
  ...props
}: {
  pageEventHandler?: (pageEvent: PageEvent<any>) => void;
  initialPathname: string;
} & WebViewProps) {
  const { setIsLoading, isLoading, webViewRef } = useWebView();
  const insets = useSafeAreaInsets();


  return (
    <WebView
      ref={webViewRef}
      injectedJavaScriptBeforeContentLoaded={`
      document.documentElement.style.setProperty('--sat', '${insets.top}px');
  `}
      source={{
        uri: `${webViewUrl}/${initialPathname}`,
      }}
      onNavigationStateChange={props.onNavigationStateChange}
      userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
      sharedCookiesEnabled
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      onMessage={(event) => {
        const message = parseMessage(event.nativeEvent.data);
        handleMessage(message, {
          [MessageEventType.Login]: () => {
            router.push("/list");
          },
          [MessageEventType.Navigation]: () => {
            const navigation = message.value as NavigationEvent;
            if (navigation === -1) router.back();
            else
              router.push({
                pathname: navigation.path as any,
                params: navigation.params as any,
              });
          },
          [MessageEventType.ThemeColor]: () => {
            const color = message.value as string;
            if (!new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(color))
              return;
            // setStatusBarStyle(isLightColor(color) ? "dark" : "light");
          },
          [MessageEventType.Page]: () => {
            const pageEvent = message.value as PageEvent<any>;
            pageEventHandler?.(pageEvent);
          },
          [MessageEventType.Log]: () => {
            console.log(message.value)
          }
        });
      }}
    ></WebView>
  );
}
