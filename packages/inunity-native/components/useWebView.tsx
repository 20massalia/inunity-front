import { createContext, useState, useContext, useRef, useEffect } from "react";
import { Alert } from "react-native";
import WebView from "react-native-webview";
import { registerDevMenuItems } from "expo-dev-menu";

export type WebViewContextType = {
  webViewRef: React.RefObject<WebView>;
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
export let webViewUrl = process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000/';

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export const WebViewProvider = ({ children }: React.PropsWithChildren) => {
  const [url, setUrl] = useState(webViewUrl);
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Dev Menu 항목 등록
    const devMenuItems = [
      {
        name: "Set WebView URL",
        callback: () => {
          Alert.prompt("디버그 메뉴", "WebView URL을 입력해주세요.", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: (value) => {
                setUrl(value ?? '');
              },
            },
          ]);
        },
      },
    ];

    registerDevMenuItems(devMenuItems);
  }, [url]);

  return (
    <WebViewContext.Provider
      value={{ webViewRef, url, setUrl, isLoading, setIsLoading }}
    >
      {children}
    </WebViewContext.Provider>
  );
};
export const useWebView = () => {
  const webView = useContext(WebViewContext);
  if (!webView)
    throw new Error("useWebView must used in <WebViewProvider> component!");
  return webView;
};
