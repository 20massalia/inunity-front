"use client";

import { useMessageManager } from "@/shared/ui/MessageContext";
import { MessageEventType } from "message-type/message-type";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { usePlatform } from "./usePlatform";

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

  const customBack = useCallback(() => {
    if (isWebView) messageManager?.sendMessage(MessageEventType.Navigation, -1);
    else router.back();
  }, [isWebView, messageManager, router]);

  return {
    ...router,
    push: customPush,
    back: customBack,
  };
}
