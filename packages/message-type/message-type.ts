export  enum MessageEventType {
  Login = "login",
  Logout = "logout",
  Log = "log",
  Auth = "auth",
  Navigation = "navigation",
  ThemeColor = 'themeColor',
  Page = "page"
}

export enum PostDetailPageEventType {
  SubmitComment = "submit_comment"
}
export type PageEventType = PostDetailPageEventType;
export type PageEventMap = PostDetailPageEventType;
export type CommentPayload = {
  value: string;
  isAnonymous: boolean;
};

export type PostDetailPageEventMap = {
  [PostDetailPageEventType.SubmitComment]: CommentPayload;
};

export type PageEvent = {
  event: PageEventType;
  value: PageEventMap;
}

type EventMap = {
  [MessageEventType.Navigation]: NavigationEvent;
  [MessageEventType.ThemeColor]: string;
  [MessageEventType.Page]: PageEvent;
  
  // 다른 이벤트 타입들에 대한 매핑...
}

export type CustomMessageListenerType = Partial<{
  [K in MessageEventType]: (value: K extends keyof EventMap ? EventMap[K] : unknown) => void
}>;

export interface NavigationEvent {
  path: string;
  params?: Record<string, unknown>
}

export interface Message<T extends MessageEventType> {
  event: T;
  value: EventMap[T];
}
