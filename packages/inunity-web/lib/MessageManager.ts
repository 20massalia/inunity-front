import {
  CustomMessageListenerType,
  Message,
  MessageEventType,
} from "message-type/message-type";
// 타입 가드 함수
function isMessage<T extends MessageEventType>(obj: any): obj is Message<T> {
  return (
    obj &&
    typeof obj === "object" &&
    "event" in obj &&
    "value" in obj &&
    Object.values(MessageEventType).includes(obj.event)
  );
}

// 타입 안전한 JSON 파싱 함수
function safeJsonParse<T>(json: string): T | null {
  try {
    const parsed = JSON.parse(json);
    return parsed as T;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    return null;
  }
}

export class MessageManager {
  webViewInstance?: ReactNativeWebView;
  constructor(webViewInstance: ReactNativeWebView) {
    this.webViewInstance = webViewInstance;
  }

  sendMessage(messageEvent: MessageEventType, value?: unknown) {
    this.webViewInstance?.postMessage(
      JSON.stringify({ event: messageEvent, value })
    );
  }

  log(...messages: any[]) {
    this.sendMessage(MessageEventType.Log, messages.map(message => message?.toString()).join(" "));
  }

  // native -> web
  onMessageReceived(
    { data }: { data: string },
    listeners?: CustomMessageListenerType
  ) {
    if (!data) return;

    const parsedData = safeJsonParse<Message<MessageEventType>>(data);

    if (!parsedData || !isMessage(parsedData)) {
      this.sendMessage(
        MessageEventType.Log,
        "[Event Parsing Error] 올바르지 않은 메시지 형식"
      );
      return;
    }

    const message = parsedData;

    switch (message.event) {
      case MessageEventType.Auth: {
        if (document.cookie) return;
        alert(`네이티브에서 쿠키 복원: ${message.value}`);
        document.cookie = message.value as string;
        break;
      }
      case MessageEventType.Log: {
        alert(message.value);
        break;
      }
      case MessageEventType.Navigation: {
        break;
      }
    }

    this.sendMessage(MessageEventType.Log, message.value);
    listeners?.[message.event]?.(message.value);
    this.sendMessage(MessageEventType.Log, "ack");
  }
}
