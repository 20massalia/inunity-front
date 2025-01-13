// WebView context and types
import {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";
import { Alert } from "react-native";
import WebView from "react-native-webview";
import { registerDevMenuItems } from "expo-dev-menu";
import AuthManager, { CookieName } from "@/lib/AuthManager";
import { Href, router } from "expo-router";
import CookieManager from "@react-native-cookies/cookies";

export type WebViewContextType = {
  webViewRefs: React.MutableRefObject<Record<string, WebView | null>>;
  webViews: Record<string, string>;
  activeWebView?: string;
  setUrl: (webViewId: string, url: string) => void;
  setActiveWebView: (webViewId: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const webViewOrigin =
  process.env.EXPO_PUBLIC_WEB_URL ?? "http://localhost:3000/";
const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export const WebViewProvider = ({ children }: React.PropsWithChildren) => {
  const [activeWebView, setActiveWebView] = useState<string>();
  const [webViews, setWebViews] = useState({ index: webViewOrigin });
  const [isLoading, setIsLoading] = useState(true);

  // Single MutableRefObject to store all WebView references
  const webViewRefs = useRef<Record<string, WebView | null>>({});

  const setUrl = (webViewId: string, url: string) => {
    setWebViews((prev) => ({ ...prev, [webViewId]: url }));
  };

  useEffect(() => {
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
                if (activeWebView) setUrl(activeWebView, value ?? "");
              },
            },
          ]);
        },
      },
      {
        name: "Get cookies from manager",
        callback: () => {
          Alert.alert("디버그 메뉴", "어떤 쿠키를 까볼까요?", [
            {
              text: "브라우저",
              onPress: async () => {
                const cookies = await AuthManager.getCookieFromManager(
                  CookieName.AccessToken
                );

                alert(cookies);
                console.info(cookies);
              },
              style: "cancel",
            },
            {
              text: "네이티브 스토리지",
              onPress: async () => {
                const cookie = await AuthManager.getCookieFromStorage(
                  CookieName.AccessToken
                );
                console.info(cookie);
                alert(JSON.stringify(cookie));
              },
            },
          ]);
        },
      },
      {
        name: "set cookie from storage",
        callback: async () => {
          const cookie = await AuthManager.getCookieFromStorage(CookieName.AccessToken);
          if (!cookie) {
            console.error("no cookie");
            return;
          }
          const setSuccess = await CookieManager.set(
            "https://server.inunity.club",
            cookie,
            true
          );
          // await AuthManager.setCookieToManager(cookie)
          const updated = await CookieManager.getAll(true);
          console.log("cookie set", setSuccess, updated);
        },
      },
      {
        name: "clear cookies",
        callback: async () => {
          Alert.alert("디버그 메뉴", "어떤 쿠키를 지울까요?", [
            {
              text: "브라우저",
              onPress: () => CookieManager.clearAll(),
              style: "cancel",
            },
            {
              text: "네이티브 스토리지",
              onPress: () => {
                AuthManager.clearCookieFromStorage(CookieName.AccessToken);
              },
            },
          ]);
        },
      },
      {
        name: "push to route",
        callback: async () => {
          Alert.prompt("디버그 메뉴", "WebView URL을 입력해주세요.", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: (value) => {
                if (value) router.push(value as Href<string>);
              },
            },
          ]);
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
  if (!webView) {
    throw new Error(
      "useWebView must be used within <WebViewProvider> component!"
    );
  }

  const setUrl = (url: string) => webView.setUrl(webViewId, url);

  return {
    ...webView,
    setUrl,
    webViewRef: webView.webViewRefs.current[webViewId] || null,
  };
};
