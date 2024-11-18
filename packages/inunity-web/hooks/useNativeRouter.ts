"use client";

import { useMessageManager } from '@/components/MessageContext';
import { MessageEventType } from 'message-type/message-type';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useNativeRouter() {
  const router = useRouter();
  const {messageManager} = useMessageManager();

  const customPush = useCallback((url:string) => {
    messageManager?.sendMessage(MessageEventType.Navigation, {path: url})
    
  }, [messageManager]);

  return {
    ...router,
    push: customPush
  };
}