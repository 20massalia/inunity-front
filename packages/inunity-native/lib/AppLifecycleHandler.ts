import { AppState, AppStateStatus, Platform, BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AuthManager, { CookieName } from './AuthManager';

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
  cleanExit?: boolean
}

class AppLifecycleHandler {
  private appState: AppStateStatus;
  private lastAppState?: AppStateData;
  private readonly persistenceKey: string = '@AppState';

  constructor() {
    this.appState = AppState.currentState;
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  public init(): void {
    // 앱 상태 변화 리스너 등록
    AppState.addEventListener('change', this.handleAppStateChange);

    // Android 백버튼 처리
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    // 예기치 않은 에러 처리
    this.setupErrorBoundary();
  }

  private handleAppStateChange(nextAppState: AppStateStatus): void {
    // 백그라운드 전환 감지
    console.info(this.appState, nextAppState)
    if (
      this.appState.match(/active|foreground/) && 
      nextAppState === 'background'
    ) {
      console.info('background 진입!')
      this.onBackground();
    } 
    // 포그라운드 전환 감지
    else if (
      this.appState === 'background' && 
      nextAppState === 'active'
    ) {
      this.onForeground();
    }
    
    this.appState = nextAppState;
  }

  private handleBackButton(): boolean {
    // Android 백버튼 처리 로직
    // true를 반환하면 기본 동작 방지
    return true;
  }


  private setupErrorBoundary(): void {
    // 전역 에러 핸들러
    ErrorUtils.setGlobalHandler(async (error: Error) => {
      await this.onCrash(error);
      
      // Firebase Crashlytics나 다른 크래시 리포팅 서비스로 에러 전송
      if (__DEV__) {
        console.error(error);
      } else {
        // await analytics().logEvent('app_crash', {
          // error: error.message,
          // stack: error.stack
        // });
      }
    });
  }

  private async onBackground(): Promise<void> {
    try {
      const currentState: AppStateData = {
        lastActiveAt: Date.now(),
        networkState: await this.getCurrentNetworkState(),
        currentScreen: this.getCurrentScreen(),
      };
      
      await this.saveAppState(currentState);
      await this.disconnectNetwork();
    } catch (error) {
      console.error('Background transition failed:', error);
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
      console.error('Foreground transition failed:', error);
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
          currentScreen: this.getCurrentScreen()
        }
      };
      await this.saveLastCrashInfo(crashInfo);
    } catch (e) {
      console.error('Crash handler failed:', e);
    }
  }

  // 유틸리티 메서드들
  private async getCurrentNetworkState(): Promise<NetworkState> {
    // 네트워크 상태 확인 로직 구현
    return {
      isConnected: true, // 실제 구현 필요
      type: 'wifi',  // 실제 구현 필요
      lastConnectedAt: Date.now()
    };
  }

  private getCurrentScreen(): string {
    // 현재 화면 정보 반환 로직 구현
    return 'MainScreen'; // 실제 구현 필요
  }

  private async syncWithServer(): Promise<void> {
    // 서버와 동기화 로직 구현
  }

  private async saveAppState(state: AppStateData): Promise<void> {
    // 앱 상태 저장 구현
    const cookie = await AuthManager.getCookieFromManager(CookieName.AccessToken);
    if (!cookie) return;
    console.info(`[AppLifecycleHandler] 앱의 중지가 감지되어 ${cookie.name} 쿠키를 저장합니다.`)
    await AuthManager.saveCookieToStorage(cookie);
  }

  private async restoreAppState(): Promise<AppStateData | null> {
    // 앱 상태 복구 구현
    const cookie = await AuthManager.getCookieFromStorage();
    console.info(cookie)
    return null;
  }

  private async disconnectNetwork(): Promise<void> {
    // 네트워크 연결 해제 구현
  }

  private async reconnectNetwork(): Promise<void> {
    // 네트워크 재연결 구현
  }

  private async cleanupCache(): Promise<void> {
    // 캐시 정리 구현
  }

  private async endSession(): Promise<void> {
    // 세션 종료 구현
  }

  private async saveLastCrashInfo(crashInfo: CrashInfo): Promise<void> {
    // 크래시 정보 저장 구현
  }
}

export default new AppLifecycleHandler();