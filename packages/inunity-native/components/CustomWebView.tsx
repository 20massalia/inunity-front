import WebView, { WebViewProps } from "react-native-webview";
import { useWebViewWithId, webViewOrigin } from "./useWebView";
import { Platform } from "react-native";
import {
  handleMessage,
  parseMessage,
} from "@/lib/MessageManager";
import {
  MessageEventType,
  NavigationEvent,
  PageEvent,
} from "message-type/message-type";
import { router } from "expo-router";
import AuthManager from "@/lib/AuthManager";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import * as Notifications from "expo-notifications";


export default function CustomWebView({
  id,
  pageEventHandler,
  initialUrl,
  ...props
}: {
  id: string;
  pageEventHandler?: (pageEvent: PageEvent<any>) => void;
  initialUrl: string;
} & WebViewProps) {
  const { setIsLoading, isLoading, webViewRefs } = useWebViewWithId(id);
  const insets = useSafeAreaInsets();

  return (
    <WebView
      ref={(node) => {
        if (webViewRefs.current) {
          webViewRefs.current[id] = node;
        }
      }}
      source={{
        uri: `${initialUrl}`,
        headers: {
          "Top-Inset": `${insets.top}`,
        },
      }}
      thirdPartyCookiesEnabled
      domStorageEnabled
      incognito={false}
      webviewDebuggingEnabled
      javaScriptEnabled
      sharedCookiesEnabled
      onNavigationStateChange={props.onNavigationStateChange}
      userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      onMessage={(event) => {
        const message = parseMessage(event.nativeEvent.data);
        handleMessage(message, {
          [MessageEventType.Login]: async () => {
            const cookies = await AuthManager.getAllCookiesFromManager();
            await AuthManager.saveBulkCookiesToStorage(cookies);
            const token = await Notifications.getDevicePushTokenAsync();
            
          },
          [MessageEventType.Navigation]: () => {
            const navigation = message.value as NavigationEvent;
            if (navigation === -1) router.back();
            else {
              if (navigation.replace)
                router.replace({
                  pathname: navigation.path as any,
                  params: navigation.params as any,
                });
              else
                router.push({
                  pathname: navigation.path as any,
                  params: navigation.params as any,
                });
            }
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
            console.log(message.value);
          },
        });
      }}
    ></WebView>
  );
}
