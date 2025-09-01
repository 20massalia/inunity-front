import { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
// Firebase는 프로덕션에서만 사용
// import messaging from "@react-native-firebase/messaging";
import AuthManager from "@/lib/AuthManager";

async function updateTokenOnServer(token: string) {
  const cookies = await AuthManager.getAllCookiesFromStorage();
  const cookieString = Object.entries(cookies)
    .map(([key, value]) => `${key}=${value.value}`)
    .join("; ");

  try {
    const response = await fetch(
      "https://server.inunity.club/v1/fcm/token?token=" + token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieString,
        },
        credentials: "omit",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update token on server");
    }

    console.log("Successfully updated push token on server");
  } catch (error) {
    console.error("Error updating token on server:", error);
  }
}

async function requestUserPermission() {
  // 로컬 개발에서는 Firebase 없이 Mock 권한 부여
  console.log("Mock: Push notification permission granted");
  return true;
}

export default function useNotification() {
  const [fcmToken, setFcmToken] = useState("");
  const [notification, setNotification] = useState<any>(undefined);

  useEffect(() => {
    const initialize = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        // Mock FCM 토큰 생성
        const mockToken = `mock-fcm-token-${Date.now()}`;
        setFcmToken(mockToken);
        console.log("Mock FCM token generated:", mockToken);
        // updateTokenOnServer(mockToken); // Mock 서버에 토큰 업데이트
      }
    };

    initialize();

    // Mock 메시지 리스너 (로컬 개발용)
    console.log("Mock: Push notification listeners initialized");

    return () => {
      console.log("Mock: Push notification listeners cleaned up");
    };
  }, []);

  return {
    fcmToken,
    notification,
  };
}
