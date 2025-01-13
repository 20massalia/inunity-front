
import * as SecureStore from "expo-secure-store";
import { CookieName } from "./AuthManager";



export default class SecureStoreManager {
  static async save(key: CookieName, value: any) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
  static async get(key: CookieName) {
    return await SecureStore.getItemAsync(key);
  }
  static async clear(key: CookieName) {
    await SecureStore.deleteItemAsync(key);
  }
}
