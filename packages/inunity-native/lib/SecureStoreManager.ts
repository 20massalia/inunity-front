
import * as SecureStore from "expo-secure-store";

export enum SecureStorageKey {
  Cookie = "cookie",
}
export default class SecureStoreManager {
  static async save(key: SecureStorageKey, value: any) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
  static async get(key: SecureStorageKey) {
    return await SecureStore.getItemAsync(key);
  }
}
