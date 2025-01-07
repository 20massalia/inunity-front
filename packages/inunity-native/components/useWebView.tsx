import { createContext, useState, useContext, useRef, useEffect, useCallback, MutableRefObject, RefObject } from "react";
import { Alert } from "react-native";
import WebView from "react-native-webview";
import { registerDevMenuItems } from "expo-dev-menu";
import AuthManager, { CookieName } from "@/lib/AuthManager";

export type WebViewContextType = {
  webViewRefs: RefObject<RefRecord>;
  webViews: Record<string, string>;
  activeWebView?: string;
  setUrl: (webViewId: string, url: string) => void;
  setActiveWebView: (webViewId: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
export let webViewOrigin =
  process.env.EXPO_PUBLIC_WEB_URL ?? "http://localhost:3000/";

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);
type RefRecord = Record<string, React.MutableRefObject<WebView>>;

export const WebViewProvider = ({ children }: React.PropsWithChildren) => {
  const [activeWebView, setActiveWebView] = useState<string>();
  const [webViews, setWebViews] = useState({index: webViewOrigin});

  
  const [isLoading, setIsLoading] = useState(true);

  const setUrl = (webViewId: string, url: string) => {
    setWebViews(prev => ({...prev, [webViewId]: url}))
  }

  const webViewRefs = useRef<RefRecord>({});

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
                if (activeWebView)
                  setUrl(activeWebView, value ?? '')
              },
            },
          ]);
        },
      },
      {
        name: "Get cookies from manager",
        callback: async () => {
          const cookies = await AuthManager.getCookieFromManager(
            CookieName.AccessToken
          );
          console.info(cookies);
          Alert.alert("디버그", JSON.stringify(cookies));
        },
      },
    ];

    registerDevMenuItems(devMenuItems);
  }, []);
  
  return (
    <WebViewContext.Provider
      value={{
        webViewRefs,
        webViews,
        setUrl,
        activeWebView,
        setActiveWebView,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WebViewContext.Provider>
  );
};
export const useWebView = (webViewId: string) => {
  const webView = useContext(WebViewContext);
  if (!webView)
    throw new Error("useWebView must used in <WebViewProvider> component!");
  const setUrl = (url:string) => webView.setUrl(webViewId, url)
  console.log(webView.webViewRefs)

  return {...webView, setUrl, webViewRef: webView.webViewRefs.current?.[webViewId]};
};
