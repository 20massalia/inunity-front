import React, { createContext, useContext, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs } from "expo-router";
import { WebViewProvider, useWebView } from "../../components/useWebView";
import { useMessageManager } from "@/lib/MessageManager";
import { MessageEventType, NavigationEvent } from "message-type/message-type";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const webView = useWebView();
  const messageManager = useMessageManager(webView.webViewRef);

  return (
    <View style={{ flexDirection: "row", borderTopWidth:2, borderTopColor: '#EFF3F4', backgroundColor: 'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const pathname = (route.params as { pathname?: string }).pathname;
        const webViewPathName = new URL(webView.url).pathname;

        const isFocused = pathname === webViewPathName;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // 여기서 라우팅 대신 원하는 동작을 수행합니다
            console.log("Comparing:", { pathname, webViewPathName, isFocused });
            console.log("Route params:", route.params);
            console.log("WebView URL:", webView.url);
            console.log("Extracted pathname:", new URL(webView.url).pathname);

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
            style={{ flex: 1, alignItems: "center", padding: 16, gap:6 }}
          >
            {options.tabBarIcon?.({focused: isFocused, color: '', size: 24})}
            <Text style={{ color: isFocused ? "#185bec" : "#222" }}>
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
        options={{
          title: "홈",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? "#185bec" : "#222"}
            />
          ),
        }}
        initialParams={{ pathname: "/" }}
      />
      <Tabs.Screen
        name="board"
        options={{ title: "게시판", tabBarIcon: ({ focused }) => (
          <FontAwesome6
            name="clipboard"
            size={24}
            color={focused ? "#185bec" : "#222"}
          />
        ), }}
        initialParams={{ pathname: "/board" }}
      />
      {/* <Tabs.Screen name="board" options={{ title: 'Settings' }} /> */}
    </Tabs>
  );
}
