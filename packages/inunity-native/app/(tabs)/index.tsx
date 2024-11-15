import { useRef, useState, useEffect } from "react";
import { Platform, Button, View } from "react-native";
import WebView from "react-native-webview";

import AuthManager from "@/lib/AuthManager";
import {
  useMessageManager,
  parseMessage,
  handleMessage,
} from "@/lib/MessageManager";
import { MessageEventType, NavigationEvent } from "message-type/message-type";
import { router } from "expo-router";
import { WebViewProvider, useWebView } from "../../components/useWebView";
import { SafeAreaView } from "react-native-safe-area-context";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { webViewUrl } from "../_layout";

function isLightColor(hex: string): boolean {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex color
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    // If the hex is in shorthand form (e.g., #fff)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // If the hex is in full form (e.g., #ffffff)
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  // Calculate brightness using the luminance formula
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return true if the brightness is greater than a certain threshold (e.g., 186)
  return brightness > 186;
}

export default function Index() {
  const [cookie, setCookie] = useState<string | null>(null);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);
  const webView = useWebView();
  const messageManager = useMessageManager(webView.webViewRef);

  useEffect(() => {
    if (!isWebViewLoading)
      AuthManager.getCredentialFromStorage().then((cookie) => {
        messageManager.sendMessage({
          event: MessageEventType.Auth,
          value: cookie,
        });
        setCookie(cookie);
      });
  }, [isWebViewLoading]);

  const [themeColor, setThemeColor] = useState('#ffffff');

  return (
    <SafeAreaView style={{ backgroundColor: themeColor }}>
      <View style={{ height: "100%" }}>
        <WebView
          ref={webView.webViewRef}
          injectedJavaScriptBeforeContentLoaded={`
          if (!document.cookie)
            document.cookie=${cookie};
          window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'themeColor', value: document.body.style.backgroundColor
          `}
          source={{
            uri: `${webViewUrl}/`,
          }}
          onNavigationStateChange={({ url }) => {
            webView.setUrl(new URL(url).pathname);
          }}
          userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
          sharedCookiesEnabled
          onLoadStart={() => setIsWebViewLoading(true)}
          onLoadEnd={() => setIsWebViewLoading(false)}
          onMessage={(event) => {
            const message = parseMessage(event.nativeEvent.data);

            handleMessage(message, {
              [MessageEventType.Login]: () => {
                router.push("/list");
              },
              [MessageEventType.Navigation]: () => {
                const navigation = message.value as NavigationEvent;
                router.push({
                  pathname: navigation.path as any,
                  params: navigation.params as any,
                });
              },
              [MessageEventType.ThemeColor]: () => {
                const color = message.value as string
                if (!new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(color)) return;
                setThemeColor(color);
                setStatusBarStyle(isLightColor(color) ? 'dark' : 'light')
              },
            });
          }}
        ></WebView>
      </View>
    </SafeAreaView>
  );
}
