import { Platform } from "react-native";
import SecureStoreManager from "./SecureStoreManager";
import CookieManager, { Cookie, Cookies } from "@react-native-cookies/cookies";
import safeJsonParse from "message-type/safeParseJson";

export enum CookieName {
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
  SessionId = "JSESSIONID",
}

function isCookieName(key: string): key is CookieName {
  return Object.values(CookieName).includes(key as CookieName);
}

export default class AuthManager {
  private static readonly BASE_URL = "https://server.inunity.club";
  private static readonly COOKIE_KEYS = Object.values(CookieName);

  /**
   * CookieManager를 이용해 WebView에 저장된 모든 쿠키를 가져옵니다.
   * @returns {Promise<Cookies>} 모든 쿠키 객체
   */
  static async getAllCookiesFromManager(): Promise<Cookies> {
    return await CookieManager.get(this.BASE_URL);
  }

  /**
   * 특정 쿠키를 WebView에 설정합니다.
   * @param cookie 설정할 쿠키 객체
   */
  static async setCookieToManager(cookie: Cookie): Promise<void> {
    await CookieManager.set(this.BASE_URL, cookie, true);
  }

  /**
   * 여러 쿠키를 한번에 WebView에 설정합니다.
   * @param cookies 설정할 쿠키 객체들
   */
  static async setBulkCookiesToManager(cookies: Cookies): Promise<void> {
    for (const [key, cookie] of Object.entries(cookies)) {
      await CookieManager.set(this.BASE_URL, cookie, true);
    }
  }

  /**
   * SecureStore에서 모든 쿠키를 가져옵니다.
   * @returns {Promise<Cookies>} 저장된 모든 쿠키 객체
   */
  static async getAllCookiesFromStorage(): Promise<Cookies> {
    const cookiesObject: Cookies = {};

    await Promise.all(
      this.COOKIE_KEYS.map(async (key) => {
        const cookieStr = await SecureStoreManager.get(key);
        if (cookieStr) {
          const parsedCookie = safeJsonParse<Cookie>(cookieStr);
          if (parsedCookie !== null) {
            cookiesObject[key] = JSON.parse(JSON.stringify(parsedCookie));
          } else {
            console.error(`쿠키 파싱 실패: ${key}`);
          }
        }
      })
    );

    return cookiesObject;
  }

  /**
   * SecureStore에 여러 쿠키를 저장합니다.
   * @param cookies 저장할 쿠키 객체들
   */
  static async saveBulkCookiesToStorage(cookies: Cookies): Promise<void> {
    for (const [key, cookie] of Object.entries(cookies)) {
      if (isCookieName(key)) {
        console.log(key, cookie);
        await SecureStoreManager.clear(key as CookieName);
        await SecureStoreManager.save(key as CookieName, cookie);
      }
    }
  }

  /**
   * SecureStore에서 모든 쿠키를 삭제합니다.
   */
  static async clearAllCookiesFromStorage(): Promise<void> {
    this.COOKIE_KEYS.forEach((key) => SecureStoreManager.clear(key));
  }

  /**
   * WebView의 모든 쿠키를 삭제합니다.
   */
  static async clearAllCookiesFromManager(): Promise<void> {
    await CookieManager.clearAll();
  }

  /**
   * 모든 저장소(WebView, SecureStore)의 쿠키를 삭제합니다.
   */
  static async clearAllCookies(): Promise<void> {
    await Promise.all([
      this.clearAllCookiesFromStorage(),
      this.clearAllCookiesFromManager(),
    ]);
  }
}
