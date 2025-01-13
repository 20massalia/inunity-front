// WebView context and types
import {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  PropsWithChildren,
} from "react";
import WebView from "react-native-webview";

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
export const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export const WebViewProvider = ({ children }: PropsWithChildren) => {
  const [activeWebView, setActiveWebView] = useState<string>();
  const [webViews, setWebViews] = useState({ index: webViewOrigin });
  const [isLoading, setIsLoading] = useState(true);

  // Single MutableRefObject to store all WebView references
  const webViewRefs = useRef<Record<string, WebView | null>>({});

  const setUrl = (webViewId: string, url: string) => {
    setWebViews((prev) => ({ ...prev, [webViewId]: url }));
  };


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

export const useWebViewWithId = (webViewId: string) => {
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



export const useWebView = () => {
  const webView = useContext(WebViewContext);
  if (!webView) {
    throw new Error(
      "useWebView must be used within <WebViewProvider> component!"
    );
  }
  return webView;
};
