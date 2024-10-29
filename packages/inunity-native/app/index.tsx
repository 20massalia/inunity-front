import { useRef, useState, useEffect } from "react";
import { SafeAreaView, Platform, Button, View, StatusBar } from "react-native";
import WebView from "react-native-webview";

import { ThemedText } from "@/components/ThemedText";
import AuthManager from "@/lib/AuthManager";
import { useMessageManager, parseMessage, handleMessage } from "@/lib/MessageManager";
import { MessageEventType, NavigationEvent } from "message-type/message-type";
import { router } from "expo-router";

function isLightColor(hex: string): boolean {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

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
      throw new Error('Invalid hex color format');
  }

  // Calculate brightness using the luminance formula
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
  
  // Return true if the brightness is greater than a certain threshold (e.g., 186)
  return brightness > 186;
}

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

  const [themeColor, setThemeColor] = useState('#ffffff');


  return (
    <SafeAreaView style={{backgroundColor: themeColor}}>
      <View style={{height:'100%',}}>
      <WebView
        ref={webViewRef}
        
        injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}; window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'themeColor', value: document.body.style.backgroundColor`}
        source={{
          uri: `${process.env.EXPO_PUBLIC_WEB_URL}/login`,
        }}
        userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
        sharedCookiesEnabled
        onLoadStart={() => setIsWebViewLoading(true)}
        onLoadEnd={() => setIsWebViewLoading(false)}
        onMessage={(event) => {
          const message = parseMessage(event.nativeEvent.data);
          console.log(message)
          handleMessage(message, {
            [MessageEventType.Login]: () => {
              router.push('/list')
            },
            [MessageEventType.Navigation]: () => {
              const navigation = message.value as NavigationEvent;
              router.push({pathname: navigation.path as any, params: navigation.params as any})
            },
            [MessageEventType.ThemeColor]: () => {
              const color = message.value as string
              if (!new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(color)) return;
              setThemeColor(message.value as string);
              StatusBar.setBarStyle(isLightColor(message.value as string) ? 'dark-content' : 'light-content');
            }
          });
        }}
      ></WebView>

      </View>
    </SafeAreaView>
  );
}