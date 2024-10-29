'use client';

import { MessageManager } from '@/lib/MessageManager';
import { usePlatformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

const MessageContext = createContext<MessageManager | undefined>(undefined);

export const MessageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [messageManager, setMessageManager] = useState<MessageManager>(new MessageManager(window.ReactNativeWebView));
    const {os, isWebView} = usePlatformResolver();
  
    useEffect(() => {
      if (!isWebView) return;

     
      const onMessageReceived = (event: MessageEvent) => {
        // 메시지 처리 로직
        // msgManager.onMessageReceived(event, listeners)
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
        messageManager?.sendMessage(MessageEventType.ThemeColor,  document.querySelector('meta[name="theme-color"]')?.getAttribute('content'));
      }, [pathname])
    
  return (
    <MessageContext.Provider value={messageManager}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageManager = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageManager must be used within a MessageProvider');
  }
  return context;
};

