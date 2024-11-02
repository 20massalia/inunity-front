export type Platform = {
  os?: 'android' | 'ios' | 'web';
  isWebView?: boolean
}

export const platformResolver = (userAgent: string) => {
  let os = 'web';
  userAgent = userAgent.toLowerCase();
  const isWebView = userAgent.indexOf('inunity_webview') > -1
  if (userAgent.indexOf("android") > -1) os = 'android'
  else if (
    userAgent.indexOf("ios") > -1
  )
    os = 'ios';
  return { os, isWebView } as Platform;
}

