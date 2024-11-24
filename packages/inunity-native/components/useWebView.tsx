import { createContext, useState, useContext, useRef } from "react";
import WebView from "react-native-webview";

export type WebViewContextType = {
  webViewRef: React.RefObject<WebView>;
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  }

  
  const WebViewContext = createContext<WebViewContextType | undefined>(undefined);
  
  export const WebViewProvider = ({ children }: React.PropsWithChildren) => {
  const [url, setUrl] = useState('/');
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)
  return <WebViewContext.Provider value={{ webViewRef, url, setUrl, isLoading, setIsLoading  }}>
    {children}
  </WebViewContext.Provider>
}
export const useWebView = () => {
  const webView = useContext(WebViewContext);
  if (!webView) throw new Error('useWebView must used in <WebViewProvider> component!')
  return webView
}