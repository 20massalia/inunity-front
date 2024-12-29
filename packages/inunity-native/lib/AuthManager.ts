import { Platform } from "react-native";
import SecureStoreManager, { SecureStorageKey } from "./SecureStoreManager";
import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import safeJsonParse from "message-type/safeParseJson";

export enum CookieName {
  AccessToken = "accessToken",
}

export default class AuthManager {
  /**
   * CookieManager를 이용해 WebView에 저장된 쿠키를 가져옵니다.
   * @returns
   */
  static async getCookieFromManager(cookieName: CookieName) {
    const cookies =
      Platform.OS === "ios"
        ? await CookieManager.getAll(true)
        : await CookieManager.get(process.env.EXPO_PUBLIC_WEB_URL);

    return cookies[cookieName]
  }

  static async setCookieToManager(cookie: Cookie) {
    await CookieManager.set(process.env.EXPO_PUBLIC_WEB_URL, cookie);
  }

  static async getCookieFromStorage() {
    const cookie = await SecureStoreManager.get(SecureStorageKey.Cookie);
    if (!cookie) throw Error('No Cookies in storage!');
    console.log(cookie);

    return safeJsonParse<Cookie>(cookie)
  }

  static async saveCookieToStorage(cookie: Cookie) {
    SecureStoreManager.save(SecureStorageKey.Cookie, JSON.stringify(cookie));
  }
}
