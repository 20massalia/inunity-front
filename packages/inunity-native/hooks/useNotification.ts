import { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
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
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    return true;
  }

  console.log("User declined push notifications");
  return false;
}

export default function useNotification() {
  const [fcmToken, setFcmToken] = useState("");
  const [notification, setNotification] = useState<any>(undefined);

  useEffect(() => {
    const initialize = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        const token = await messaging().getToken();
        if (token) {
          setFcmToken(token);
          updateTokenOnServer(token);
        }
      }
    };

    initialize();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
        setNotification(remoteMessage);
      }
    );

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          JSON.stringify(remoteMessage)
        );
      });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            JSON.stringify(remoteMessage)
          );
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  return {
    fcmToken,
    notification,
  };
}
