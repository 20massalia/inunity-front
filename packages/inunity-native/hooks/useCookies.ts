import AuthManager from "@/lib/AuthManager";
import { Cookies } from "@react-native-cookies/cookies";
import { useEffect, useState } from "react";

interface UseCookiesResult {
  cookies?: Cookies;
  error?: Error;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export default function useCookies(): UseCookiesResult {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();
  const [cookies, setCookies] = useState<Cookies>();

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        // 먼저 SecureStorage에서 쿠키 조회 시도
        const storedCookies = await AuthManager.getAllCookiesFromStorage();
        
        if (Object.keys(storedCookies).length > 0) {
          console.log("Cookies found in storage!", storedCookies);
          setIsSuccess(true);
          setCookies(storedCookies);
          setIsLoading(false);
          return;
        }

        // SecureStorage에 없으면 WebView에서 쿠키 조회
        const managerCookies = await AuthManager.getAllCookiesFromManager();

        if (Object.keys(managerCookies).length > 0) {
          // 찾은 쿠키들을 SecureStorage에 저장
          await AuthManager.saveBulkCookiesToStorage(managerCookies);

          setIsSuccess(true);
          setCookies(managerCookies);
          setIsLoading(false);
          return;
        }

        // 쿠키를 찾지 못한 경우
        throw new Error("No cookies found");

      } catch (e) {
        setIsError(true);
        setError(e instanceof Error ? e : new Error("Unknown error occurred"));
        setIsLoading(false);
      }
    };

    fetchCookies();
  }, []);

  return {
    cookies,
    error,
    isLoading,
    isSuccess,
    isError,
  };
}