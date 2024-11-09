export  enum MessageEventType {
  Login = "login",
  Logout = "logout",
  Log = "log",
  Auth = "auth",
  Navigation = "navigation",
  ThemeColor = 'themeColor'
}

type EventMap = {
  [MessageEventType.Navigation]: NavigationEvent;
  [MessageEventType.ThemeColor]: string;
  
  // 다른 이벤트 타입들에 대한 매핑...
}

export type CustomMessageListenerType = Partial<{
  [K in MessageEventType]: (value: K extends keyof EventMap ? EventMap[K] : unknown) => void
}>;

export interface NavigationEvent {
  path: string;
  params?: Record<string, unknown>
}

export interface Message<T extends MessageEventType = any> {
  event: T;
  value: T extends keyof EventMap ? EventMap[T] : unknown;
}
