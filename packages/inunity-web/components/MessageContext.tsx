"use client";

import { usePlatform } from "@/hooks/usePlatform";
import { MessageManager } from "@/lib/MessageManager";

import { MessageEventType, NavigationEvent, PageEvent, PageEventType } from 'message-type/message-type';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

export type MessageContextType = {
  messageManager?: MessageManager;
  pageEvent?: PageEvent<PageEventType>;
}

export const MessageContext = createContext<MessageContextType>({});

export const MessageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { os, isWebView } = usePlatform();
  const [messageManager, setMessageManager] = useState<MessageManager | null>(null);
  const router = useRouter();

  const [pageEvent, setPageEvent] = useState<PageEvent<PageEventType>>();

  useEffect(() => {
    if (!isWebView) return;

    // hydration이 완료된 후 실행됩니다.
    const manager = new MessageManager(window.ReactNativeWebView);
    setMessageManager(manager);
    
    const onMessageReceived = (event: MessageEvent) => {
      // 메시지 처리 로직
      manager.onMessageReceived(event, {
        [MessageEventType.Navigation]: (data: NavigationEvent) => {
          router.replace(data.path, {scroll: false});
        },
        [MessageEventType.Page]: (data: PageEvent<PageEventType>) => {
          setPageEvent(data);
        }
      })
    };
    
    if (os === 'ios')
      window.addEventListener('message', onMessageReceived);
    else if (os === 'android')
      document.addEventListener('message', onMessageReceived as EventListener);

    return () => {
      const obj = os === 'ios' ? window : document
      obj.removeEventListener('message', onMessageReceived as EventListener);

    }
  }, [isWebView]);
  const pathname = usePathname();


  useEffect(() => {
    messageManager?.sendMessage(MessageEventType.ThemeColor, document.querySelector('meta[name="theme-color"]')?.getAttribute('content'));
  }, [messageManager, pathname])

  if (!messageManager) {
    return <>{children}</>;
  }

  return (
    <MessageContext.Provider value={{messageManager, pageEvent}}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageManager = () => {
  return useContext(MessageContext);
};
