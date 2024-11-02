"use client";

import { usePlatform } from '@/hooks/usePlatform';
import { MessageManager } from '@/lib/MessageManager';

import { MessageEventType } from 'message-type/message-type';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

export const MessageContext = createContext<MessageManager | undefined>(undefined);

export const MessageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const {os, isWebView} = usePlatform();
    const [messageManager, setMessageManager] = useState<MessageManager>(new MessageManager(window.ReactNativeWebView));
    
  
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
