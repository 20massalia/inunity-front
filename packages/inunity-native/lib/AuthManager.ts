import SecureStoreManager, { SecureStorageKey } from "./SecureStoreManager";

export default class AuthManager {
  static async getCredentialFromStorage() {
    const cookie = await SecureStoreManager.get(SecureStorageKey.Cookie);
    console.log(cookie);
    return cookie;
  }
  static async saveCredential(credential: string) {
    SecureStoreManager.save(SecureStorageKey.Cookie, credential);
  }
}
