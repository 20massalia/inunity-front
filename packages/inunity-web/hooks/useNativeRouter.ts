"use client";

import { usePlatform } from "@/lib/PlatformProvider";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { MessageEventType } from "message-type/message-type";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNativeRouter() {
  const router = useRouter();
  const { messageManager } = useMessageManager();
  const { isWebView } = usePlatform();

  const customPush = useCallback(
    (url: string) => {
      if (isWebView)
        messageManager?.sendMessage(MessageEventType.Navigation, { path: url });
      else router.push(url);
    },
    [isWebView, messageManager, router]
  );

  const customReplace = useCallback(
    (url: string) => {
      if (isWebView)
        messageManager?.sendMessage(MessageEventType.Navigation, { path: url, replace: true });
      else router.replace(url);
    },
    [isWebView, messageManager, router]
  );

  const customBack = useCallback(() => {
    if (isWebView) messageManager?.sendMessage(MessageEventType.Navigation, -1);
    else router.back();
  }, [isWebView, messageManager, router]);

  return {
    ...router,
    push: customPush,
    replace: customReplace,
    back: customBack,
  };
}
