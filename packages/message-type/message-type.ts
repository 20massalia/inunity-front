export const enum MessageEventType {
  Login = "login",
  Logout = "logout",
  Log = "log",
  Auth = "auth",
  Navigation = "navigation",
  ThemeColor = 'themeColor'
}

export type CustomMessageListenerType = Partial<Record<MessageEventType, () => void>>;


export interface NavigationEvent {
  path: string;
  params?: Record<string, unknown>
}

export interface Message {
  event: MessageEventType;
  value: unknown;
}
