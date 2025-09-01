import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // 서버 사이드에서는 localStorage를 사용할 수 없음
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.warn("localStorage access failed:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage 사용
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("localStorage set failed:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
