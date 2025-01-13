import { Platform } from "react-native";
import SecureStoreManager from "./SecureStoreManager";
import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import safeJsonParse from "message-type/safeParseJson";

export const enum CookieName {
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
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
        : await CookieManager.get("https://server.inunity.club");

    return cookies[cookieName];
  }

  static async getCookiesFromManager() {
    const cookies =
      Platform.OS === "ios"
        ? await CookieManager.getAll(true)
        : await CookieManager.get("https://server.inunity.club");

    return cookies;
  }

  static async setCookieToManager(cookie: Cookie) {
    await CookieManager.set("https://server.inunity.club", cookie, true);
  }

  static async getCookieFromStorage(cookieName: CookieName) {
    const cookie = await SecureStoreManager.get(cookieName);

    if (!cookie) throw Error("No Cookies in storage!");
    const parsedCookie = safeJsonParse<Cookie>(cookie);
    if (parsedCookie === null) {
      console.error("쿠키 파싱 실패");
      return;
    }

    return JSON.parse(JSON.stringify(parsedCookie)) as Cookie;
  }

  static async saveCookieToStorage(cookieName: CookieName, cookie: Cookie) {
    SecureStoreManager.save(cookieName, JSON.stringify(cookie));
  }

  static async clearCookieFromStorage(cookieName: CookieName) {
    SecureStoreManager.clear(cookieName);
  }
}
