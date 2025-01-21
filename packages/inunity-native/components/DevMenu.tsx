import {
  PropsWithChildren,
  useEffect,
} from "react";
import { registerDevMenuItems } from "expo-dev-menu";
import { router, Href } from "expo-router";
import { Alert } from "react-native";
import { useWebView } from "./useWebView";
import AuthManager from "@/lib/AuthManager";
import { Cookie } from "@react-native-cookies/cookies";
import * as Notifications from "expo-notifications";

export default function DevMenu({ children }: PropsWithChildren) {
  const { activeWebView, setUrl } = useWebView();

  useEffect(() => {
    const devMenuItems = [
      {
        name: "Set WebView URL",
        callback: () => {
          Alert.prompt("디버그 메뉴", "WebView URL을 입력해주세요.", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: (value) => {
                if (activeWebView) setUrl(activeWebView, value ?? "");
              },
            },
          ]);
        },
      },

      {
        name: "push to route",
        callback: async () => {
          Alert.prompt("디버그 메뉴", "이동할 네이티브 경로를 입력해주세요.", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: (value) => {
                if (value) router.push(value as Href<string>);
              },
            },
          ]);
        },
      },
      {
        name: "🍪 View All Cookies",
        callback: async () => {
          try {
            const [managerCookies, storageCookies] = await Promise.all([
              AuthManager.getAllCookiesFromManager(),
              AuthManager.getAllCookiesFromStorage(),
            ]);
  
            Alert.alert(
              "현재 쿠키 상태",
              `[WebView 쿠키]\n${JSON.stringify(managerCookies, null, 2)}\n\n` +
              `[Storage 쿠키]\n${JSON.stringify(storageCookies, null, 2)}`
            );
            console.debug(
              "현재 쿠키 상태",
              `[WebView 쿠키]\n${JSON.stringify(managerCookies, null, 2)}\n\n` +
              `[Storage 쿠키]\n${JSON.stringify(storageCookies, null, 2)}`

            )
          } catch (error) {
            Alert.alert("에러", "쿠키 조회 실패: " + error);
          }
        },
      },
      {
        name: "🔄 Sync WebView ➡️ Storage",
        callback: async () => {
          try {
            const cookies = await AuthManager.getAllCookiesFromManager();
            await AuthManager.saveBulkCookiesToStorage(cookies);
            Alert.alert("성공", "WebView의 쿠키를 Storage에 저장했습니다.");
          } catch (error) {
            Alert.alert("에러", "동기화 실패: " + error);
          }
        },
      },
      {
        name: "🔄 Sync Storage ➡️ WebView",
        callback: async () => {
          try {
            const cookies = await AuthManager.getAllCookiesFromStorage();
            await AuthManager.setBulkCookiesToManager(cookies);
            Alert.alert("성공", "Storage의 쿠키를 WebView에 저장했습니다.");
          } catch (error) {
            Alert.alert("에러", "동기화 실패: " + error);
          }
        },
      },
      {
        name: "➕ Add Custom Cookie",
        callback: async () => {
          const promptForValue = (title: string): Promise<string> => {
            return new Promise((resolve) => {
              Alert.prompt(title, "", [
                { text: "Cancel", style: "cancel", onPress: () => resolve("") },
                { text: "OK", onPress: value => resolve(value || "") }
              ]);
            });
          };
  
          try {
            const name = await promptForValue("쿠키 이름을 입력하세요");
            if (!name) return;
  
            const value = await promptForValue("쿠키 값을 입력하세요");
            if (!value) return;
  
            const expiryDays = await promptForValue("만료일 (일 단위, 기본값: 7)");
            
            const cookie: Cookie = {
              name,
              value,
              expires: new Date(Date.now() + (parseInt(expiryDays) || 7) * 24 * 60 * 60 * 1000).toISOString(),
              path: "/"
            };
  
            await AuthManager.setCookieToManager(cookie);
            Alert.alert("성공", "쿠키가 추가되었습니다.");
          } catch (error) {
            Alert.alert("에러", "쿠키 추가 실패: " + error);
          }
        },
      },
      {
        name: "🗑️ Clear All Cookies",
        callback: async () => {
          Alert.alert(
            "쿠키 초기화",
            "모든 쿠키를 삭제하시겠습니까?",
            [
              { text: "취소", style: "cancel" },
              {
                text: "확인",
                style: "destructive",
                onPress: async () => {
                  try {
                    await Promise.all([
                      AuthManager.clearAllCookiesFromManager(),
                      AuthManager.clearAllCookiesFromStorage()
                    ]);
                    Alert.alert("성공", "모든 쿠키가 삭제되었습니다.");
                  } catch (error) {
                    Alert.alert("에러", "쿠키 삭제 실패: " + error);
                  }
                }
              }
            ]
          );
        },
      },
      {
        name: "🔍 Check Token Validity",
        callback: async () => {
          try {
            const cookies = await AuthManager.getAllCookiesFromManager();
            const accessToken = cookies["accessToken"];
            
            if (!accessToken) {
              Alert.alert("알림", "액세스 토큰이 없습니다.");
              return;
            }
  
            const expiryDate = new Date(accessToken.expires!);
            const now = new Date();
            const remainingTime = expiryDate.getTime() - now.getTime();
            const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
  
            Alert.alert(
              "토큰 상태",
              `만료까지 남은 시간: ${remainingMinutes}분\n` +
              `만료 일시: ${expiryDate.toLocaleString()}`
            );
          } catch (error) {
            Alert.alert("에러", "토큰 확인 실패: " + error);
          }
        },
      },
      {
        name: "📱 Push to Route",
        callback: async () => {
          Alert.prompt(
            "디버그 메뉴",
            "이동할 네이티브 경로를 입력해주세요.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: (value) => {
                  if (value) router.push(value as Href<string>);
                },
              },
            ]
          );
        },
      },
      {
        name: "Send test notification",
        callback: async () => {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "테스트 알림",
                  body: "이것은 테스트 알림입니다.",
                  data: { data: "goes here" },
                },
                trigger: null, // 즉시 전송
              });
        }
      }
    ];
    registerDevMenuItems(devMenuItems);
  }, []);
  
  return children;
}
