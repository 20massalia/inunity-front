export enum MessageEventType {
  Login = "login",
  Logout = "logout",
  Log = "log",
  Auth = "auth",
  Navigation = "navigation",
  ThemeColor = 'themeColor',
  Page = "page"
}

export enum PostDetailPageEventType {
  SubmitComment = 'submit_comment'
}

export type PageEventType = PostDetailPageEventType;

export type CommentPayload = {
  text: string;
  isAnonymous: boolean;
}

type PageEventMap = {
  [PostDetailPageEventType.SubmitComment]: CommentPayload;
}

export type PageEvent<T extends PageEventType> = {
  event: T;
  value: T extends keyof PageEventMap ? PageEventMap[T] : never;
};

type EventMap = Partial<{
  [K in MessageEventType]: any;
}> & {
  [MessageEventType.Navigation]: NavigationEvent;
}

export type Message<T extends MessageEventType = any> = {
  event: T;
  value: T extends keyof EventMap ? EventMap[T] : unknown;
}

export type CustomMessageListenerType = Partial<{
  [K in MessageEventType]: (value: K extends keyof EventMap ? EventMap[K] : unknown) => void
}>;

export interface NavigationParam {
  path: string;
  params?: Record<string, unknown>
}

export type NavigationEvent = NavigationParam | -1;