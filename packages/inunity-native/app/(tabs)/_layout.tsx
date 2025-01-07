import React, { createContext, useContext, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs } from "expo-router";
import { WebViewProvider, useWebView } from "../../components/useWebView";
import { useMessageManager } from "@/lib/MessageManager";
import { MessageEventType, NavigationEvent } from "message-type/message-type";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const webView = useWebView("index");
  const messageManager = useMessageManager(webView.webViewRef?.current!);

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const pathname = (route.params as { pathname?: string }).pathname;
        const webViewPathName = new URL(webView.webViews['index']).pathname;

        const isFocused = pathname === webViewPathName;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            const url = webView.webViews["index"];
            // 여기서 라우팅 대신 원하는 동작을 수행합니다
            console.log("Comparing:", { pathname, webViewPathName, isFocused });
            console.log("Route params:", route.params);
            console.log("WebView URL:", url);
            console.log("Extracted pathname:", new URL(url).pathname);

            console.log(`Tab ${label} pressed, ${webViewPathName}`);

            if (pathname) {
              console.log("Sending navigation event: ", pathname);
              
              messageManager.sendMessage({
                event: MessageEventType.Navigation,
                value: { path: pathname } as NavigationEvent,
              });
              // webView.setUrl(url)
            }

            // 예: 특정 함수 호출 또는 상태 변경
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center", padding: 16 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
        initialParams={{ pathname: "/" }}
      />
      <Tabs.Screen
        name="board"
        options={{ title: "Board" }}
        initialParams={{ pathname: "/board" }}
      />
      {/* <Tabs.Screen name="board" options={{ title: 'Settings' }} /> */}
    </Tabs>
  );
}
