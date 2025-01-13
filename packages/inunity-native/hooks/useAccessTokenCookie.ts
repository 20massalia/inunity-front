import AuthManager, { CookieName } from "@/lib/AuthManager";
import { Cookie } from "@react-native-cookies/cookies";
import { useEffect, useState } from "react";

export default function useAccessTokenCookie() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();
  const [cookie, setCookie] = useState<Cookie>();

  useEffect(() => {
    AuthManager.getCookieFromStorage(CookieName.AccessToken)
      .then((cookie) => {
        console.log("cookie success!", cookie);
        setIsSuccess(true);
        setCookie(cookie);
        setIsLoading(false);
      })
      .catch(async (e) => {
        const cookies = await AuthManager.getCookiesFromManager();
        const [accessCookie, refreshCookie] = [
          cookies[CookieName.AccessToken],
          cookies[CookieName.RefreshToken],
        ];
        if (accessCookie && refreshCookie) {
          await AuthManager.saveCookieToStorage(CookieName.AccessToken, accessCookie);
          await AuthManager.saveCookieToStorage(CookieName.RefreshToken, refreshCookie);
          setIsSuccess(true);
          setCookie(cookie);
          setIsLoading(false);
          return;
        }
        setIsError(true);
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return {
    cookie,
    error,
    isLoading,
    isSuccess,
    isError,
  };
}
