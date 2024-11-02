import WebView from "react-native-webview";
import AuthManager from "./AuthManager";
import { Ref, RefObject } from "react";
import { Message, MessageEventType } from "message-type/message-type";
// import { Message, MessageEventType } from "@/packages/message-type/message-type";

export const handleMessage = (
  message: Message,
  handlers: Record<string, () => void>
) => {

  switch (message.event) {
    case MessageEventType.Login: {
            AuthManager.saveCredential(message.value as string);
      
      break;
    }
  }
  handlers[message.event]?.();
};

export const parseMessage = (messageText: string) => {
  return JSON.parse(messageText) as Message;
};

export const useMessageManager = (webViewRef: RefObject<WebView>) => {
  const sendMessage = (message: Message) => {
    webViewRef.current?.postMessage(JSON.stringify(message));
  };
  return {sendMessage}

}