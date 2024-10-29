import { CustomMessageListenerType, Message, MessageEventType } from "message-type/message-type";
import {  usePlatformResolver } from "./PlatformResolver";
import { useState, useEffect } from "react";

export class MessageManager {
  webViewInstance: ReactNativeWebView;
  constructor(webViewInstance: ReactNativeWebView) {
    this.webViewInstance = webViewInstance;
  }

  sendMessage(messageEvent: string, value?: unknown) {
    this.webViewInstance.postMessage(
      JSON.stringify({ event: messageEvent, value })
    )
  }

  log(...messages:string[]) {
    this.sendMessage(MessageEventType.Log, messages.join(' '))
  }


  onMessageReceived({ data }: {data: string, }, listeners?: CustomMessageListenerType) {
    if (!data) return;
    try {
      const message = JSON.parse(data) as Message;
      
      switch (message.event) {
        case MessageEventType.Auth: {
          alert(`네이티브에서 쿠키 복원: ${message.value}`);
          document.cookie = message.value as string;
          break;
        }
        case MessageEventType.Log: {
          alert(message.value);
          break;
        }
        default: {
          throw new Error('올바르지 않은 이벤트! ')
        }
      }
      listeners?.[message.event]?.();
      this.sendMessage(MessageEventType.Log, 'ack')
    } catch (e) {
      if (e instanceof Error)
      this.sendMessage(MessageEventType.Log, `[Event Parsing Error] ${e.message}`)
    }
  }

}

