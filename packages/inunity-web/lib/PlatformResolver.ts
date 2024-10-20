import { useLayoutEffect, useState } from "react";

type Platform = {
  os?: 'android' | 'ios' | 'web';
  isWebView?: boolean
}

export const platformResolver = (userAgent: string) => {
  let os = 'web';
  const isWebView = userAgent.indexOf('inunity_webview') > -1
  if (userAgent.indexOf("android") > -1) os = 'android'
  else if (
    userAgent.indexOf("ios") > -1
  )
    os = 'ios';
  return { os, isWebView } as Platform;
}

export const usePlatformResolver = () => {
  const [platform, setPlatform] = useState<Platform>({});
  const userAgent = navigator.userAgent.toLowerCase()
  useLayoutEffect(() => {
    setPlatform(platformResolver(userAgent));
  }, []);

  return platform;
}