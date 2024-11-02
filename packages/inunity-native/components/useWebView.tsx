import { createContext, useState, useContext } from "react";

export type WebViewContextType = {
    url: string,
    setUrl: (url:string) => void;
  }

  
const WebViewContext = createContext<WebViewContextType>({ url: '/', setUrl: () => {} })
export const WebViewProvider = ({ children }: React.PropsWithChildren) => {
  const [url, setUrl] = useState('/');
  return <WebViewContext.Provider value={{ url: url!, setUrl }}>
    {children}
  </WebViewContext.Provider>
}
export const useWebView = () => {
  const webView = useContext(WebViewContext);
  if (!webView) throw new Error('useWebView must used in <WebViewProvider> component!')
  return webView
}