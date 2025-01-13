import { AppState, AppStateStatus, Platform, BackHandler } from "react-native";
import AuthManager from "./AuthManager";
import { Cookies } from "@react-native-cookies/cookies";

interface CrashInfo {
  message: string;
  stack?: string;
  timestamp: number;
  additionalInfo?: Record<string, unknown>;
}

interface NetworkState {
  isConnected: boolean;
  type?: string;
  lastConnectedAt?: number;
}

interface AppStateData {
  lastActiveAt?: number;
  networkState?: NetworkState;
  currentScreen?: string;
  userSettings?: Record<string, unknown>;
  cleanExit?: boolean;
}

class AppLifecycleHandler {
  private appState: AppStateStatus;
  private lastAppState?: AppStateData;

  constructor() {
    this.appState = AppState.currentState;
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  public init(): void {
    AppState.addEventListener("change", this.handleAppStateChange);

    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    }

    this.setupErrorBoundary();
  }

  private handleAppStateChange(nextAppState: AppStateStatus): void {
    console.info(this.appState, nextAppState);
    
    if (this.appState.match(/active|foreground/) && nextAppState === "background") {
      console.info("[AppLifecycleHandler] Background 진입");
      this.onBackground();
    }
    else if (this.appState === "background" && nextAppState === "active") {
      console.info("[AppLifecycleHandler] Foreground 진입");
      this.onForeground();
    }

    this.appState = nextAppState;
  }

  private handleBackButton() {
    this.saveAppState();
    return false;
  }

  private setupErrorBoundary(): void {
    ErrorUtils.setGlobalHandler(async (error: Error) => {
      await this.onCrash(error);
      if (__DEV__) {
        console.error(error);
      }
    });
  }

  private async onBackground(): Promise<void> {
    try {
      await this.saveAppState();
      await this.disconnectNetwork();
    } catch (error) {
      console.error("[AppLifecycleHandler] Background transition failed:", error);
    }
  }

  private async onForeground(): Promise<void> {
    try {
      const savedState = await this.restoreAppState();
      if (savedState) {
        this.lastAppState = savedState;
        await this.reconnectNetwork();
        await this.syncWithServer();
      }
    } catch (error) {
      console.error("[AppLifecycleHandler] Foreground transition failed:", error);
    }
  }

  private async onCrash(error: Error): Promise<void> {
    try {
      const crashInfo: CrashInfo = {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        additionalInfo: {
          lastAppState: this.lastAppState,
          currentScreen: this.getCurrentScreen(),
        },
      };
      await this.saveLastCrashInfo(crashInfo);
    } catch (e) {
      console.error("[AppLifecycleHandler] Crash handler failed:", e);
    }
  }

  private getCurrentScreen(): string {
    return "MainScreen";
  }

  private async syncWithServer(): Promise<void> {
    // 서버와 동기화 로직 구현
  }

  private async saveAppState(): Promise<void> {
    try {
      const cookies = await AuthManager.getAllCookiesFromManager();
      
      if (Object.keys(cookies).length === 0) {
        console.info("[AppLifecycleHandler] No cookies found to save");
        return;
      }

      console.info("[AppLifecycleHandler] 앱의 중지가 감지되어 모든 쿠키를 저장합니다.");
      await AuthManager.saveBulkCookiesToStorage(cookies);
      
    } catch (error) {
      console.error("[AppLifecycleHandler] Failed to save cookies:", error);
    }
  }

  private async restoreAppState(): Promise<AppStateData | null> {
    try {
      const storedCookies = await AuthManager.getAllCookiesFromStorage();
      
      if (Object.keys(storedCookies).length === 0) {
        console.info("[AppLifecycleHandler] No stored cookies found");
        return null;
      }

      console.info("[AppLifecycleHandler] 앱이 재시작되어 쿠키를 복구합니다.");
      await AuthManager.setBulkCookiesToManager(storedCookies);
      
      return {
        lastActiveAt: Date.now(),
        cleanExit: true
      };
    } catch (error) {
      console.error("[AppLifecycleHandler] Failed to restore cookies:", error);
      return null;
    }
  }

  private async disconnectNetwork(): Promise<void> {
    // 네트워크 연결 해제 구현
  }

  private async reconnectNetwork(): Promise<void> {
    // 네트워크 재연결 구현
  }

  private async saveLastCrashInfo(crashInfo: CrashInfo): Promise<void> {
    // 크래시 정보 저장 구현
  }
}

export default new AppLifecycleHandler();